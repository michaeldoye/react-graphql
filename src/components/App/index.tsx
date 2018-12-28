import React, { Component } from "react";
import "./App.scss";
import { client } from "../../graphql/client";
import { ApolloProvider } from "react-apollo";
import { NewsCardList } from "../NewsCardList";
import { LANGUAGE_OPTIONS, PAGE_SIZE_OPTIONS } from "../../shared/constants";
import { IComponentState } from "./App.interface";
import LanguageSelect from "../LanguageSelect";
import SizeSelect from "../SizeSelect";
import TopBar from "../TopBar";

export class App extends Component<{}, IComponentState> {
    constructor(props: any) {
        super(props);

        this.pageSizeChangeHandler = this.pageSizeChangeHandler.bind(this);
        this.languageChangeHandler = this.languageChangeHandler.bind(this);

        this.state = {
            pageSize: PAGE_SIZE_OPTIONS[3],
            language: LANGUAGE_OPTIONS[0],
        };
    }

    pageSizeChangeHandler(event: any) {
        this.setState({
            pageSize: event.target.value,
        });
    }

    languageChangeHandler(event: any) {
        this.setState({
            language: event ? event.target.value : "",
        });
    }

    render() {
        const { pageSize, language } = this.state;

        return (
            <div className="App">
                <TopBar />
                <section className="App__section-controls container">
                    <SizeSelect
                        changeHandler={this.pageSizeChangeHandler}
                        pageSize={pageSize}
                    />
                    <LanguageSelect
                        changeHandler={this.languageChangeHandler}
                        language={language}
                    />
                </section>
                <section className="App__section container">
                    <ApolloProvider client={client}>
                        <NewsCardList querySize={pageSize} language={language} />
                    </ApolloProvider>
                </section>
            </div>
        );
    }
}

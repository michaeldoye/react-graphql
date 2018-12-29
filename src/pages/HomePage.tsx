import React, { Component } from "react";
import { NewsFeed } from "../components/NewsFeed/NewsFeed";
import { LANGUAGE_OPTIONS, PAGE_SIZE_OPTIONS } from "../shared/constants";
import LanguageSelect from "../components/LanguageSelect/LanguageSelect";
import SizeSelect from "../components/SizeSelect/SizeSelect";

export interface IComponentState {
    pageSize: string;
    language: string;
}

export class HomePage extends Component<{}, IComponentState> {
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
            language: event.target.value,
        });
    }

    render() {
        const { pageSize, language } = this.state;
        return (
            <div className="App__content">
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
                <NewsFeed feedSize={pageSize} language={language} />
            </div>
        );
    }
}
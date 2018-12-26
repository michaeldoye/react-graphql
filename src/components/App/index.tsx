import React, { Component } from "react";
import logo from "../../logo.svg";
import "./App.scss";
import { client } from "../../graphql/client";
import { ApolloProvider } from "react-apollo";
import { NewsCardList } from "../NewsCardList";
import { LANGUAGE_OPTIONS, PAGE_SIZE_OPTIONS } from "../../shared/constants";

interface ComponentState {
  pageSize: string | null | undefined;
  language: string | null | undefined;
}

export class App extends Component<{}, ComponentState> {
  constructor(props: any) {
    super(props);

    this.pageSizeChangeHandler = this.pageSizeChangeHandler.bind(this);
    this.languageChangeHandler = this.languageChangeHandler.bind(this);

    this.state = {
      pageSize: PAGE_SIZE_OPTIONS[1],
      language: LANGUAGE_OPTIONS[0]
    };
  }

  pageSizeChangeHandler(event: any) {
    this.setState({
      pageSize: event.currentTarget.value
    });
  }

  languageChangeHandler(event: any) {
    this.setState({
      language: event ? event.currentTarget.value : ""
    });
  }

  render() {
    const { pageSize, language } = this.state;

    return (
      <div className="App">
        <header className="App__header">
          <img src={logo} className="App__logo" alt="logo" />
        </header>
        <section className="App__section-controls container">
          <select
            className="custom-select"
            onChange={this.pageSizeChangeHandler}
            value={pageSize || ""}
          >
            {PAGE_SIZE_OPTIONS.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <select
            className="custom-select"
            onChange={this.languageChangeHandler}
            value={language || ""}
          >
            {LANGUAGE_OPTIONS.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
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

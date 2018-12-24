import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
import client from "../../graphql/client";
import { ApolloProvider } from "react-apollo";
import { NewsCardList } from "../NewsCardList";

class App extends Component<{}, {}> {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <section className="App-section container">
                    <ApolloProvider client={client}>
                        <NewsCardList />
                    </ApolloProvider>
                </section>
            </div>
        );
    }
}

export default App;

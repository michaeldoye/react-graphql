import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import TopBar from "./components/TopBar/TopBar";
import { HomePage } from "./pages/HomePage";
import { API_KEY, ENDPOINT } from "./config";
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";

const client = new AWSAppSyncClient({
    url: ENDPOINT,
    region: "eu-west-1",
    auth: {
        // @ts-ignore
        type: "API_KEY",
        apiKey: API_KEY,
    },
});

interface ComponentState {}

export class App extends Component<{}, ComponentState> {
    constructor(props: any) {
        super(props);
    }

    render(): React.ReactElement<any> | null {
        return (
            <div className="App">
                <ApolloProvider client={client}>
                    <Rehydrated>
                        <TopBar />
                        <HomePage />
                    </Rehydrated>
                </ApolloProvider>
            </div>
        );
    }
}

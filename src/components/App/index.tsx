import React, {Component, ComponentState} from 'react';
import logo from '../../logo.svg';
import './App.css';
import client from "../../graphql/client";
import getAllNews from "../../graphql/queries";
import { ApolloProvider } from "react-apollo";
import NewsCard from '../NewsCard';

interface HomeComponentState {
    feedItems: any
}

class App extends Component<{}, HomeComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            feedItems: []
        };
        this.getNewsFeed();
    }

    getNewsFeed(): void {
        getAllNews().then((res: any) => (
            this.setState({
                feedItems: res.data.getNewsFeed.items
            })
        ));
    }

    render() {
        const { feedItems } = this.state;

        return (
            <div className="App">

                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>

                <section className="App-section container">
                    <ApolloProvider client={client}>
                        {feedItems.length > 0 ?
                            feedItems.map((item: any, idx: number) => (
                                <NewsCard item={item} index={idx} />
                            )) : <div>Loading...</div>
                        }
                    </ApolloProvider>
                </section>

            </div>
        );
    }
}

export default App;

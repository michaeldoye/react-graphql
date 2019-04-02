import React, { Component } from "react";
import EventList from "../components/EventList/EventList";

interface ComponentProps {}

interface ComponentState {}

export class HomePage extends Component<ComponentProps, ComponentState> {
    constructor(props: any) {
        super(props);
    }

    render(): React.ReactElement<any> | null {
        return (
            <div className="App__content">
                <EventList />
            </div>
        );
    }
}

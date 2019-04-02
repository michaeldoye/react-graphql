import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import { Mutation } from "react-apollo";
import { CREATE_EVENT } from "../EventList/event-mutations";
import FormDialog from "./FormDialog";

interface ComponentProps {
    isOpen: boolean;
    handleClose: Function;
    onCreateEvent: Function;
}
interface ComponentState {
    open: boolean;
}

class EventForm extends Component<ComponentProps, ComponentState> {
    constructor(props: any) {
        super(props);
        this.handleCreateEvent = this.handleCreateEvent.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            open: this.props.isOpen,
        };
    }

    public handleClose(): void {
        this.setState(
            {
                open: false,
            },
            this.props.handleClose(false)
        );
    }

    public handleCreateEvent(state: any, createEvent: any): void {
        this.props.onCreateEvent(state, createEvent);
    }

    render(): React.ReactElement<any> | null {
        return (
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <Mutation mutation={CREATE_EVENT} onCompleted={this.handleClose}>
                    {(createEvent, { loading, error, data }) => {
                        return (
                            <FormDialog
                                error={error}
                                loading={loading}
                                createEvent={createEvent}
                                handleClose={this.handleClose}
                                onCreateEvent={this.handleCreateEvent}
                            />
                        );
                    }}
                </Mutation>
            </Dialog>
        );
    }
}

export default EventForm;

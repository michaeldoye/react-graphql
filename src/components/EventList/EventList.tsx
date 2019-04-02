import React, { Component } from "react";
import { Query } from "react-apollo";
import Event from "./Event";
import Loader from "../Loader/Loader";
import "./event-list.scss";
import { ListEvents } from "./event-list-query";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import EventForm from "../EventForm/EventForm";

interface ComponentProps {
    classes: any;
}

interface ComponentState {
    dialogOpen: boolean;
}

const styles = (theme: any) => ({
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

class EventList extends Component<ComponentProps, ComponentState> {
    refetch: Function;

    constructor(props: any) {
        super(props);
        this.handleCreateEvent = this.handleCreateEvent.bind(this);
        this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
        this.toggleDialogOpenState = this.toggleDialogOpenState.bind(this);
        this.refetch = () => {};
        this.state = {
            dialogOpen: false,
        };
    }

    public toggleDialogOpenState(): void {
        this.setState((prevState: any) => ({
            dialogOpen: !prevState.dialogOpen,
        }));
    }

    public handleCreateEvent(eventFeilds: any, createFn: any): void {
        createFn({
            variables: eventFeilds,
        }).then(() => this.refetch());
    }

    public handleDeleteEvent(deleteFn: any, eventId: string): void {
        deleteFn({
            variables: {
                id: eventId,
            },
        }).then(() => this.refetch());
    }

    render(): React.ReactElement<any> | null {
        const { dialogOpen } = this.state;
        return (
            <section className="App__section-news-feed container">
                <Fab
                    color="primary"
                    aria-label="Add"
                    className="App__fab-button fab"
                    onClick={this.toggleDialogOpenState}>
                    <AddIcon />
                </Fab>

                <Query query={ListEvents} fetchPolicy={`no-cache`}>
                    {({ loading, error, data, refetch }) => {
                        this.refetch = refetch;
                        if (loading) return <Loader />;
                        if (error) return <p>Error :(</p>;

                        return data.listEvents.items.map(
                            (item: any, idx: number) => (
                                <div className="card-wrapper" key={idx}>
                                    <Event
                                        onDeleteEvent={this.handleDeleteEvent}
                                        onEventDeleted={refetch}
                                        item={item}
                                    />
                                </div>
                            )
                        );
                    }}
                </Query>

                {dialogOpen && (
                    <EventForm
                        handleClose={this.toggleDialogOpenState}
                        isOpen={dialogOpen}
                        onCreateEvent={this.handleCreateEvent}
                    />
                )}
            </section>
        );
    }
}

export default withStyles(styles)(EventList);

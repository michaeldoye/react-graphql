import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Loader from "../Loader/Loader";

interface ComponentProps {
    error: any;
    loading: any;
    createEvent: any;
    handleClose: Function;
    onCreateEvent: Function;
}
interface ComponentState {
    name: string;
    date: string;
    when: string;
    where: string;
    description: string;
    [x: string]: any;
}

class FormDialog extends Component<ComponentProps, ComponentState> {
    constructor(props: any) {
        super(props);
        this.handleCreateEvent = this.handleCreateEvent.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            name: "",
            date: "",
            when: "",
            where: "",
            description: "",
        };
    }

    public handleClose(): void {
        this.props.handleClose(false);
    }

    public handleInputChange(event: any): void {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    public handleCreateEvent(): void {
        this.props.onCreateEvent({ ...this.state }, this.props.createEvent);
    }

    render(): React.ReactElement<any> | null {
        const { error, loading } = this.props;
        return (
            <div>
                <DialogTitle id="form-dialog-title">Add New Event</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the event details below.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Event Name"
                        type="text"
                        fullWidth
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="when"
                        type="date"
                        fullWidth
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="where"
                        label="Event Address"
                        type="text"
                        fullWidth
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Event Description"
                        type="text"
                        fullWidth
                        onChange={this.handleInputChange.bind(this)}
                    />
                </DialogContent>
                <DialogActions>
                    {loading && <Loader />}
                    {error && <small>Error; Please try again</small>}
                    <Button onClick={this.handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleCreateEvent} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </div>
        );
    }
}

export default FormDialog;

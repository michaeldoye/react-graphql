import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CommentPanel from "../comments/comments";
import CommentForm from "../comments/commentForm";
import { DeleteEvent } from "./event-list-query";
import { Mutation } from "react-apollo";

const styles = {
    card: {
        maxWidth: "none",
    },
    media: {
        height: 140,
    },
    date: {
        marginBottom: 10,
    },
    pos: {
        marginBottom: 12,
    },
};

interface ComponentState {
    comment: string;
    item: any;
    showComments: boolean;
}

interface ComponentProps {
    classes: any;
    item: any;
    onDeleteEvent: Function;
}

class SingleEvent extends Component<ComponentProps, ComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            comment: "",
            item: this.props.item,
            showComments: false,
        };
    }

    public handleShowComments(): void {
        this.setState(prevState => ({
            showComments: !prevState.showComments,
        }));
    }

    public handleEventDelete(deleteEvent: any, eventId: string): void {
        this.props.onDeleteEvent(deleteEvent, eventId);
    }

    render(): React.ReactElement<any> | null {
        const { classes } = this.props;
        const { item, showComments } = this.state;

        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={"https://placehold.it/600"}
                    title="Article Image"
                />
                <CardContent>
                    <Typography className={classes.date} color="textSecondary">
                        {item.when}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {item.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {item.where}
                    </Typography>
                    <Typography className="card-text" component="p">
                        {item.description}
                    </Typography>

                    <CommentForm eventId={item.id} showComments={showComments} />

                    {showComments && <CommentPanel eventId={item.id} />}
                </CardContent>
                <CardActions className="card-actions">
                    <Button
                        size="small"
                        color="primary"
                        onClick={this.handleShowComments.bind(this)}>
                        {showComments ? "hide" : "show"} Comments
                    </Button>
                    <Tooltip title="Delete Event" aria-label="Remove">
                        <Mutation mutation={DeleteEvent}>
                            {(deleteEvent, { loading, error, data }) => {
                                if (loading) return "loading...";
                                if (error) return "try again...";
                                return (
                                    <IconButton
                                        onClick={this.handleEventDelete.bind(
                                            this,
                                            deleteEvent,
                                            item.id
                                        )}
                                        className="delete-button"
                                        aria-label="Delete">
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                );
                            }}
                        </Mutation>
                    </Tooltip>
                </CardActions>
            </Card>
        );
    }
}

// @ts-ignore
SingleEvent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleEvent);

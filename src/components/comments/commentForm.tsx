import React, { Component, RefObject } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Mutation } from "react-apollo";
import { COMMENT_ON_EVENT } from "./comment.mutations";
import TextField from "@material-ui/core/TextField";

const styles = () => ({
    root: {
        width: "100%",
    },
});

interface ComponentProps {
    classes: any;
    showComments: boolean;
    eventId: string;
}

class CommentForm extends Component<ComponentProps, {}> {
    input: RefObject<HTMLFormElement>;
    constructor(props: any) {
        super(props);
        this.input = React.createRef<HTMLFormElement>();
    }

    getValueFromFormField(e: any) {
        return e.target.children[0].lastElementChild.children[0].value;
    }

    clearInput() {
        const form = this.input.current;
        // @ts-ignore
        form.children[0].lastElementChild.children[0].value = null;
    }

    render() {
        const { classes, eventId, showComments } = this.props;
        return (
            <div className={classes.root}>
                <Mutation mutation={COMMENT_ON_EVENT}>
                    {(commentOnEvent, { loading, error, data }) => {
                        if (loading) return "loading...";
                        if (error) return "try again...";
                        return (
                            <form
                                ref={this.input}
                                onSubmit={(ev: any) => {
                                    ev.preventDefault();
                                    commentOnEvent({
                                        variables: {
                                            eventId: eventId,
                                            content: this.getValueFromFormField(ev),
                                            createdAt: new Date(),
                                        },
                                    }).then(() => this.clearInput());
                                }}>
                                {showComments && (
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Comment"
                                        type="text"
                                        fullWidth
                                    />
                                )}
                            </form>
                        );
                    }}
                </Mutation>
            </div>
        );
    }
}

// @ts-ignore
CommentForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentForm);

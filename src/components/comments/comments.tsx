import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Query } from "react-apollo";
import { GetComments } from "../EventList/event-list-query";
import LinearLoader from "../Loader/LinearLoader";
import moment from "moment";
import "./comments.scss";

const styles = () => ({
    root: {
        width: "100%",
    },
});

interface ComponentState {
    expanded: any;
}

interface ComponentProps {
    classes: any;
    comments: any;
    eventId: string;
    fetchComments: Function;
}

class CommentPanel extends Component<ComponentProps, ComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            expanded: null,
        };
    }

    render() {
        const { classes, eventId } = this.props;
        return (
            <div className={classes.root}>
                <Query
                    query={GetComments}
                    pollInterval={500}
                    fetchPolicy={`network-only`}
                    variables={{ eventId }}>
                    {({ loading, error, data }) => {
                        if (loading) return <LinearLoader />;
                        if (error) return `Error! ${error.message}`;

                        return (
                            <div className="comments">
                                {data.getComments.map(
                                    (comment: any, idx: number) => (
                                        <div className="comment" key={idx}>
                                            {comment.content}
                                            <span className="comment-time">
                                                {moment(comment.createdAt).fromNow()}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

// @ts-ignore
CommentPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentPanel);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme: any) => ({
    progress: {
        margin: theme.spacing.unit * 2,
        position: "absolute",
        top: "50%",
        left: "50%",
    },
});

function Loader(props: any) {
    const { classes } = props;
    return (
        <div>
            <CircularProgress className={classes.progress} color="secondary" />
        </div>
    );
}

Loader.propTypes = {
    classes: PropTypes.object.isRequired,
};

// @ts-ignore
export default withStyles(styles)(Loader);

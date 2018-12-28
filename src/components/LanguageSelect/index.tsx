import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { LANGUAGE_OPTIONS } from "../../shared/constants";

const styles = (theme: any) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

interface ComponentProps {
    classes: any;
    changeHandler: any;
    language: string;
}

class LanguageSelect extends Component<ComponentProps, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const { classes, language, changeHandler } = this.props;

        return (
            <form className={classes.root} autoComplete="off">
                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel htmlFor="filled-age-simple">Language</InputLabel>
                    <Select
                        value={language}
                        onChange={changeHandler}
                        input={<FilledInput name="age" id="filled-age-simple" />}>
                        {LANGUAGE_OPTIONS.map(opt => (
                            <MenuItem key={opt} value={opt}>
                                {opt}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </form>
        );
    }
}

// @ts-ignore
LanguageSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

// @ts-ignore
export default withStyles(styles)(LanguageSelect);

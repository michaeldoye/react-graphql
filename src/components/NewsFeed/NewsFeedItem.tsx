import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
    card: {
        maxWidth: 'none',
    },
    media: {
        height: 140,
    },
    date: {
        marginBottom: 10,
    },
};

function NewsFeedItem(props: any) {
    const { classes, item } = props;
    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={item.image}
                title="Article Image"
            />
            <CardContent>
                <Typography className={classes.date} color="textSecondary">
                    {item.pubDate}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
                </Typography>
                <Typography
                    className="card-text"
                    component="p"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                />
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    {item.primaryLink}
                </Button>
                <Button size="small" color="primary">
                    {item.secondaryLink}
                </Button>
            </CardActions>
        </Card>
    );
}

NewsFeedItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewsFeedItem);

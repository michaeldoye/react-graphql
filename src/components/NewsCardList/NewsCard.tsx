// import React from "react";
//
// export const NewsCard = ({ item }: any) => {
//     return (
//         <div className="card">
//             <img className="card-img-top" src={item.image} alt="Card image cap" />
//             <ul className="list-group list-group-flush">
//                 <li className="list-group-item">{item.pubDate}</li>
//             </ul>
//             <div className="card-body">
//                 <h5 className="card-title">{item.title}</h5>
//                 <p
//                     className="card-text"
//                     dangerouslySetInnerHTML={{ __html: item.content }}
//                 />
//                 <a
//                     href={`https://magic.wizards.com${item.link}`}
//                     target="_blank"
//                     className="btn btn-primary">
//                     Read More
//                 </a>
//             </div>
//         </div>
//     );
// };

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
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    date: {
        marginBottom: 10,
    },
};

function NewsCard(props: any) {
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

NewsCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewsCard);

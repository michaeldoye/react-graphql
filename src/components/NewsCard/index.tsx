import React from "react";
import './news-card.css';

function NewsCard({...props}: any) {
    const { item, index} = props;

    return (
        <div className="card" key={index}>
            <img className="card-img-top" src={item.image} alt="Card image cap" />
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{item.pubDate}</li>
            </ul>
            <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text" dangerouslySetInnerHTML={{__html: item.content}}/>
                <a href={item.link} className="btn btn-primary">Read More</a>
            </div>
        </div>
    )
}

export default NewsCard;
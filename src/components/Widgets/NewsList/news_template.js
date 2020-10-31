import React from 'react';
import {Link} from 'react-router-dom';
import style from './newslist.css';
import CardInfo from '../CardInfo/cardinfo';
import {CSSTransition} from 'react-transition-group';

const NewsTemplate = (props) => {

    const renderCardInfo = (teamId, date) =>{
        return props.teams.length === 0
        ? null
        : <CardInfo teams={props.teams} articleDate={date} team={teamId}/>
    }

    const renderData = () => {
        return props.news.map((item, i) => {
            return <CSSTransition
            classNames={{
                enter:style.newslist_wrapper,
                enterActive:style.newslist_wrapper_enter
            }}
            timeout={500}
            key={i}
        >
            <div>
                <div className={style.newslist_item}>
                    <Link to={`articles/${item.id}`}>
                        {renderCardInfo(item.team, item.date)}
                        <h2>{item.title}</h2>
                    </Link>
                </div>
            </div>
        </CSSTransition>
        });
    }

    return(
        <div>
            {renderData()}
        </div>
    )
}

export default NewsTemplate;
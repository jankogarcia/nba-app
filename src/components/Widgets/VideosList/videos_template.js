import React from 'react';
import {Link} from 'react-router-dom';
import styles from './videoslist.css';
import CardInfo from '../CardInfo/cardinfo';

const VideosTemplate = (props) => {
    
    const renderCardInfo = (teamId, date) =>{
        return props.teams.length === 0
        ? null
        : <CardInfo teams={props.teams} articleDate={date} team={teamId}/>
    }

    const renderData = () => {
        return props.videos.map((item, i) => {
            return <Link
                to={`videos/${item.id}`}
                key={i}
            >
                <div className={styles.videoListItem_wrapper}>
                    <div className={styles.left}
                    style={{
                        background:`url(/images/videos/${item.image})`
                    }}>
                        <div></div>
                    </div>
                    <div className={styles.right}>
                        {renderCardInfo(item.team, item.date)}
                        <h2>{item.title}</h2>
                    </div>
                </div>
            </Link>
        });
    }

    return(
        <div>{renderData()}</div>
    )
}

export default VideosTemplate;
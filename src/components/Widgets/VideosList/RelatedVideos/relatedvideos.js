import React from 'react';
import VideosTemplate from '../../VideosList/videos_template';
import styles from '../videoslist.css';


const RelatedVideos = (props) => {
    const renderData = () => {
        return <VideosTemplate videos={props.data.videos} teams={props.data.teams} />
    }

    return(
        <div className={styles.relatedWrapper}>
            {renderData()}
        </div>
    )
}

export default RelatedVideos;
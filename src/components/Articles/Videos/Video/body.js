import React from 'react';
import styles from '../../articles.css';
import {YT_URL} from '../../../../config';
import RelatedVideos from '../../../Widgets/VideosList/RelatedVideos/relatedvideos';

const Body = (props) => {
    return(
        <div className={styles.videoWrapper}>
            <h1>{props.video.title}</h1>
            <iframe
                title="videoplayer"
                width="100%"
                height="300px"
                src={`${YT_URL}${props.video.url}`}
            >
            </iframe>
            <RelatedVideos data={props.relatedVideosData}/>
        </div>
    )
}

export default Body;
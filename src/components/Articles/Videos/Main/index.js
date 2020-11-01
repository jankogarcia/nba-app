import React, {Component} from 'react';
import VideosList from '../../../Widgets/VideosList/videoslist';

const VideosMain = (props) => {
    return (
        <VideosList 
            type="card"
            title={false}
            loadMore={true}
            start={0}
            amount={5}
        />
    )
}

export default VideosMain;


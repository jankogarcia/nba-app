import React from 'react';
import VideosList from '../../../Widgets/VideosList/videoslist';

const VideosMain = () => {
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
import React from 'react';
import NewsSlider from '../Widgets/NewsSlider/slider';
import NewsList from '../Widgets/NewsList/newslist';
import VideosList from '../Widgets/VideosList/videoslist';

const Home = () => {
    return(
        <div>
            <NewsSlider 
                type="news_slider" 
                start={0} 
                amount={3} 
                settings={{
                    dots: false,
                }}/>
            <NewsList
                type="card"
                loadMore={true}
                start={3}
                amount={3}
            />
            <VideosList
                type="card"
                title={true}
                loadMore={true}
                start={0}
                amount={3}
            />
        </div>
    )
}

export default Home;
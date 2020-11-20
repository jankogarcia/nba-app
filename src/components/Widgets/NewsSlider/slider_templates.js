import React from 'react';
import Slick from 'react-slick';
import {Link} from 'react-router-dom';
import style from './news.css';

const SliderTemplates = (props) => {

    let template = null;
    
    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        ...props.settings
    }

    const printNews = () => {
        return props.data.map((item, i) => {
            return(
            <div key={i}>
                <div className={style.slider}>
                    <div className={style.image}
                        style={{
                            background:`url(${item.image})`
                        }}
                    >
                        <Link to={`/articles/${item.id}`}>
                            <div className={style.title_caption}>
                                {item.title}  
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            )
        });
    }

    switch(props.type){
        case "news_slider":
            template = printNews()
            break;
        default: 
            template = <div>template not found</div>;
    }

    return(
        <div>
            <Slick {...settings}>
                {/* {printData()} */}
                {template}
            </Slick>
        </div>
    )
}

export default SliderTemplates;
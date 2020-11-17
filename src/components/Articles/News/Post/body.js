import React from 'react';
import styles from '../../articles.css';

const Body = (props) => {
    return(
        <div className={styles.articleBody}>
            <h1>{props.article.title}</h1>
            <div className={styles.articleImage}
                style={{
                    background:`url('${props.image}')`
                }}
            ></div>
            <div className={styles.articleText}
                dangerouslySetInnerHTML={{
                    __html:props.article.body
                }}
            >
                {/* {props.article.body} */}
            </div>
        </div>
    )
}

export default Body;
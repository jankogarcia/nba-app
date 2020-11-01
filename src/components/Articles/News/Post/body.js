import React from 'react';
import styles from '../../articles.css';

const Body = (props) => {
    return(
        <div className={styles.articleBody}>
            <h1>{props.article.title}</h1>
            <div className={styles.articleImage}
                style={{
                    background:`url('/images/articles/${props.article.image}')`
                }}
            ></div>
            <div className={styles.articleText}>
                {props.article.body}
            </div>
        </div>
    )
}

export default Body;
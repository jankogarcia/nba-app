import React from 'react';
import styles from '../articles.css';

const PostInfo = (props) => {
    return(
        <div className={styles.postInformation}>
            <div>
            Date:<span>{props.data.date}</span>
            </div>
            <div>
            Author:<span>{props.data.author}</span>
            </div>
        </div>
    )
}

export default PostInfo;
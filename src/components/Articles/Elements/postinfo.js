import React from 'react';
import styles from '../articles.css';
import {formatDate} from '../../../config';

const PostInfo = (props) => {
    return(
        <div className={styles.postInformation}>
            <div>
            Date:<span>{formatDate(props.data.date)}</span>
            </div>
            <div>
            Author:<span>{props.data.author}</span>
            </div>
        </div>
    )
}

export default PostInfo;
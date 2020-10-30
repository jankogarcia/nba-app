import React from 'react';
import FontAwesome from 'react-fontawesome'
import styles from './cardinfo.css'

const CardInfo = (props) => {
    return (
        <div className={styles.cardInfo}>
            <span className={styles.teamName}>
                {props.team.name}
            </span>
            <span className={styles.date}>
                <FontAwesome name="clock-o"/>
                {props.articleDate}
            </span>
        </div>
    )
}

export default CardInfo;
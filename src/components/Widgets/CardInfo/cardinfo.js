import React from 'react';
import FontAwesome from 'react-fontawesome'
import styles from './cardinfo.css'
import {formatDate} from '../../../config';

const CardInfo = (props) => {

    const getTeamName = () => {
        return props.teams.length === 0
        ? null
        : getName()
    }

    const getName = () => {
        let data = props.teams.find(team => team.teamId === props.team);
        return data ? data.name : null
    }
    
    return (
        <div className={styles.cardInfo}>
            <span className={styles.teamName}>
                {getTeamName()}
            </span>
            <span className={styles.date}>
                <FontAwesome name="clock-o"/>
                {formatDate(props.articleDate)}
            </span>
        </div>
    )
}

export default CardInfo;
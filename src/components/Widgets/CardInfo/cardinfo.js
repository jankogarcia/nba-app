import React from 'react';
import FontAwesome from 'react-fontawesome'
import styles from './cardinfo.css'

const CardInfo = (props) => {

    const getTeamName = () => {
        return props.teams.length === 0
        ? null
        : getName()
    }

    const getName = () => {
        let data = props.teams.find(team => team.id === props.team);
        return data ? data.name : null
    }
    
    return (
        <div className={styles.cardInfo}>
            <span className={styles.teamName}>
                {getTeamName()}
            </span>
            <span className={styles.date}>
                <FontAwesome name="clock-o"/>
                {props.articleDate}
            </span>
        </div>
    )
}

export default CardInfo;
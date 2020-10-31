import React from 'react';
import styles from '../articles.css';

const TeamInfo = (props) => {
    return(
        <div className={styles.articleTeamHeader}>
            <div className={styles.left}
                style={{
                    background:`url('/images/teams/${props.team.logo}')`
                }}
            >

            </div>
            <div className={styles.right}>
                <div>
                    <span>
                        {props.team.name}
                    </span>
                </div>
                <div>
                    {props.team.stats.map((stat, i) => <strong key={i}>W{stat.wins}-L{stat.defeats}</strong>)}
                </div>
            </div>
        </div>
    )
}

export default TeamInfo;
import React from 'react';
import TeamInfo from '../../Elements/teaminfo';

const Header = (props) => {

    const renderTeamInfo = () => {
        return <TeamInfo team={props.team}/>
    }

    return(
        <div>
            {renderTeamInfo()}
        </div>
    )
}

export default Header;
import React from 'react';
import TeamInfo from '../../Elements/teaminfo';
import PostInfo from '../../Elements/postinfo';

const Header = (props) => {
    
    const renderTeamInfo = () => {
        return <TeamInfo team={props.team}/>
    }

    const renderPostInfo = () => {
        return <PostInfo data={{date:props.date, author:props.author}}/>
    }

    return(
        <div>
            {renderTeamInfo()}
            {renderPostInfo()}
        </div>
    )
}

export default Header;
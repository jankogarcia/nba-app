import React, {Component} from 'react';
import Header from './header';
import Body from './body';
import { firebaseDb, dbTeams, dbVideos, dataFlatter } from '../../../../firebase';

class Videos extends Component{

    state={
        video:null,
        team:null,
        teams:[],
        relatedVideos:[]
    }

    componentDidMount(){
        this.request();
    }

    request = () => {
        firebaseDb
        .ref(`videos/${this.props.match.params.id}`)
        .once('value')
        .then((snapshot) => {
            let video = snapshot.val()

            dbTeams
            .orderByChild('teamId')
            .equalTo(video.team)
            .once('value')
            .then((snapshot) => {
                let team = dataFlatter(snapshot)

                this.setState({
                    video,
                    team: team[0]
                })

                this.requestRelated(team[0]);
            })
            .catch(e => {
                console.log(e)
            })
        })
        .catch(e => {
            console.log(e)
        })
    }

    requestRelated = (team) => {
        dbTeams
        .once('value')
        .then(snapshot => {
            let teams = dataFlatter(snapshot)
            
            dbVideos
            .orderByChild('team')
            .equalTo(team.teamId)
            .limitToFirst(3)
            .once('value')
            .then(snapshot => {
                let relatedVideos = dataFlatter(snapshot)
                this.setState({
                    teams,
                    relatedVideos
                })
            })
            .catch(e => {
                console.log(e)
            })
        })
        .catch(e => {
            console.log(e)
        })
    }

    renderHeader(){
        return this.state.team === null
        ? null
        : <Header team={this.state.team}/>
    }

    renderBody(){
        return this.state.video === null || this.state.teams.length === 0
        ? null
        : <Body video={this.state.video} relatedVideosData={{teams:this.state.teams, videos:this.state.relatedVideos }}/>
    }


    render(){
        return(
            <div>
                {this.renderHeader()}
                {this.renderBody()}
            </div>
        )
    }
}

export default Videos;
import React, {Component} from 'react';
import axios from 'axios';
import {URL} from '../../../../config';
import Header from './header';
import Body from './body';

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

    componentWillUnmount(){
        if(this._asyncRequest){
            this._asyncRequest.cancel();
        }
    }

    request = () => {
        this._asyncRequest = axios.get(`${URL}videos/${this.props.match.params.id}`)
        .then(response => {
            this._asyncRequest = null;
            let teamId = response.data.team;

            this._asyncRequest = axios.get(`${URL}teams/${teamId}`)
            .then(innerResponse => {
                this._asyncRequest = null;
                this.setState({
                    video: response.data,
                    team: innerResponse.data
                });
                this.requestRelated(innerResponse.data);
            })
        })
    }

    requestRelated = (team) => {
        this._asyncRequest = axios.get(`${URL}teams`)
        .then(response => {
            this._asyncRequest  = null;
            let teams = response.data;
            this._asyncRequest = axios.get(`${URL}videos?q=${team.city}&_limit=3`)
            .then(innerResponse => {
                this._asyncRequest  = null;
                console.log(innerResponse.data)
                this.setState({
                    teams,
                    relatedVideos:innerResponse.data
                });
            })
        })
    }

    renderHeader(){
        return this.state.team === null
        ? null
        : <Header team={this.state.team}/>
    }

    renderBody(){
        return this.state.video === null || this.state.teams.length === 0 ||  this.state.relatedVideos.length === 0
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
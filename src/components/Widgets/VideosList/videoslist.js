import React, {Component} from 'react';
import axios from 'axios';
import {URL} from '../../../config';
import Button from '../Buttons/button';
import styles from './videoslist.css';
import VideosTemplate from './videos_template';

class VideosList extends Component{

    state={
        teams:[],
        videos:[],
        start: this.props.start,
        amount: this.props.amount,
        end:this.props.start + this.props.amount,
    }

    loadMore = () => {
        let end = this.state.end + this.state.amount;
        this.request(this.state.end, end);
    }

    getTeams = () =>
    {
        this._asyncRequest = axios.get(`${URL}teams`)
        .then(response => {
            this._asyncRequest = null;
            this.setState({teams: response.data});
        })
    }

    request = (start, end) => {
        this._asyncRequest = axios.get(`${URL}videos?_start=${start}&_end=${end}`)
        .then(response => {
            this._asyncRequest = null;
            this.setState({
                videos: [...this.state.videos,...response.data],
                start,
                end
            });
        })
    }

    renderTitle = () => {
        return this.props.title 
        ? <h3><strong>NBA videos</strong></h3>
        : null
    }

    renderButton = () => {
        return this.props.loadMore
        ? <Button
            type="loadmore"
            cta="Load More Videos"
            loadMore = {() => this.loadMore()}
          />
        : <Button 
            type="linkTo"
            cta="More Videos"
            linkTo="/videos"
          />
    }

    renderVideos = () => {
        let template = null;
        switch(this.props.type){
            case "card":
                template = <VideosTemplate videos={this.state.videos} teams={this.state.teams}/>
                break;
            default:
                template = null
        }
        return template;
    }

    componentWillUnmount(){
        if(this._asyncRequest){
            this._asyncRequest.cancel();
        }
    }

    componentDidMount(){
        if(this.state.teams.length === 0){
            this.getTeams()
        }
        this.request(this.state.start, this.state.end);
    }

    render(){
        return(
            <div className={styles.videosList_wrapper}>
                {this.renderTitle()}
                {this.renderVideos()}
                {this.renderButton()}
            </div>
        )
    }
}

export default VideosList;
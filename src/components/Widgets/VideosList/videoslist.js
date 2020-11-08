import React, {Component} from 'react';
import Button from '../Buttons/button';
import styles from './videoslist.css';
import VideosTemplate from './videos_template';
import {dbVideos, dbTeams, dataFlatter} from '../../../firebase';

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
        this.request(this.state.end + 1, end);
    }

    getTeams = () =>
    {
        dbTeams
        .once('value')
        .then((snapshot) => {
            let teams = dataFlatter(snapshot)
            this.setState({teams})
        })
        .catch(e => {
            console.log(e)
        })
    }

    request = (start, end) => {
        dbVideos
        .orderByChild('id')
        .startAt(start)
        .endAt(end)
        .once('value')
        .then((snapshot) => {
            let videos = dataFlatter(snapshot)
            this.setState({
                videos:[...this.state.videos, ...videos],
                start,
                end
            })
        })
        .catch(e => {
            console.log(e)
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
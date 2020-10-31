import React, {Component} from 'react';
import axios from 'axios';
import {URL} from '../../../../config';
import styles from '../../articles.css';
import Header from './header';
import Body from './body';

class NewsArticles extends Component{
    
    state={
        article:null,
        team:null
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
        this._asyncRequest = axios.get(`${URL}articles/${this.props.match.params.id}`)
        .then(response => {
            this._asyncRequest = null;
            let teamId = response.data.team;

            this._asyncRequest = axios.get(`${URL}teams/${teamId}`)
            .then(innerResponse => {
                this._asyncRequest = null;
                this.setState({
                    article: response.data,
                    team: innerResponse.data
                });
            })
        })
    }

    renderHeader(){
        return this.state.team === null || this.state.article === null
        ? null
        : <Header 
            team={this.state.team}
            date={this.state.article.date}
            author={this.state.article.author}
          />
    }

    renderBody(){
        return this.state.article === null
        ? null
        : <Body article={this.state.article}/>
    }

    render(){
        return(
            <div className={styles.article_wrapper}>
                {this.renderHeader()}
                {this.renderBody()}
            </div>
        )
    }
}

export default NewsArticles;
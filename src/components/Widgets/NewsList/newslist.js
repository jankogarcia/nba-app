import React, {Component} from 'react';
import {TransitionGroup} from 'react-transition-group';
import axios from 'axios';
import {URL} from '../../../config';
import Button from '../Buttons/button';
import NewsTemplate from './news_template';

class NewsList extends Component{
    
    state={
        items:[],
        teams:[],
        start:this.props.start,
        end:this.props.start + this.props.amount,
        amount:this.props.amount
    }

    componentDidMount(){
        if(this.state.teams.length === 0){
            this.getTeams()
        }
        this.request(this.state.start, this.state.end);
    }

    request = (start, end) => {
        this._asyncRequest = axios.get(`${URL}articles?_start=${start}&_end=${end}`)
        .then(response => {
            this._asyncRequest = null;
            this.setState({
                items: [...this.state.items,...response.data],
                start,
                end
            });
        })
    }

    getTeams = () =>
    {
        this._asyncRequest = axios.get(`${URL}teams`)
        .then(response => {
            this._asyncRequest = null;
            this.setState({teams: response.data});
        })
    }

    componentWillUnmount(){
        if(this._asyncRequest){
            this._asyncRequest.cancel();
        }
    }

    renderData(templateName){
        let template = null;
        switch(templateName){
            case 'card':
                template = <NewsTemplate news={this.state.items} teams={this.state.teams}/>
                break;
            default:
                template = null;
        }

        return template
    }

    loadMore =() => {
        let end = this.state.end + this.state.amount;
        this.request(this.state.end, end);
    }

    render(){
        return(
            <div>
                <TransitionGroup
                    component="div"
                    className="list">
                    {this.renderData(this.props.type)}
                </TransitionGroup>
                
                <Button 
                    type="loadmore"
                    loadMore = {() => this.loadMore()}
                    cta="Load More News"
                />
            </div>
        )
    }
}

export default NewsList;
import React, {Component} from 'react';
import {TransitionGroup} from 'react-transition-group';
import Button from '../Buttons/button';
import NewsTemplate from './news_template';
import {dbArticles, dbTeams, dataFlatter} from '../../../firebase';

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
        dbArticles
        .orderByChild('id')
        .startAt(start)
        .endAt(end)
        .once('value')
        .then((snapshot) => {
            let articles = dataFlatter(snapshot);
            this.setState({
                items:[...this.state.items, ...articles],
                start,
                end
            })
        })
        .catch(e => {
            console.log(e)
        })
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

    renderData(){
        if(this.props.type === null)
            return null;
        
        return <NewsTemplate news={this.state.items} teams={this.state.teams} type={this.props.type}/>
    }

    loadMore =() => {
        let end = this.state.end + this.state.amount;
        this.request(this.state.end + 1, end);
    }

    render(){
        return(
            <div>
                <TransitionGroup
                    component="div"
                    className="list">
                    {this.renderData()}
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
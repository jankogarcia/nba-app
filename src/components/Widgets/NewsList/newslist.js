import React, {Component} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {URL} from '../../../config';
import style from './newslist.css';
import Button from '../Buttons/button';

class NewsList extends Component{
    
    state={
        items:[],
        start:this.props.start,
        end:this.props.start + this.props.amount,
        amount:this.props.amount
    }

    componentDidMount(){
        this.request(this.state.start, this.state.end);
    }

    request = (start, end) => {
        this._asyncRequest = axios.get(`${URL}articles?_start=${start}&_end=${end}`)
        .then(response => {
            this._asyncRequest = null;
            this.setState({items: [...this.state.items,...response.data]});
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
                template = this.renderNewsCard()
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

    renderNewsCard(){
        return this.state.items.length === 0
        ? null
        : this.state.items.map((item, i) => {
            return <CSSTransition
                classNames={{
                    enter:style.newslist_wrapper,
                    enterActive:style.newslist_wrapper_enter
                }}
                timeout={500}
                key={i}
            >
                <div>
                    <div className={style.newslist_item}>
                        <Link to={`articles/${item.id}`}>
                            <h2>{item.title}</h2>
                        </Link>
                    </div>
                </div>
            </CSSTransition>
            
        });
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
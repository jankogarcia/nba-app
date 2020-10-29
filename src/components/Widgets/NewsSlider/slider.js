import React, {Component} from 'react';
import axios from 'axios';
import SliderTemplates from './slider_templates';
import {URL} from '../../../config'

class NewsSlider extends Component{
    state = {
        news:null
    }

    componentDidMount(){
        this._asyncRequest = axios.get(`${URL}articles?_start=${this.props.start}&_end=${this.props.amount}`)
        .then(response => {
            this._asyncRequest = null;
            this.setState({news: response.data});
        })
    }

    componentWillUnmount(){
        if(this._asyncRequest){
            this._asyncRequest.cancel();
        }
    }

    renderData(){
        return this.state.news === null 
        ? "loading data"
        : <SliderTemplates data={this.state.news} type={this.props.type} settings={this.props.settings}/>
    } 

    render(){
        return(
            <div>
                {this.renderData()}
            </div>
        )
    }
}

export default NewsSlider;
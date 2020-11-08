import React, {Component} from 'react';
import SliderTemplates from './slider_templates';
import { dbArticles, dataFlatter } from '../../../firebase';

class NewsSlider extends Component{
    state = {
        news:null
    }

    componentDidMount(){
        dbArticles
        .limitToFirst(this.props.amount)
        .once('value')
        .then((snapshot) => {
            const news = dataFlatter(snapshot)
            this.setState({news})
        })
        .catch(e => {
            console.log(e)
        })
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
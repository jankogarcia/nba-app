import React, {Component} from 'react';
import axios from 'axios';
import {URL} from '../../../../config';
import Header from './header';

class Videos extends Component{
    render(){
        console.log(this.props)
        return(
            <div>
                <Header/>
            </div>
        )
    }
}

export default Videos;
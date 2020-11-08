import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom"
import Home from './components/Home/home';
import Layout from './hoc/Layout/layout';
import NewsArticles from './components/Articles/News/Post/index';
import Videos from './components/Articles/Videos/Video/index';
import News from './components/Articles/News/News/index';
import VideosMain from './components/Articles/Videos/Main/index';
import SignIn from './components/SignIn/signin';

class Routes extends Component{
    render(){
        //console.log(this.props)
        return(
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/news" exact component={News}/>
                    <Route path="/videos" exact component={VideosMain}/>
                    <Route path="/sign-in" exact component={SignIn}/>
                    {/* <Route path="/sign-out" exact component={SignOut}/> */}
                    <Route path="/articles/:id" exact component={NewsArticles}/>
                    <Route path="/videos/:id" exact component={Videos}/>
                </Switch>
            </Layout>
        )
    }
}

export default Routes;
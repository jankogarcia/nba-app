import React from 'react';
import {Switch} from "react-router-dom"
import Home from './components/Home/home';
import Layout from './hoc/Layout/layout';
import NewsArticles from './components/Articles/News/Post/index';
import Videos from './components/Articles/Videos/Video/index';
import News from './components/Articles/News/News/index';
import VideosMain from './components/Articles/Videos/Main/index';
import SignIn from './components/SignIn/signin';
import Dashboard from './components/Dashboard/dashboard';
import PrivateRoutes from './components/AuthRoutes/privateroutes';
import PublicRoutes from './components/AuthRoutes/publicroutes';

const Routes = (props) => {
    return(
        <Layout {...props}>
            <Switch>
                <PublicRoutes {...props} restricted={false} path="/" exact component={Home} />
                <PublicRoutes {...props} restricted={false} path="/news" exact component={News}/>
                <PublicRoutes {...props} restricted={false} path="/videos" exact component={VideosMain}/>
                <PublicRoutes {...props} restricted={true} path="/sign-in" exact component={SignIn}/>
                <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard}/>
                <PublicRoutes {...props} restricted={false} path="/articles/:id" exact component={NewsArticles}/>
                <PublicRoutes {...props} restricted={false} path="/videos/:id" exact component={Videos}/>
            </Switch>
        </Layout>
    )
}

export default Routes;
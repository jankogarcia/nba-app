import React, {Component} from 'react';
import styles from '../../articles.css';
import Header from './header';
import Body from './body';
import {firebaseDb, dbTeams, firebaseStorage, dataFlatter} from '../../../../firebase';

class NewsArticles extends Component{
    
    state={
        article:null,
        team:null,
        imageUrl:''
    }

    componentDidMount(){
        this.request();
    }

    getImageUrl = (filename) => {
        firebaseStorage
        .ref('images/articles')
        .child(filename)
        .getDownloadURL()
        .then(url => {
            this.setState({imageUrl:url})
        })
        .catch(e => {
            console.log(e)
        })
    }

    request = () => {
        firebaseDb
        .ref(`articles/${this.props.match.params.id}`)
        .once('value')
        .then((snapshot) => {
            let article = snapshot.val();
            this.getImageUrl(article.image);
            
            dbTeams
            .orderByChild('teamId')
            .equalTo(article.team)
            .once('value')
            .then((snapshot) => {
                let team = dataFlatter(snapshot)

                this.setState({
                    article,
                    team:team[0]
                })
            })
            .catch(e => {
                console.log(e)
            })

        })
        .catch(e => {
            console.log(e)
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
        : <Body article={this.state.article} image={this.state.imageUrl}/>
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
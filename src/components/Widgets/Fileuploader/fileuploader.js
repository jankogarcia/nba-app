import React, { Component } from 'react';
import {firebaseStorage} from '../../../firebase';
import FileUploader from 'react-firebase-file-uploader';

class Uploader extends Component{
    
    state={
        name:'',
        isUploading:false,
        progress:0,
        fileUrl:''
    }

    HandleUploadStart = () => {
        this.setState({
            isUploading:true,
            progress:0
        })
    }

    HandleUploadError = (error) => {
        this.setState({
            isUploading:false
        })

        console.log(error)
    }

    HandleUploadSuccess = (filename) => {
        console.log(filename)
        this.setState({
            name:filename, 
            progress:100, 
            isUploading:false
        })

        firebaseStorage
        .ref('images/articles')
        .child(filename)
        .getDownloadURL()
        .then(url => {
            this.setState({
                fileUrl:url
            })
        })
        .catch(e => {
            console.log(e.error)
        })

        this.props.filename(filename)
    }

    HandleProgress = (progress) => {
        this.setState({
            progress
        })
    }

    render(){
        return(
            <div>
                <FileUploader 
                    accept="image/*"
                    name="image"
                    randomizeFilename
                    storageRef={firebaseStorage.ref('images/articles')}
                    onUploadStart={this.HandleUploadStart}
                    onUploadError={this.HandleUploadError}
                    onUploadSuccess={this.HandleUploadSuccess}
                    onProgress={this.HandleProgress}
                />

                {
                    this.state.isUploading 
                    ? <p>Progress: {this.state.progress}</p> 
                    : null
                }
                {
                    this.state.fileUrl !== ''
                    ? <img style={{width:'300px'}} src={this.state.fileUrl} alt=""/>
                    : null
                }
            </div>
        )
    }
}

export default Uploader;
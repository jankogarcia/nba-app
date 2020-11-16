import React, { Component } from 'react';
import styles from './dashboard.css'
import Forms from '../Widgets/Forms/forms';
import {Editor} from 'react-draft-wysiwyg';
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {dbTeams, dbArticles} from '../../firebase';
import FileUploader from '../Widgets/Fileuploader/fileuploader';

class Dashboard extends Component{

    state={
        editorState:EditorState.createEmpty(),
        postingError:'',
        loading:false,
        formData:{
            author:{
                element:'input',
                value:'',
                config:{
                    name:'author_input',
                    type:'text',
                    placeholder:'enter your name'
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            title:{
                element:'input',
                value:'',
                config:{
                    name:'title_input',
                    type:'text',
                    placeholder:'enter the title'
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            body:{
                element:'texteditor',
                value:'',
                valid:true
            },
            teams:{
                element:'select',
                value:'',
                config:{
                    name:'teams_select',
                    options:[]
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            image:{
                element:'image',
                value:'',
                valid:true
            }
        }
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formData){
            dataToSubmit[key] = this.state.formData[key].value
            formIsValid = this.state.formData[key].valid && formIsValid
        }
        
        console.log(dataToSubmit, formIsValid)

        if(formIsValid){
            this.setState({
                loading:true,
                postingError:''
            })

            dbArticles
            .orderByChild('id')
            .limitToLast(1)
            .once('value')
            .then(snapshot => {
                var lastId = null;
                snapshot.forEach(item => {
                    lastId = item.val().id
                })
                console.log(lastId) 
            })
            .catch(e => {
                console.log(e)
            })
            //if some error while submiting
            // this.setState({
            //     postingError: 'pula'
            // })
        }else{
            this.setState({
                loading:false,
                postingError: 'some error from db.'
            })

            
        }
    }

    updateForm = (element, defaultValue = '') => {
        let newformData = {
            ...this.state.formData
        }

        let newElement = {
            ...newformData[element.id]
        }

        if(defaultValue !== ''){
            newElement.value = defaultValue
        }else{
            newElement.value = element.event.target.value
        }

        if(element.blur){
            let validData = this.validate(newElement)
            newElement.valid = validData[0]
            newElement.validationMessage = validData[1]
        }

        newElement.touched = element.blur
        newformData[element.id] = newElement
        this.setState({formData:newformData})
    }

    validate = (element) => {
        let error = [true, ''];

        if(element.validation.required){
            let valid = element.value.trim() !== ''
            let message = valid ? '' : 'field is required'
            error = [valid, message]
        }

        return error;
    }

    submitButton = () => (
        this.state.loading 
        ? 'loading...'
        :<div>
            <button type="submit">Add post</button>
        </div>
    )

    showError = () => (
        this.state.postingError === ''
        ? null
        : <div className={styles.error}>
            {this.state.postingError}
        </div>
    )

    onEditorStateChange = (editorState) =>{
        let contentState = editorState.getCurrentContent();
        //let rawState = convertToRaw(contentState);
        let html = stateToHTML(contentState);        
        this.updateForm({id:'body'}, html)

        this.setState({editorState})
    }

    loadTeams = () => {
        dbTeams
        .once('value')
        .then((snapshot) => {
            let teams = [];
            snapshot.forEach(item => {
                teams.push({
                    value:item.val().teamId,
                    text:item.val().city
                })
            })
            let newFormData = {...this.state.formData}
            let newElement = {...newFormData['teams']}
            //console.log(newFormData)
            newElement.config.options = teams;

            newFormData['teams'] = newElement;
            //console.log(newFormData)
            this.setState({
                formData:newFormData
            })

        })
        .catch(e => {
            this.setState({
                postingError: e.message
            })
        })
    }

    storeFilename = (filename) => {
        console.log(filename)
        this.updateForm({id:'image'}, filename)
    }

    componentDidMount(){
        this.loadTeams();
    }

    render(){
        return(
            <div className={styles.postContainer}>
                <form onSubmit={this.submitForm}>
                    <h2>add post</h2>
                    <FileUploader 
                        filename={(filename) => this.storeFilename(filename)}
                    />
                    <Forms
                        id={'author'}
                        formData={this.state.formData.author}
                        change={(element) => this.updateForm(element)}
                    />
                    <Forms
                        id={'title'}
                        formData={this.state.formData.title}
                        change={(element) => this.updateForm(element)}
                    />
                    <Forms
                        id={'teams'}
                        formData={this.state.formData.teams}
                        change={(element) => this.updateForm(element)}
                    />
                    <Editor
                        editorState={this.state.editorState}
                        wrapperClassName="myEditor-wrapper"
                        editorClassName="myEditor-editor"
                        onEditorStateChange={this.onEditorStateChange}
                    />
                    {this.submitButton()}
                </form>
                {this.showError()}
            </div>
        ) 
    }
}

export default Dashboard;
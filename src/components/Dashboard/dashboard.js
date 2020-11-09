import React, { Component } from 'react';
import styles from './dashboard.css'
import Forms from '../Widgets/Forms/forms';

class Dashboard extends Component{

    state={
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
        
        console.log(dataToSubmit)

        if(formIsValid){
            this.setState({
                loading:true,
                postingError:''
            })

            //if some error while submiting
            // this.setState({
            //     postingError: 'pula'
            // })
        }
    }

    updateForm = (element) => {
        let newformData = {
            ...this.state.formData
        }

        let newElement = {
            ...newformData[element.id]
        }

        newElement.value = element.event.target.value

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

    render(){
        return(
            <div className={styles.postContainer}>
                <form onSubmit={this.submitForm}>
                    <h2>add post</h2>
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
                    {this.submitButton()}
                </form>
                {this.showError()}
            </div>
        ) 
    }
}

export default Dashboard;
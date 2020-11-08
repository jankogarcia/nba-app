import React, {Component} from 'react';
import styles from './signin.css';
import Forms from '../Widgets/Forms/forms';
import {firebase} from '../../firebase';

class SignIn extends Component{
    
    state={
        registerError:'',
        loading:false,
        formData:{
            email:{
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type:'email',
                    placeholder:'enter your email'
                },
                validation:{
                    required:true,
                    email:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            password:{
                element:'input',
                value:'',
                config:{
                    name:'password_input',
                    type:'password',
                    placeholder:'enter your password'
                },
                validation:{
                    required:true,
                    password:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            }
        }
    }

    submitButton = () => (
        this.state.loading 
        ? 'loading...'
        :<div>
            <button onClick={(event) => this.submitForm(event, false)}>Register now</button>
            <button onClick={(event) => this.submitForm(event, true)}>Log in</button>
        </div>
    )
     
    showError = () => (
        this.state.registerError === ''
        ? null
        : <div className={styles.error}>
            {this.state.registerError}
        </div>
    )

    submitForm = (event, isRegistered) => {
        event.preventDefault();
        if(isRegistered !== null){
            let dataToSubmit = {};
            let formIsValid = true;

            for(let key in this.state.formData){
                dataToSubmit[key] = this.state.formData[key].value
                formIsValid = this.state.formData[key].valid && formIsValid
            }
            
            
            if(formIsValid){
                this.setState({
                    loading:true,
                    registerError:''
                })

                if(isRegistered){
                    //login
                    firebase
                    .auth()
                    .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
                    .then(() => {
                        this.props.history.push('/')
                    })
                    .catch(e => {
                        this.setState({
                            loading: false,
                            registerError:e.message
                        })
                        console.log(e)
                    })
                }else{
                    //register new
                    firebase
                    .auth()
                    .createUserWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
                    .then(() => {
                        this.props.history.push('/')
                    })
                    .catch(e => {
                        this.setState({
                            loading: false,
                            registerError:e.message
                        })
                        console.log(e)
                    })
                }
            }
        }

    } 

    validate = (element) => {
        let error = [true, ''];

        if(element.validation.required){
            let valid = element.value.trim() !== ''
            let message = valid ? '' : 'field is required'
            error = [valid, message]
            if(!valid)
                return error;
        }

        if(element.validation.email){
            let valid = /\S+@\S+\.\S+/.test(element.value)
            let message = valid ? '' : 'not a valid email'
            error = [valid, message]
        }

        if(element.validation.password){
            let valid = element.value.length >= 5
            let message = valid ? '' : 'must be greater than 4'
            error = [valid, message]
        }

        return error;
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
        //console.log(newformData)
        this.setState({formData:newformData})
    }

    render(){
        return(
            <div className={styles.signinContainer}>
                <form onSubmit={(event) => this.submitForm(event, null)}>
                    <h2>Register / Log in</h2>
                    <Forms
                        id={'email'}
                        formData={this.state.formData.email}
                        change={(element) => this.updateForm(element)}
                    />
                    <Forms
                        id={'password'}
                        formData={this.state.formData.password}
                        change={(element) => this.updateForm(element)}
                    />
                    {this.submitButton()}
                    {this.showError()}
                </form>
            </div>
        )
    }
}

export default SignIn;
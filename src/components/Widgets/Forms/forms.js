import React from 'react';
import styles from './forms.css';

const Forms = ({formData, change, id}) => {

    const showError = () => {
        let errorMessage = null

        if(formData.validation.required && !formData.valid){
            errorMessage = (
                <div className={styles.labelError}>
                    {formData.validationMessage}
                </div>
            )
        }

        return errorMessage;
    }

    const renderTemplate = () => {
        let formTemplate = null;
        switch(formData.element){
            case 'input':
                formTemplate = (
                    <div>
                        <input 
                        {...formData.config}
                        value={formData.value}
                        onChange={(event) => change({event, id, blur:false})}
                        onBlur={(event) => change({event, id, blur:true})}
                        />
                        {showError()}
                    </div>
                )
                break;
            default:
                formTemplate = null;
        }
        return formTemplate;
    }
    
    return(
        <div>
            {renderTemplate()}
        </div>
    )
}

export default Forms;
import React from "react";

import './form-input.component.styles.css'

const FormInput = ({handleChange, label, ...otherProps}) => {
    return (
        <div className="group">
            <input className="form-input" onChange={handleChange} {...otherProps} />
            {
                label ?
                    <label htmlFor="" className={`${otherProps.value.lenght ? "Shrink" : " "} form-input-label`}>
                        {label}
                    </label>
                    :
                    null
            }
        </div>
    )
}

export default FormInput
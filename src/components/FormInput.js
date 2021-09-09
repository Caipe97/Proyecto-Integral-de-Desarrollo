import React from 'react';

const FormInput = ({handleChange, ...otherProps}) => (
  <input style={{width: "100%"}} onChange={handleChange} {...otherProps}/>
)

export default FormInput;
import React from 'react';

const FormInput = ({handleChange, ...otherProps}) => (
  <input onChange={handleChange} {...otherProps}/>
)

export default FormInput;
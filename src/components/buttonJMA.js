import React from 'react';

const buttonStyle={
    backgroundColor:"white"
};

const buttonJMA =(props)=>{
    <button
        type="button"
        className="fdas"
        style={buttonStyle}
        onClick={()=>{{props.handleClick};{props.handleClick2}}}>
            {props.label}
    </button>
}
export default buttonJMA;
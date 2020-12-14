import React from 'react';
import '../css/Error.css';

const Error = (props) => {
    return (
        <div className='error'>
            <h3 className='error-text'>{props.location.state.message}</h3>
        </div>
    );

}

export default Error;
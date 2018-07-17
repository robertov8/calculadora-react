import React from 'react';
import './Button.css';

export default ({ operation, double, triple, onClick, label }) => {
    let className = 'button ';
    className += operation ? 'operation' : '';
    className += double ? 'double' : '';
    className += triple ? 'triple' : '';

    return (
        <button
            onClick={() => onClick && onClick(label)}
            className={className}>
            {label}
        </button>
    );
}
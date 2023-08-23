import React from 'react';

export const Empty = ({ message }) => {
    return (
        <div>
            <div>
                Vide
            </div>
            <p>
                {message}
            </p>
        </div>
    );
};

export const shortUpperCaseId = (id) =>{
    return id.slice(0,8).toUpperCase();
};



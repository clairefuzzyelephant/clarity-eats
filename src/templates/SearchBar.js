import React, { useState } from 'react';

import "../styling/index.css";

export default function SearchBar({ searchFunction, clearSearch }) {
    const [value, setValue] = useState("");

    function updateValue(e) {
        setValue(e.target.value);
    }

    function checkEnter(e) {
        if(e.key === 'Enter') {
            searchFunction(value); 
        }

    }

    return (
        <div className="searchBar">
            <div>
                <input type="text" placeholder="press enter to search..." value={value} onChange={e => updateValue(e)} onKeyDown={e => checkEnter(e)}/>
            </div>
            <div className="clearButton" 
                onClick={() => {
                    clearSearch();
                    setValue("");
                }} 
                onKeyDown={() => {
                    clearSearch(); 
                    setValue("");}
                }>
                cancel
            </div>
        </div>
    );
}
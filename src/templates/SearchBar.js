import React, { useState } from 'react';

import "../styling/index.css";

export default function SearchBar({ searchFunction, clearSearch }) {
    const [value, setValue] = useState("");

    function updateValue(e) {
        console.log(e.target.value);
        if(e.key === 'Enter') {
            console.log("searching!")
            searchFunction(e.target.value);      
        }
    }

    return (
        <div className="searchBar">
            <div>
                <input type="text" placeholder="press enter to search..." value={value} onChange={e => setValue(e.target.value)} onKeyDown={e => updateValue(e)} />
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
                clear
            </div>
        </div>
    );
}
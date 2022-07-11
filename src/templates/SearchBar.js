import React, { useState } from 'react';

export default function SearchBar({ searchFunction }) {
    const [value, setValue] = useState("");

    function updateValue(e) {
        console.log(e.target.value);
        if(e.key === 'Enter') {
            console.log("searching!")
            searchFunction(e.target.value);      
        }
    }

    return (
        <input type="text" placeholder="search..." onKeyDown={e => updateValue(e)} />
    );
}
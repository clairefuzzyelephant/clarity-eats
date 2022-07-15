import React, { useState } from "react";
import SearchBar from "./SearchBar.js";
import Select from 'react-select';

import "../styling/menu.css";

export default function Menu({searchFunction, clearSearch}) {
    const [location, setLocation] = useState(null)

    const options = [ //update this
        { value: 'korea', label: 'korea' },
        { value: 'canada', label: 'canada' },
        { value: 'taiwan', label: 'taiwan' },
      ];

    // const customStyles = {
    //     menu: (provided, state) => ({
    //         ...provided,
    //         width: state.selectProps.width,
    //         // borderBottom: '1px dotted pink',
    //         color: state.selectProps.menuColor,
    //         backgroundColor: '#F5F5EE',
    //         padding: 20,
    //     }),
        
    //     control: (_, { selectProps: { width }}) => ({
    //         width: 2 * width
    //     }),
        
    //     singleValue: (provided, state) => {
    //         const opacity = state.isDisabled ? 0.5 : 1;
    //         const transition = 'opacity 300ms';
        
    //         return { ...provided, opacity, transition };
    //     }
    // }
        

    return (
        <div className="menuContainer">
            <div className="menuOptions">
                <div>
                    all posts
                </div>
                <div>
                <Select
                    className="menuLocationSelect"
                    classNamePrefix="menuLocationSelect"
                    placeholder="filter by location"
                    defaultValue={"filter by location"}
                    onChange={setLocation}
                    options={options}
                />
                    
                </div>
            </div>
            <div className="menuSearch">
                <SearchBar searchFunction={searchFunction} clearSearch={clearSearch}/>
            </div>
        </div>
    );
}
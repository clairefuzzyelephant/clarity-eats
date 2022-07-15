import React, { useState } from "react";
import SearchBar from "./SearchBar.js";
import Select, { NonceProvider } from 'react-select';

import "../styling/menu.css";

export default function Menu({searchFunction, clearSearch}) {
    const [location, setLocation] = useState(null)

    const options = [ //update this
        { value: 'korea', label: 'korea' },
        { value: 'canada', label: 'canada' },
        { value: 'taiwan', label: 'taiwan' },
      ];

    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            color: state.selectProps.menuColor,
            backgroundColor: '#F5F5EE',
            padding: 10,
            // paddingTop: 10,
        }),
        control: (provided, state) => ({
            ...provided,
            borderWidth: 0,
            paddingBottom: 0,
            boxShadow: 0,
            marginTop: 0,
            color: '#1B1102',
            backgroundColor: '#F5F5EE',
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: '#1B1102',
            // borderWidth: 0,
            // paddingTop: 0,
            // boxShadow: 0,
            // marginTop: 0,
        }),
        input: (provided, state) => ({
            ...provided,
            margin: 0,
            paddingBottom: 0,
        }),
        valueContainer: (provided, state) => ({
            ...provided, 
            paddingBottom: 3,
        }),
        option: (provided, state) => {
            console.log(state);
            const backgroundColor = state.isSelected ? "#E9DCC2" : 
                state.isFocused ? "#F5F5EE" : state.isActive ? '#F5F5EE' : '#F5F5EE';
            const color = '#1B1102';
            return {...provided, backgroundColor, color};
            // borderBottom: '1px solid pink',
        },
        menuList: (provided, state) => ({
            ...provided, 
            backgroundColor: '#F5F5EE',
        }),

        
        // control: (_, { selectProps: { width }}) => ({
        //     width: 2 * width
        // }),
        
        // singleValue: (provided, state) => {
        //     const opacity = state.isDisabled ? 0.5 : 1;
        //     const transition = 'opacity 300ms';
        
        //     return { ...provided, opacity, transition };
        // }
    }
        

    return (
        <div className="menuContainer">
            <div className="menuOptions">
                <div className="menuAllPosts">
                    all posts
                </div>
                <div>
                <Select
                    styles={customStyles}
                    className="menuLocationSelect"
                    classNamePrefix="menuLocationSelect"
                    // isSearchable={false}
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
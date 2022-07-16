import React, { useState } from "react";
import SearchBar from "./SearchBar.js";
import Select, { NonceProvider } from 'react-select';

import "../styling/menu.css";

export default function Menu({searchFunction, clearSearch}) {
    const [location, setLocation] = useState('all')

    const options = [ //update this
        { value: 'all', label: 'all locations'},
        { value: 'seoul', label: 'seoul' },
        { value: 'vancouver', label: 'vancouver' },
        { value: 'taipei', label: 'taipei' },
      ];

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderWidth: 0,
            boxShadow: 0,
            color: '#1B1102',
            backgroundColor: '#F5F5EE',
            marginTop: 4,
        }),
    }

    const filterByLocation = (loc) => {
        console.log(loc);
        if (loc.value === 'all') {
            setLocation(loc);
            clearSearch();
            return;
        }
        console.log(loc.value);
        setLocation(loc);
        searchFunction(loc.value);
    }
        

    return (
        <div className="menuContainer">
            <div className="menuOptions">
                <div>
                <Select
                    styles={customStyles}
                    className="menuLocationSelect"
                    // classNamePrefix="menuLocationSelect"
                    isSearchable={false}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            text: '#1B1102',
                            primary25: '#E9DCC2',
                            primary75: '#E9DCC2',
                            primary50: '#d6c4a1',
                            primary: '#CCB995',
                        }
                    })}
                    value={location}
                    placeholder="filter by location"
                    defaultValue={"all locations"}
                    onChange={e => filterByLocation(e)}
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
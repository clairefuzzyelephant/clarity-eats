import React, { useState } from "react";
import SearchBar from "./SearchBar.js";
import Select from 'react-select';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoGrid, IoList } from 'react-icons/io5';
import { IconContext } from "react-icons";

import "../styling/menu.css";

export default function Menu({searchFunction, clearSearch, switchView, isGrid, isFiltering}) {
    const [location, setLocation] = useState('all')
    const [searching, setSearching] = useState(false);

    const options = [ //update this
        { value: 'all', label: 'all locations'},
        { value: 'location/sfba', label: 'sf bay area' },
        { value: 'location/korea', label: 'korea' },
        { value: 'location/canada', label: 'canada' },
        { value: 'location/taiwan', label: 'taiwan' },
      ];

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            width: 150,
            borderWidth: 0,
            boxShadow: 0,
            color: '#1B1102',
            backgroundColor: '#F5F5EE',
            marginTop: 4,
            cursor: 'pointer',
        }),
    }

    const filterByLocation = (loc) => {
        if (loc.value === 'all') {
            setLocation(loc);
            clearSearch();
            return;
        }
        setLocation(loc);
        searchFunction(loc.value, loc.label);
    }

    function displaySearch() {
        setSearching(!searching);
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
                        placeholder="location"
                        defaultValue={"all locations"}
                        onChange={e => filterByLocation(e)}
                        options={options}
                    />
                        
                    </div>
            </div>
            <div className="menuSearch">
                {searching ? 
                <SearchBar searchFunction={searchFunction} clearSearch={() => {clearSearch(); displaySearch();}}/>
                : 
                <div className="menuViewOptions">
                <IconContext.Provider value={{ color: isFiltering ? 'lightgrey' : "#ab9a7a", className: isFiltering ? "disabledGridIcon" : "menuSearchIcon" }}>
                    <div 
                    onClick={isFiltering ? null : () => switchView()}
                    onKeyDown={null}
                    >
                        {isGrid ? <IoList /> : <IoGrid />}
                    </div>
                </IconContext.Provider>
                <IconContext.Provider value={{ color: "#ab9a7a", className: "menuSearchIcon" }}>
                    <div 
                    onClick={() => displaySearch()}
                    onKeyDown={null}
                    >
                        <AiOutlineSearch />
                    </div>
                </IconContext.Provider>
                </div>
                }
            </div>
        </div>
    );
}
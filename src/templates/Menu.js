import React from "react";
import SearchBar from "./SearchBar.js";

import "../styling/menu.css";

export default function Menu({searchFunction, clearSearch}) {
    return (
        <div className="menuContainer">
            <SearchBar searchFunction={searchFunction} clearSearch={clearSearch}/>
        </div>
    );
}
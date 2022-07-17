import React from "react";
import Subscribe from "./Subscribe";

import "../styling/footer.css";

export default function Footer() {
    return (
      <div className="footer">
        <div className="webFooter">
            <p>questions? comments? <a target="_blank" href="mailto:clarityeats@gmail.com">email me</a>!</p>
            <p>© clarity eats 2022</p>
        </div>
        <div className="mobileFooter">
            <p>questions? comments? <a target="_blank" href="mailto:clarityeats@gmail.com">email me</a>!</p>
            <Subscribe />
            <p>© clarity eats 2022</p>
        </div>
      </div>
    );
}
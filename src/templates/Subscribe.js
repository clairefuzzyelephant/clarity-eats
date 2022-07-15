import addToMailchimp from 'gatsby-plugin-mailchimp';
import React, { useState } from "react";

import "../styling/subscribe.css";

export default function Subscribe() {

    // const [subscribed, setSubscribed] = useState(false);
    const [subscribeButtonText, setSubscribeButtonText] = useState("subscribe")
    const [email, setEmail] = useState("");

    async function signUpNewsletter(e) {
        e.preventDefault();
        console.log(email);
        let res = await addToMailchimp(email);
        console.log(res);
        if (res.result === "success") {
            setSubscribeButtonText("subscribed!");
            setEmail("");
        } else {
            setSubscribeButtonText("error :(... try again?");
        }
    }
    return (
        <div className="subscribeForm">
            <p>subscribe for email updates!</p>
            {/* <form onSubmit={async e => await signUpNewsletter(e)}> */}
                <input type="text" placeholder="email address" value={email} onChange={e => setEmail(e.target.value)}/>
                <div 
                    className="subscribeButton"
                    onClick={async e => await signUpNewsletter(e)}>
                        {subscribeButtonText}
                    </div> 
            {/* </form> */}
        </div>
    );
}

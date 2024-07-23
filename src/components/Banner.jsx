import React from 'react';
import { Link } from 'react-router-dom';

export default function Banner() {
    return (
        <span className="banner-wrap">
            <Link to="/"><h1 title='App Trove' className='header-name'><img src="/images/icon.png" alt="App Trove" /> <span>APP</span><span>TROVE</span></h1></Link>
        </span>
    )
}

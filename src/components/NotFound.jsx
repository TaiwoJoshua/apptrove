import React from 'react';
import { FaHouse } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <section className='notfound'>
            <div className="board">
                <p className="error">error</p>
                <p className="code">404</p>
                <p className="error">Page not Found</p>
                <Link to="/" className='btn-link'><button><FaHouse /> Home</button></Link>
            </div>
        </section>
    );
}

export default NotFound;
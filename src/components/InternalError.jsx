import React from 'react';
import { FaHouse } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function InternalError() {
    return (
        <section className='notfound internal-error'>
            <div className="board">
                <p className="error">error</p>
                <p className="code">500</p>
                <p className="error">An Internal Error</p>
                <Link to="/" className='btn-link'><button><FaHouse /> Home</button></Link>
            </div>
        </section>
    );
}

export default InternalError;
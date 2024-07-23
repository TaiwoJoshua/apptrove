import React from 'react';
import { FaHouse } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function Error() {
    return (
        <section className='notfound internal-error'>
            <div className="board">
                <p className="error">error</p>
                <p className="code">400</p>
                <p className="error">An Error Occured</p>
                <Link to="/" className='btn-link'><button><FaHouse /> Home</button></Link>
            </div>
        </section>
    );
}

export default Error;
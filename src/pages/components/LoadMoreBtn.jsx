import React from 'react'
import { FaChevronCircleDown } from 'react-icons/fa'
import { FaSpinner } from 'react-icons/fa6';

export default function LoadMoreBtn({ data, setShow, setMore }) {
    const [ready, setReady] = React.useState(true);

    function handleClick(){
        setReady(false);
        setTimeout(() => {
            setShow(oldShow => {
                let add = 5;
                if(data.length - oldShow < 5){
                    add = data.length % 5;
                    setMore(false);
                }else if(data.length - oldShow === 5){
                    setMore(false);
                }
                return oldShow + add;
            });
            setReady(true);
        }, 2000);
    }

    return (
        <button className="load-btn" onClick={handleClick} disabled={!ready}>
            {
                ready
                ?
                <><FaChevronCircleDown /> Load More</>
                :
                <FaSpinner className='spinner' />
            }
        </button>
    )
}

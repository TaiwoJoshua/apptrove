import React from 'react';
import './confirmAction.css';
import { LiaCheckCircle, LiaExclamationTriangleSolid, LiaTimesCircle } from 'react-icons/lia';
import { FaSpinner } from 'react-icons/fa6';
import { nanoid } from 'nanoid';
import { stripSpace } from '../AppManager';

export default function ConfirmDelete({ id, confirmed, title, deleting, close, status, setStatus }) {
    const [something, setSomething] = React.useState("");
    const [rand] = React.useState(() => {return nanoid()});
    const [match, setMatch] = React.useState(false);
    const trimname = stripSpace(id);
    const keyword = trimname.length >= 10 ? trimname.slice(0, 10) : trimname.padEnd("10", rand.slice(0, 10 - trimname.length));

    function handleChange(e){
        const { value } = e.target;
        setSomething(value);
        setMatch(value === keyword ? true : false);
    }

    async function handleSubmit(e){
        e.preventDefault();
        await confirmed();
    }

    return (
        <div className='confirm-action-wrapper'>
            <form className='action-form' onSubmit={handleSubmit}>
                <div className='action-nav'>
                    <h2 className="action-title">Delete { title }</h2>
                    {!deleting && <LiaTimesCircle onClick={close} className='action-close' />}
                </div>
                <div className="action-main">
                    {/* {status.message !== "" && <p className='status-wrapper'><span className={`status-message ${status.type}`}>{status.message}</span><LiaTimesCircle className='status-close' onClick={() => {setStatus({status: "", type: "", message: ""})}}/></p>} */}
                    <p className="action-note" style={{marginTop: "10px"}}>
                        Type <strong>{keyword}</strong> below to confirm delete
                    </p>
                    <i className='action-warning'><strong>Note:</strong> This action is irreversible and cannot be undone.</i>
                    <input type="text" name="whatever" className='action-input' required id="whatever" placeholder={keyword} maxLength={10} minLength={10} value={something} onChange={handleChange} autoComplete={keyword} />
                    <button type="submit" className='action-btn' style={deleting === "done" ? {backgroundColor: "green"} : deleting === "failed" ? {backgroundColor: "red"} : null} disabled={!match || deleting}>{deleting ? deleting === "done" ? <LiaCheckCircle style={{fontSize: "1.2em"}}  /> : deleting === "failed" ? <LiaExclamationTriangleSolid style={{fontSize: "1.2em"}} /> : <FaSpinner className='spinner' style={{fontSize: "1.2em"}} /> : "delete"}</button>
                </div>
            </form>
        </div>
    );
}
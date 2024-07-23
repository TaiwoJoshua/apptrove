import React from 'react';
import './confirmAction.css';
import { LiaCheckCircle, LiaExclamationTriangleSolid, LiaTimesCircle } from 'react-icons/lia';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa6';

function ConfirmAction(props) {
    const [something, setSomething] = React.useState("");
    const [showp, setShowp] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [status, setStatus] = React.useState({status: "", type: "", message: ""});

    function handleChange(e){
        const { value } = e.target;
        setSomething(value);
    }

    async function handleSubmit(e){
        e.preventDefault();
        setLoading("loading");
    }
    // async function handleSubmit(e){
    //     e.preventDefault();
    //     setLoading("loading");
    //     const { position } = await getCurrUser();
    //     if(position === "admin" || position === "teacher"){
    //         userVerification(something)
    //         .then(res => {
    //             if(res === "Confirmed"){
    //                 setStatus({status: "success", type: "success", message: "Action Confirmed. Finishing..."});
    //                 setLoading("done");
    //                 setTimeout(() => {
    //                     props.confirmed();
    //                 }, 2000);
    //             }
    //         })
    //         .catch(data => {
    //             if(data === "Incorrect"){
    //                 setStatus({status: "credential", type: "failed", message: "Incorrect Password"});
    //             }else{
    //                 setStatus({status: "failed", type: "failed", message: "Sign In Failed"});
    //             }
    //             setLoading("failed");
    //         })
    //         .finally(() => {
    //             setTimeout(() => {
    //                 setStatus({status: "", type: "", message: ""});
    //                 props.setClose(true);
    //                 setLoading(false);
    //             }, 2000);
    //         })
    //     }else{
    //         setTimeout(() => {
    //             setStatus({status: "blocked", type: "failed", message: "Missing Permissions"});
    //             setLoading(false);
    //         }, 2000);
    //     }
    // }

    function toggleShow(){
        setShowp(oldShowp => !oldShowp);
    }

    return (
        <div className='confirm-action-wrapper'>
            <form className='action-form' onSubmit={handleSubmit}>
                <div className='action-nav'>
                    <h2 className="action-title">Confirm Action</h2>
                    {!loading && <LiaTimesCircle onClick={() => {props.setClose(true)}} className='action-close'/>}
                </div>
                <div className="action-main">
                    {status.message !== "" && <p className='status-wrapper' id="status-wrapper"><span className={`status-message ${status.type}`}>{status.message}</span><LiaTimesCircle className='status-close' onClick={() => {setStatus({status: "", type: "", message: ""})}}/></p>}
                    <p className="action-note" style={{marginTop: "10px"}}>
                        Type password below to confirm action
                    </p>
                    <i className='action-warning' style={{fontSize: "0.9em"}}><strong>Note:</strong> This action is irreversible and cannot be undone.</i>
                    <div className='password-input'>
                        <input readOnly={loading} type={showp ? "text" : "password"} name="whatever" className='action-input' required id="whatever" placeholder="Password..." maxLength={25} minLength={6} value={something} onChange={handleChange} autoComplete="off" />
                        {!showp && <FaEye onClick={toggleShow} className='password-icon' />}
                        {showp && <FaEyeSlash onClick={toggleShow} className='password-icon' />}
                    </div>
                    <button type="submit" className='action-btn' style={loading === "done" ? {backgroundColor: "green"} : loading === "failed" ? {backgroundColor: "red"} : null} disabled={loading}>{loading ? loading === "done" ? <LiaCheckCircle style={{fontSize: "1.2em"}}  /> : loading === "failed" ? <LiaExclamationTriangleSolid style={{fontSize: "1.2em"}} /> : <FaSpinner className='spinner' style={{fontSize: "1.2em"}} /> : "confirm"}</button>
                </div>
            </form>
        </div>
    );
}

export default ConfirmAction;
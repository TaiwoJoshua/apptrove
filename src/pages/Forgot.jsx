import React from 'react';
import './Login.css';
import { LiaCheckCircle, LiaExclamationTriangleSolid, LiaTimesCircle } from 'react-icons/lia';
import { FaEnvelope, FaSpinner } from 'react-icons/fa6';
import { passwordReset } from '../Auth';

export default function Forgot({ close }) {
    const [formData, setFormData] = React.useState({ email: "" });
    const [loading, setLoading] = React.useState(false);
    const [status, setStatus] = React.useState({status: "", type: "", message: ""});

    function handleChange(e){
        const { name, value } = e.target;
        setFormData(old => ({...old, [name]: value}));
    }

    function success(){
        setStatus({status: "credential", type: "success", message: "Reset Link Sent. Redirecting..."});
        setLoading("done");
        setTimeout(() => {
            close();
        }, 2000);
    }

    function handleSubmit(e){
        e.preventDefault();
        setLoading("loading");
        passwordReset(formData.email)
        .then(data => {
            if(data.message === "Reset Link Sent"){
                success();
            }else if(data.message === "Firebase: Error (auth/user-not-found)."){
                setStatus({status: "credential", type: "failed", message: "E-Mail is not registered"});
                setLoading("failed");
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        })
    }

    return (
        <div className='confirm-action-wrapper'>
            <form className='action-form' onSubmit={handleSubmit}>
                <div className='action-nav'>
                    <h2 className="action-title">Forgot Password</h2>
                    {!loading && <LiaTimesCircle onClick={ close } className='action-close'/>}
                </div>
                <div className="action-main">
                    {status.message !== "" && <p className='status-wrapper' id="status-wrapper"><span className={`status-message ${status.type}`}>{status.message}</span><LiaTimesCircle className='status-close' onClick={() => {setStatus({status: "", type: "", message: ""})}}/></p>}
                    <div className='password-input'>
                        <input readOnly={loading} type={"email"} name="email" className='action-input' required placeholder="E-Mail..." maxLength={50} minLength={10} value={formData.email} onChange={handleChange} autoComplete="off" />
                        <FaEnvelope className='password-icon' />
                    </div>
                    <button type="submit" className='action-btn' disabled={loading} ref={(node) => { node && node.style.setProperty("background", loading === "done" ? "green" : loading === "failed" ? "red" : loading ? "gray" : "black", "important"); }}>
                        {loading ? loading === "done" ? <LiaCheckCircle style={{fontSize: "1.2em"}}  /> : loading === "failed" ? <LiaExclamationTriangleSolid style={{fontSize: "1.2em"}} /> : <FaSpinner className='spinner' style={{fontSize: "1.2em"}} /> : "send"}
                    </button>
                </div>
            </form>
        </div>
    );
}
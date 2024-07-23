import React from 'react';
import './Login.css';
import { LiaCheckCircle, LiaExclamationTriangleSolid, LiaTimesCircle } from 'react-icons/lia';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa6';
import { signInUser } from '../Auth';
import Forgot from './Forgot';

function Login({ close }) {
    const [formData, setFormData] = React.useState({ email: "joshuataiwo07@gmail.com", password: "" });
    const [showp, setShowp] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [status, setStatus] = React.useState({status: "", type: "", message: ""});
    const [closeForgot, setCloseForgot] = React.useState(true);

    function handleChange(e){
        const { name, value } = e.target;
        setFormData(old => ({...old, [name]: value}));
    }

    async function handleSubmit(e){
        e.preventDefault();
        setLoading("loading");
        signInUser(formData.email, formData.password)
        .then(res => {
            if(res.email && res.emailVerified){
                setStatus({status: "success", type: "success", message: "Login Successful. Finishing..."});
                setLoading("done");
                setTimeout(() => {
                    close();
                }, 2000);
            }else if(res.message === "verification"){
                setStatus({status: "verification", type: "failed", message: "E-Mail Verification Pending"});
                setLoading("failed");
            }else if(res.message === "Firebase: Error (auth/user-not-found)." || res.message === "Firebase: Error (auth/wrong-password)." || res.message === "Firebase: Error (auth/invalid-login-credentials)."){
                setStatus({status: "credential", type: "failed", message: "E-Mail / Password Mismatched"});
                setLoading("failed");
            }else if(res.message === "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."){
                setStatus({status: "blocked", type: "failed", message: "Account Temporarily Blocked. Reset Password for immediate access"});
                setLoading("failed");
            }else{
                setStatus({status: "failed", type: "failed", message: "Sign In Failed"});
                setLoading("failed");
            }

            if(!(res.email && res.emailVerified)){
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        })
        .catch((error) => {
            setStatus({status: "failed", type: "failed", message: "Login Failed"});
            setLoading("failed");
        })
    }

    function toggleShow(){
        setShowp(oldShowp => !oldShowp);
    }

    return (
        <div className='confirm-action-wrapper'>
            {!closeForgot && <Forgot close={() => { setCloseForgot(true) }} />}
            <form className='action-form' onSubmit={handleSubmit}>
                <div className='action-nav'>
                    <h2 className="action-title">Login</h2>
                    {!loading && <LiaTimesCircle onClick={ close } className='action-close'/>}
                </div>
                <div className="action-main">
                    {status.message !== "" && <p className='status-wrapper' id="status-wrapper"><span className={`status-message ${status.type}`}>{status.message}</span><LiaTimesCircle className='status-close' onClick={() => {setStatus({status: "", type: "", message: ""})}}/></p>}
                    {/* <div className='password-input'>
                        <input readOnly={loading} type={"email"} name="email" className='action-input' required placeholder="E-Mail..." maxLength={50} minLength={10} value={formData.email} onChange={handleChange} autoComplete="off" />
                        <FaEnvelope className='password-icon' />
                    </div> */}
                    <div className='password-input'>
                        <input readOnly={loading} type={showp ? "text" : "password"} name="password" className='action-input' required placeholder="Password..." maxLength={25} minLength={6} value={formData.password} onChange={handleChange} autoComplete="off" />
                        {!showp && <FaEye onClick={toggleShow} className='password-icon' />}
                        {showp && <FaEyeSlash onClick={toggleShow} className='password-icon' />}
                    </div>
                    <span onClick={() => { setCloseForgot(false) }} className='action-forgot'>Forgot Password?</span>
                    <button type="submit" className='action-btn' disabled={loading} ref={(node) => { node && node.style.setProperty("background", loading === "done" ? "green" : loading === "failed" ? "red" : loading ? "gray" : "black", "important"); }}>
                        {loading ? loading === "done" ? <LiaCheckCircle style={{fontSize: "1.2em"}}  /> : loading === "failed" ? <LiaExclamationTriangleSolid style={{fontSize: "1.2em"}} /> : <FaSpinner className='spinner' style={{fontSize: "1.2em"}} /> : "submit"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
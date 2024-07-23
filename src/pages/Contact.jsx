import React from 'react'
import { FaComment, FaPaperPlane, FaSpinner } from 'react-icons/fa6';
import { LiaTimesCircle } from 'react-icons/lia';
import { useLocation } from 'react-router-dom';
import { contactMail } from '../AppManager';

export default function Contact() {
    const [formData, setFormData] = React.useState({ name: "", email: "", message: "", subject: "" });
    const [status, setStatus] = React.useState({status: "", type: "", message: ""});
    const [loading, setLoading] = React.useState(false);
    const { pathname } = useLocation();
    const feedback = pathname === "/feedback";

    function handleChange(e){
        const { name, value } = e.target;
        setFormData(oldFormData => ({ ...oldFormData, [name]: value }));
    }

    async function handleSubmit(e){
        e.preventDefault();
        try {
            setLoading(true);
            const mail = await contactMail(formData.name, formData.message, formData.email, formData.subject, feedback ? true : false);
            if(mail === "sent"){
                setStatus({status: "success", type: "success", message: `${feedback ? "Feedback" : "Message"} Sent`});
                setFormData({ name: "", email: "", message: "", subject: "" });
            }else{
                setStatus({status: "failed", type: "failed", message: `${feedback ? "Feedback" : "Message"} not Sent`});
            }
            setLoading(false);
        } catch (error) {
            setStatus({status: "failed", type: "failed", message: `${feedback ? "Feedback" : "Message"} not Sent`});
            setLoading(false);
        }
    }

    return (
        <div className='book-request'>
            <h3>{ feedback ? "Give Feedback" : "Contact Us" }</h3>
            <form className='form' onSubmit={ handleSubmit }>
                {status.message !== "" && <p className='status-wrapper' id="status-wrapper"><span className={`status-message ${status.type}`}>{status.message}</span><LiaTimesCircle className='status-close' onClick={() => {setStatus({status: "", type: "", message: ""})}}/></p>}
                <div>
                    <div>
                        <div className="field">
                            <input onChange={ handleChange } readOnly={ loading } type="text" className="form-control" name="name" autoComplete="off" placeholder="Name" maxLength={30} value={ formData.name } />
                            <label>Name</label>
                        </div>
                    </div>
                    <div>
                        <div className="field">
                            <input onChange={ handleChange } readOnly={ loading } type="email" className="form-control" name="email" autoComplete="on" placeholder="E-Mail" required maxLength={50} value={ formData.email } />
                            <label>E-Mail</label>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div className="field">
                            <input onChange={ handleChange } readOnly={ loading } type="text" className="form-control" name="subject" autoComplete="off" placeholder="Subject" maxLength={50} value={ formData.subject } />
                            <label>Subject</label>
                        </div>
                    </div>
                    <div>
                        <div className="field">
                            <textarea onChange={ handleChange } readOnly={ loading } className="form-control" rows={3} name="message" placeholder="Message" required minLength={50} maxLength={250} value={ formData.message } />
                            <label>Message</label>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="btn" disabled={ loading } type="submit">{loading ? <FaSpinner className='spinner' /> : <>{feedback ? <FaComment /> : <FaPaperPlane />} Submit</> }</button>
                </div>
            </form>
        </div>
    )
}

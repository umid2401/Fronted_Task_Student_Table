import React, {useState} from 'react';
import {RiNotificationLine} from "react-icons/ri";
import '../../style/navbar.scss'
function StudentNavbar(props) {

    const [toggle, setTogle] = useState(false)
    const switch_toggle = () =>{
        setTogle(!toggle)
    }
    return (
        <div className="navbarr">
            <div className="navbarr__left">
                <a className="navbarr__left__title">Zako iT academy</a>
            </div>
            <div className="navbarr__right">
                <div className="navbarr__right__left">
                    <input className="navbarr__input" type="text"/>
                </div>
                <div className="navbarr__right__right">
                    <div className="open_for_desktop" style={{marginRight:'20px'}}>
                        <p>Open for Desktop</p>
                    </div>
                    <div style={{marginRight:'23px'}}>
                        <label className="switch" >
                            <input  type={toggle ? "checkbox": ''} checked onClick={()=>{switch_toggle()}}/>
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <a href="#" className="notification">
                        <div className="notification-badge"></div>
                        <RiNotificationLine />
                    </a>
                    <a href="#" className="user-photo">
                        <img src={process.env.PUBLIC_URL + "/weatherforec.jpg"} alt=""/>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default StudentNavbar;
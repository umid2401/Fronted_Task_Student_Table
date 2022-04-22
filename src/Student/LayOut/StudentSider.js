import React from 'react';
import {RiDashboardFill, RiTableLine} from "react-icons/ri";
import {IoMdDocument} from "react-icons/io";
import {MdPayment} from "react-icons/md";
import '../../style/sider.scss'
function StudentSider(props) {

    return (
        <div className="sider">
            <div className="sider__menu">
                <div className="sider__menu__item">
                    <RiDashboardFill />
                    <h3>Dashboard</h3>
                </div>
            </div>
            <div className="sider__menu">
                <div className="sider__menu__item">
                    <IoMdDocument />
                    <h3>Mening Kurslarim</h3>
                </div>
            </div>
            <div className="sider__menu">
                <div className="sider__menu__item">
                    <RiTableLine />
                    <h3>Dars jadvali</h3>
                </div>
            </div>
            <div className="sider__menu">
                <div className="sider__menu__item">
                    <MdPayment />
                    <h3>To'lovlar</h3>
                </div>
            </div>
        </div>
    );
}

export default StudentSider;
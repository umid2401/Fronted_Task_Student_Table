import React from 'react';
import {Card, CardBody, Collapse} from "reactstrap";
import {Link} from "react-router-dom";
import '../../style/sider.scss'
import {RiDashboardFill, RiTableLine, RiGroupFill,RiSettings4Line} from "react-icons/ri";
import {MdGroups} from 'react-icons/md'
function StudentSettingsLayout(props) {
    return (

            <div className="sider-for-lesson">

                <div className="sider">
                    <Link to='/student-settings'>
                        <div className="sider__menu" >
                            <div className="sider__menu__item">
                                <MdGroups style={{fontSize:'23'}} />
                                <h3>Guruhlarim</h3>
                            </div>
                        </div>
                    </Link>

                </div>

            </div>

    );
}

export default StudentSettingsLayout;
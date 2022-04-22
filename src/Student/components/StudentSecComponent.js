import React, {useState} from 'react';
import Layout from "../../components/layout/Layout";
import '../../style/studentsec.scss'
import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import TabSec1 from "./studentTab/TabSec1";
import TabSec2 from "./studentTab/TabSec2";
import TabSec3 from "./studentTab/TabSec3";
import TabSec4 from "./studentTab/TabSec4";
function StudentSecComponent(props) {




    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    const [isChecked, setIsChecked] = useState(false);
    const [activeTab, setActiveTab] = useState('1');
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    return (
        <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({active: activeTab === '1'})}
                            onClick={() => {
                                toggle('1');
                            }}
                        >
                            <div className="circle_item">
                                Savol- Javob
                            </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: activeTab === '2'})}
                            onClick={() => {
                                toggle('2');
                            }}
                        >
                            <div className="circle_item">
                                Darsdagi mavzudan namunalar
                            </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: activeTab === '3'})}
                            onClick={() => {
                                toggle('3');
                            }}
                        >
                            <div className="circle_item">
                                Qo’llanmalar
                            </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: activeTab === '4'})}
                            onClick={() => {
                                toggle('4');
                            }}
                        >
                            <div className="circle_item">
                                O'qituvchi yuklagan vazilfalar
                            </div>
                        </NavLink>
                    </NavItem>

                </Nav>
                <div className="tab-body_student">
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <TabSec1/>
                        </TabPane>
                        <TabPane tabId="2">
                            <TabSec2/>
                        </TabPane>
                        <TabPane tabId="3">
                            <TabSec3/>
                        </TabPane>
                        <TabPane tabId="4">
                            <TabSec4/>
                        </TabPane>
                    </TabContent>
                </div>
        </div>
    );
}

export default StudentSecComponent;
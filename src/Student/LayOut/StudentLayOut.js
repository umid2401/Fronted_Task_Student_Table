import React from 'react';
import StudentNavbar from "./StudentNavbar";
import StudentContent from "./StudentContent";
function StudentLayOut(props) {
    console.log(props.children)
    return (
        <div>
            <StudentNavbar />
            <div className="d-flex" style={{width:'100%'}}>
                {props.sider}
                <StudentContent>
                    {
                        props.children
                    }
                </StudentContent>
            </div>
        </div>
    );
}

export default StudentLayOut;
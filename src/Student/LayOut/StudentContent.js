import React from 'react';
import '../../style/content.scss'
function StudentContent(props) {
    return (
        <div className="content">
            {props.children}
        </div>
    );
}

export default StudentContent;
import React from 'react';
import ReactPlayer from "react-player";


function VideoPlayerr(props) {
    const video_player_styles = {
        borderRadius:'50px'
    }
    const url = `${props.children}`
    return (
        <div>
            <div className='d-flex justify-content-center'>
                <div className='lesson-video-player'>
                    <div className='lesson-video-player-div'>
                        <ReactPlayer
                            controls={true}
                            url={url}
                            width={'100%'}
                            height={'70vh'}
                            style={video_player_styles}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoPlayerr;
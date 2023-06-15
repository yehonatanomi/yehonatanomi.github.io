
function ActiveContact({name, img, chatID}) {
    if (!chatID) {
        return (
            <>
                <div className="row-aaa top">
                    <img className="upImg" src="blank.png" alt=""/>
                    <p id="active_contact" style={{ display: 'none' }}>.</p>
                </div>
            </>
        );
    }
    else {
        return (
            <>
                <div className="row-aaa top">
                    <img className="upImg" src={img} alt=""/>
                    <p id="active_contact">{name}</p>
                    <i id="phone_call" className="bi bi-telephone" />
                    <i id="video_call" className="bi bi-camera-video" />
                </div>
            </>
        );
    }
};

export default ActiveContact;
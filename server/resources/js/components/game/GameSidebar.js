import React, { useEffect, useState } from 'react';

const GameSidebar = ({sidebarData, ...props}) => {

    const [show, setShow] = useState(false);
    useEffect(() => {
        if (Object.keys(sidebarData).length > 0) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [sidebarData]);
    return (
        <div>
            <div className={`offcanvas offcanvas-sm offcanvas-start ${show ? "show" : ""}`} data-bs-backdrop="false" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasLabel"><b>{sidebarData.title}</b></h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => setShow(false)}></button>
                </div>
                <div className="offcanvas-body">
                    Content for the offcanvas goes here. You can place just about any Bootstrap component or custom elements here.
                </div>
            </div>
        </div>
    );
};

export default GameSidebar;
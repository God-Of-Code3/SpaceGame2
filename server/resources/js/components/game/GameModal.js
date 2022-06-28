import React, { useEffect, useState } from 'react';
import UIConstructor from '../ui/UIConstructor';

const GameModal = ({getModalApi, ...props}) => {

    const [show, setShow] = useState(true);

    useEffect(() => {

    }, [getModalApi]);

    return (
        <div class="modal d-block" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content bg-dark text-light">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <UIConstructor ttl={"Рабочая панель"} elements={[]} api={`api/game/get_dashboard`}></UIConstructor>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameModal;
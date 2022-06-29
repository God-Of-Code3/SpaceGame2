import React, { useEffect, useState } from 'react';
import UIConstructor from '../ui/UIConstructor';
import { useContext } from 'react';
import { dataManagerContext } from './GameUi';

const GameModal = ({modalApi, ...props}) => {

    const [show, setShow] = useState(true);

    useEffect(() => {
        if (modalApi) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [modalApi]);

    const dataManager = useContext(dataManagerContext);

    return (
        <div class={`modal ${show ? 'd-block' : ''}`} tabindex="-1">
            <div class="modal-dialog modal-lg my-5">
                <div class="modal-content bg-dark text-light">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <i class="bi bi-x-lg" onClick={() => dataManager.setModalApi("")}></i>
                    </div>
                    <div class="modal-body">
                        <UIConstructor ttl={"Рабочая панель"} elements={[]} api={modalApi}></UIConstructor>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameModal;
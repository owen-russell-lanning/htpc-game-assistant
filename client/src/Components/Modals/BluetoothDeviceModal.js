import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

/**
 * a modal used to provide actions regarding a paired bluetooth device
 * @param show if true, the modal will be shown
 * @param onHide a function to make the modal hide
 */
export default function BluetoothDeviceModal({ show, onHide, device }) {


    /** describes the current action of the modal. if not null, a loading spinner will be shown */
    const [currentAction, setCurrentAction] = useState(null);

    /** removes the device from the server's bluetooth */
    const onRemoveDevice = async () => {
        setCurrentAction("Removing Device");
        await device.remove();
        setCurrentAction(null);
        onHide();
    }


    useEffect(() => {
        if (show) {
            /** reset the modal */
            setCurrentAction(null);
        }
    }, [show]);

    const actionButtons = [
        <Button onClick={onRemoveDevice} className="w-100" variant="outline-danger">Remove Device</Button>
    ]

    const modalContent = device == null ? [] : [
        <Modal.Header closeButton>
            <Modal.Title>{device.Name}</Modal.Title>
        </Modal.Header>,
        <Modal.Body>
            {currentAction ?
                <div className="d-flex flex-column align-items-center gap-1">
                    <Spinner size="lg" variant="primary"></Spinner>
                    <span>{currentAction}</span>
                </div> :
                actionButtons
            }
        </Modal.Body>
    ]


    return (
        <Modal show={show} onHide={onHide} centered>
            {modalContent}
        </Modal>
    )
}
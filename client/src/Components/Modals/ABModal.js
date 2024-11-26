import { Button, Modal } from "react-bootstrap";

/**
 * a modal to choose between two options
 */
export default function ABModal({optionA, optionB, show, onHide, onSubmit, text, buttonBVariant}){


    const submit = (option) =>{
        onHide();
        onSubmit(option)
    }

    return(
        <Modal show={show} onHide={onHide} centered>
            <Modal.Body>
                <h4 className="mb-4">{text}</h4>
                <div className="d-flex flex-column align-items-center w-100 gap-3">
                    <Button onClick={() =>{submit(optionA)}} size="lg" className="w-100">{optionA}</Button>
                    <Button onClick={() =>{submit(optionB)}} variant={buttonBVariant} size="lg" className="w-100">{optionB}</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}
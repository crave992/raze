import style
    from './alertModal.module.scss';
import {Modal} from "react-bootstrap";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";

export default function AlertPopupModal(props) {

    const modalContent = props.content;

    return (
        <Modal
            {...props}
            size="l"
            centered>
            <>
                <Modal.Body>
                    <div className={style.alertPopupModal}>
                        <h3 className={style.title}>{modalContent.title}</h3>
                        <ButtonSecondary title={modalContent.btn} onClick={() => props.alertAction()}/>
                    </div>
                </Modal.Body>
            </>
        </Modal>
    )
}

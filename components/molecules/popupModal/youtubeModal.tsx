import {Modal} from "react-bootstrap";
import style from './youtubeModal.module.scss'

export default function YoutubeModal(props) {

    const modalContent = props.content;
    return (
        <Modal
            {...props}
            size="xl"
            centered>
            <>
                <Modal.Body>
                    <div className={style.youtubeModal}>
                        <iframe
                            src={`https://www.youtube.com/embed/${modalContent}?autoplay=1`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </Modal.Body>
            </>
        </Modal>
    )
}

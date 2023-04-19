import style from './clientSpeak.module.scss';
import {useTranslation} from "next-i18next";
import ButtonSecondary from "@atoms/buttons/ButtonSecondary";
import {useState} from "react";
import YoutubeModal from "@molecules/popupModal/youtubeModal";
import {YouTubeGetID} from "@util/helper";
import Slider from "react-slick";

type Props = {
    section: {
        field_title: string,
        field_speaks: Array<string>
    }
}

export default function ClientSpeak(props:Props) {
    const content = props.section;
    const {t} = useTranslation('common');
    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const handleShow = (val) => {
        setModalContent(val);
        setShow(true);
    };

    const settings = {
        dots: false,
        arrows: false,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        swipe: true,
        swipeToSlide: true,
        focusOnSelect: true
    }

    return (
        <section className={style.clientSpeak}>
            <div className={`section__inner`}>
                <h2 className={`section__title_2`}>{content.field_title}</h2>
                {content.field_speaks.length &&
                <div className={style.speaks}>
                    <Slider {...settings}>
                    {content.field_speaks.map((speak, i) => {
                        let youtubeID = YouTubeGetID(speak['field_video']);
                        if(youtubeID) {
                            return (
                                <div className={style.speak} key={i}>
                                    <div onClick={() => handleShow(youtubeID)} className={style.thumbnail}>
                                        <img src={`https://img.youtube.com/vi/${youtubeID}/hqdefault.jpg`}/>
                                    </div>
                                    <div className={style.content}>
                                    <div className={style.quote} dangerouslySetInnerHTML={{__html: speak['field_description']}}></div>
                                    <div className={style.name} dangerouslySetInnerHTML={{__html: speak['field_name']}}></div>
                                    <ButtonSecondary title={t('button.view.case')} href={speak['field_showcase'][0]['path']}/>
                                    </div>
                                </div>
                            )
                        }
                    })}
                    </Slider>
                </div>
                }
                <YoutubeModal show={show} content={modalContent} onHide={()=> setShow(false)}/>
            </div>
        </section>
    )
}

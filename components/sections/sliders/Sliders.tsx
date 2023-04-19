import style
    from './slider.module.scss';
import classnames
    from "classnames";
import Slider
    from "react-slick";
import {
    useState,
} from "react";


type Props = {
    section: {
        field_title: string,
        field_slides: Array<object>
    }
}

export default function Sliders(props: Props) {
    let content = props['section'];
    const [sliderLeft, setSliderLeft] = useState(null);
    const [sliderRight, setSliderRight] = useState(null);

    const leftSettings = {
        dots: false,
        infinite: false,
        fade: true,
        arrows: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    const rightSettings = {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 600,
        slidesToShow: 1.1,
        slidesToScroll: 1,
        swipe: false,
        swipeToSlide: false,
        focusOnSelect: false
    }
    return (
        <section className={style.slider}>
            <div className={`section__inner`}>
                <h2 className={classnames(`section__title_2`, `white`)}>{content['field_title']}</h2>
                {Object.keys(content['field_slides']).length &&
                <div className={style.slides}>
                    <div className={style.left}>
                        <Slider asNavFor={sliderRight} ref={(slider) => setSliderLeft(slider)} {...leftSettings} >
                            {content['field_slides'].map((slide, i) => {
                                return (
                                    <div className={style.slide}>
                                        <div className={style.wrapper}>
                                        <h3 className={classnames(`section__headline`, `white`)}>{slide['field_headline']}</h3>
                                        <h4 className={style.title}>{slide['field_title']}</h4>
                                        <div className={style.text} dangerouslySetInnerHTML={{__html: slide['field_description']}}></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                    <div className={style.right}>
                        <Slider asNavFor={sliderLeft} ref={(slider) => setSliderRight(slider)} {...rightSettings}>
                            {content['field_slides'].map((slide, i) => {
                                return (
                                    <div className={style.image} key={i}>
                                        <img alt={slide['field_media_image'][0]['alt']} src={slide['field_media_image'][0]['url']}/>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
                }
            </div>
        </section>
    )
}

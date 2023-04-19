import style
    from './gallery.module.scss';
import {useState} from "react";
import Slider
    from "react-slick";
import classnames
    from "classnames";

type Props = {
    section: {
        field_background: string,
        field_title: string,
        field_gallery_items: Array<Object>
    }
}

export default function Gallery(props: Props) {
    const content = props.section;
    const [sliderContent, setSliderContent] = useState(null);
    const [sliderCurrent, setSliderCurrent] = useState(null);
    const [sliderNav, setSliderNav] = useState(null);

    const contentSettings = {
        dots: false,
        infinite: false,
        fade: true,
        arrows: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    const currentSettings = {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: false,
        swipeToSlide: false,
        focusOnSelect: false
    }

    const navSettings = {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 600,
        slidesToShow: 5,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: false,
        swipeToSlide: false,
        focusOnSelect: false
    }

    return (
        <section className={classnames(style.gallery, style[content.field_background])}>
            <div className={`section__inner`}>
                <h2 className={`section__title_2`}>{content.field_title}</h2>
                {content.field_gallery_items.length &&
                <div className={style.galleryWrapper}>
                    <div className={style.left}>
                        <div className={style.galleryContent}>
                            <Slider asNavFor={sliderNav} ref={(slider) => setSliderContent(slider)} {...contentSettings} >
                                {content.field_gallery_items.map((item, i) => (
                                    <div className={style.content} key={`content-${i}`}>
                                        <div className={style.index}>{(i + 1)} / {content.field_gallery_items.length}</div>
                                        {item['field_headline'] &&
                                        <div className={`section__headline`}>{item['field_headline']}</div>
                                        }
                                        <h3 className={`section__title`}>{item['field_title']}</h3>
                                        {item['field_description'] &&
                                        <div className={style.description} dangerouslySetInnerHTML={{__html: item['field_description']}}></div>
                                        }
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                    <div className={style.right}>
                        <div className={style.galleryCurrently}>
                            <Slider asNavFor={sliderContent} ref={(slider) => setSliderCurrent(slider)} {...currentSettings} >
                                {content.field_gallery_items.map((item, i) => (
                                    <div  key={`currently-${i}`}>
                                        <img src={item['field_media_image'][0]['url']} alt={item['field_media_image'][0]['alt']}/>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <div className={style.galleryNav}>
                            <Slider asNavFor={sliderCurrent} ref={(slider) => setSliderNav(slider)} {...navSettings} >
                            {content.field_gallery_items.map((item, i) => (
                                <div key={`nav-${i}`}>
                                    <img src={item['field_media_image'][0]['url']} alt={item['field_media_image'][0]['alt']}/>
                                </div>
                            ))}
                            </Slider>
                        </div>
                    </div>
                </div>
                }
            </div>
        </section>
    )
}

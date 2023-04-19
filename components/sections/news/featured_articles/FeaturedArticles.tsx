import style
    from "./featured-articles.module.scss";
import Image
    from "next/image";
import Link
    from "next/link";
import {useState} from "react";
import Slider
    from "react-slick";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";
import {useTranslation} from "next-i18next";

type Article = {
    title: string
    field_media_image: Array<string>,
    path: string
    field_category: Array<object>,
    body: Array<string>,
    created: string
}

type Props = {
    section: {
        field_articles: Array<Article>
    }
}

export default function FeaturedArticles(props: Props) {
    const {t} = useTranslation('common');
    const [sliderMain, setSliderMain] = useState(null);
    const [sliderBg, setSliderBg] = useState(null);

    const mainSettings = {
        dots: true,
        infinite: true,
        fade: true,
        arrows: false,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        // adaptiveHeight: true
    }

    const bgSettings = {
        dots: false,
        infinite: true,
        fade: true,
        arrows: false,
        speed: 6800,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: false,
        swipeToSlide: false,
        focusOnSelect: false
    }

    return (
        <section className={style.featuredArticles}>
            <div className={style.articles}>
                <div className={`section__inner`}>
                <Slider asNavFor={sliderBg} ref={(slider) => setSliderMain(slider)} {...mainSettings} >
                {props.section.field_articles && props.section.field_articles.map((article, i) => (
                        <div className={style.article} key={i}>

                                <div className={style.category} dangerouslySetInnerHTML={{__html: article.field_category[0]['name']}}></div>
                                <div className={style.title} dangerouslySetInnerHTML={{__html: article.title}}></div>
                                <div className={style.summary} dangerouslySetInnerHTML={{__html: article.body[0]['summary']}}></div>
                                <ButtonSecondary title={t('button.readMore')} href={article.path} color={`white`}/>

                        </div>
                ))}
                </Slider>
                </div>
            </div>
            <div className={style.articleBgs}>
                <Slider asNavFor={sliderMain} ref={(slider) => setSliderBg(slider)} {...bgSettings} >
                {props.section.field_articles && props.section.field_articles.map((article, i) => (
                    <div className={style.articleBg} key={i}>
                        <Image src={article.field_media_image[0]['url']} alt={article.field_media_image[0]['alt']} layout={`fill`} objectFit={`cover`} objectPosition={`center`}/>
                    </div>
                ))}
                </Slider>
            </div>
        </section>
    )

}

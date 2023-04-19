import style
    from "./our-vision.module.scss"
import classnames
    from "classnames";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";
import Slider from "react-slick";

type Props = {
    section: {
        field_headline: string,
        field_title: string,
        field_link: Array<string>,
        field_media_images: Array<string>,
    }
}

export default function OurVision(props: Props) {
    let content = props['section'];
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true
    }
    return (
        <section className={style.ourVision}>
            <div className={`section__inner`}>
                <div className={style.ourVisionContent}>
                    {content.field_headline &&
                    <h3 className={classnames(`section__headline`,`blue`)}>{content.field_headline}</h3>
                    }
                    {content.field_title &&
                    <h2 className={classnames(`section__title`)}>{content.field_title}</h2>
                    }
                    {Object.keys(content.field_link).length &&
                        <div className={style.link}>
                    <ButtonSecondary title={content.field_link[0]['title']} href={content.field_link[0]['url']} color={`blue`}/>
                        </div>
                    }
                </div>
                {Object.keys(content.field_media_images).length &&
                <div className={style.ourVisionImages}>
                    <Slider {...settings}>
                    {content.field_media_images.map((image, i) => {
                        return (
                            <div className={style.image} key={i}>
                                <img alt={image['alt']} src={image['url']}/>
                            </div>
                        )
                    })}
                    </Slider>
                </div>
                }
            </div>
        </section>
    )
}

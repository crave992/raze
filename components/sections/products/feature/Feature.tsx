import style
    from "./feature.module.scss";
import {Image} from "react-bootstrap";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";

type Props = {
    section: {
        field_title: string,
        field_features: Array<object>,
        field_subtitle: string,
        field_description: string,
        field_link: Array<string>,
    }
}

export default function Feature(props: Props) {
    let content = props['section'];
    return (
        <section className={style.productFeature}>
            <div className={`section__inner`}>
                <div className={style.wrapper}>
                <div className={style.featureContent}>
                    <h2 className={style.title} dangerouslySetInnerHTML={{__html: content.field_title}}></h2>
                    {content.field_features.length &&
                    <div className={style.features}>
                        {content.field_features.map((feature, i) => (
                            <div className={style.feature} key={i}>
                                {Object.keys(feature['field_media_image']) &&
                                <div className={style.featureImage}>
                                    <Image width={60} height={60} src={feature['field_media_image'][0]['url']}/>
                                </div>
                                }
                                <div className={style.featureTitle} dangerouslySetInnerHTML={{__html: feature['field_title']}}></div>
                            </div>
                        ))}
                    </div>
                    }
                </div>
                {content.field_subtitle &&
                <div className={style.subContent}>
                    <h2 className={style.title} dangerouslySetInnerHTML={{__html: content.field_subtitle}}></h2>
                    {content.field_description &&
                    <div className={style.description} dangerouslySetInnerHTML={{__html: content.field_description}}></div>
                    }
                    {Object.keys(content.field_link) &&
                    <div className={style.link}>
                    <ButtonSecondary title={content.field_link[0]['title']} href={content.field_link[0]['url']}/>
                        </div>
                    }
                </div>
                }
                </div>
            </div>
        </section>
    )
}

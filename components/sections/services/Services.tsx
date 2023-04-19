import style from './services.module.scss';
import classnames
    from "classnames";
import Image
    from "next/image";
import Link from "next/link";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";

type Props = {
    section: {
        field_headline: string,
        field_title: string,
        field_description: string,
        field_link: Array<string>,
        field_services: Array<string>,
    }
}

export default function Services(props: Props) {
    let content = props['section'];
    return (
        <section className={style.services}>
            <div className={`section__inner`}>
                <div className={style.intro}>
                {content.field_headline &&
                <h3 className={classnames(`section__headline`,`red`)}>{content.field_headline}</h3>
                }
                {content.field_title &&
                <h2 className={classnames(`section__title`, `red`)}>{content.field_title}</h2>
                }
                {content.field_description &&
                <div className={style.description} dangerouslySetInnerHTML={{__html:content.field_description}}></div>
                }
                </div>
                {Object.keys(content.field_services).length &&
                    <div className={style.servicesContent}>
                        {content.field_services.map((service, i) => (
                            <div className={style.service} key={i}>
                                {service['field_media_image'] &&
                                    <div className={style.serviceImage}>
                                <Image src={service['field_media_image'][0]['url']} alt={service['field_media_image'][0]['alt']} layout={`fill`} objectFit={`cover`}/>
                                    </div>
                                || null}
                                <div className={style.serviceTitle}>{service['field_title']}</div>
                                <div className={style.serviceDescription} dangerouslySetInnerHTML={{__html: service['field_description']}}></div>
                            </div>
                        ))}
                    </div>
                || null}
                {Object.keys(content.field_link).length &&
                    <div className={style.link}>
                        <ButtonSecondary href={content.field_link[0]['url']} title={content.field_link[0]['title']} color={`red`}/>
                    </div>
                || null}
            </div>
        </section>
    )
}

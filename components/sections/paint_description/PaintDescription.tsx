import style
    from './paintDescription.module.scss';
import classnames
    from "classnames";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";

type Props = {
    section: {
        field_title: string,
        field_paints: Array<any>
    }
}

export default function PaintDescription(props: Props) {
    const content = props.section;
    return (
        <section className={style.paintDescription}>
            <div className={`section__inner`}>
                <h2 className={classnames(`section__title_2`, `deep-blue`)}>{content.field_title}</h2>
                {content.field_paints.length &&
                <div className={style.paints}>
                    {content.field_paints.map((paint, i) => (
                        <div className={style.paint} key={i}>
                            <div className={style.content}>
                            <h4 className={classnames(`section__headline`, `blue`)}>{paint.field_headline}</h4>
                            <h3 className={style.title}>{paint.field_title}</h3>
                            <div className={`section__description`} dangerouslySetInnerHTML={{__html: paint.field_description}}></div>
                            {paint.field_features.length &&
                            <div className={style.features}>
                                {paint.field_features.map((feature, i) => (
                                    <div className={style.feature} key={i}>
                                        <img src={feature.field_media_image[0]['url']} alt={feature.field_media_image[0]['alt']}/>
                                        <div className={style.text} dangerouslySetInnerHTML={{__html:feature.field_title}}/>
                                    </div>
                                ))}
                            </div>
                            }
                            {paint.field_link.length &&
                                <ButtonSecondary title={paint.field_link[0]['title']} href={paint.field_link[0]['url']}/>
                            || null }
                            </div>
                            <div className={style.image}>
                                {paint.field_media_image.length &&
                                <img src={paint.field_media_image[0]['url']} alt={paint.field_media_image[0]['alt']}/>
                                || null }
                            </div>
                        </div>
                    ))}
                </div>
                }
            </div>
        </section>
    )
}

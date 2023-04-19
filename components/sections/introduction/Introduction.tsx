import style from './introduction.module.scss';
import classnames
    from "classnames";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";
import Item
    from "@molecules/item/Item";

type Props = {
    section: {
        field_headline: string,
        field_description: string,
        field_column: string,
        field_items: Array<string>,
        field_link: Array<object>,
        field_media_images: Array<object>
    }
}

export default function Introduction(props:Props) {
    const content = props.section;
    return (
        <section className={style.introduction}>
            <div className={`section__inner`}>
                {content.field_headline &&
                <h2 className={`section__headline`}>{content.field_headline}</h2>
                }
                {content.field_description &&
                <div className={classnames(`section__description`, `large`)} dangerouslySetInnerHTML={{__html:content.field_description}}></div>
                }
                {content.field_items.length &&
                <div className={style.items}>
                    {content.field_items.map((item, i) => (
                        <Item key={i} icon={item['field_media_image']} title={item['field_title']} description={item['field_description']} column={`col-${content.field_column}`}/>
                    ))}
                </div>
                }
                {content.field_media_images.length &&
                    <div className={style.logos}>
                        {content.field_media_images.map((logo, i) => (
                            <div className={style.logo}>
                                <img src={logo['url']} alt={logo['alt']}/>
                            </div>
                        ))}
                    </div>
                }
                {content.field_link.length &&
                <div className={style.link}>
                    <ButtonSecondary title={content.field_link[0]['title']} href={content.field_link[0]['url']}/>
                </div>
                || null }
            </div>
        </section>
    )
}

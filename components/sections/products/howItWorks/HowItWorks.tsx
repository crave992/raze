import style
    from './howItWorks.module.scss';
import Image
    from "next/image";
import classnames
    from "classnames";

type Props = {
    section: {
        field_title: string,
        field_items: Array<Object>
    }
}

export default function HowItWorks(props: Props) {
    const content = props.section;
    const isNoTittle = ( content.field_title.length ) ? false : true;
    console.log(isNoTittle)
    return (
        <section className={classnames(style.howItWorks, (isNoTittle) ? style.noTitle : '')}>
            {content.field_title.length &&
            <h2 className={`section__title_2`}>{content.field_title}</h2>
            || null }
            <div>
                <div className={style.wrapper}>
                    {content.field_items.length &&
                    <div className={style.items}>
                        {content.field_items.map((item, i) => (
                            <div className={style.item} key={i}>
                                <div className={style.content}>
                                    {item['field_headline'] &&
                                        <h4 className={classnames(`section__headline`,`orange`)}>{item['field_headline']}</h4>
                                    }
                                    <h3 className={style.title}>{item['field_title']}</h3>
                                    <div className={style.description} dangerouslySetInnerHTML={{__html:item['field_description']}}></div>
                                </div>
                                <div className={style.image}>
                                    {Object.keys(item['field_media_image']).length &&
                                    <Image
                                        width={2400}
                                        height={1400}
                                        alt={item['field_media_image'][0]['alt']}
                                        src={item['field_media_image'][0]['url']}/>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                    }
                </div>
            </div>
        </section>
    )
}

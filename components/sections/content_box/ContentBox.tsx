import style from './contentBox.module.scss';
import Image
    from "next/image";
import Link
    from "next/link";

type Props = {
    section: {
        field_title: string,
        field_items: Array<any>
    }
}

export default function ContentBox(props:Props) {
    const content = props.section;
    return (
        <section className={style.contentBox}>
            <div className={`section__inner`}>
                <h2 className={`section__title_2`}>{content.field_title}</h2>
                {content.field_items.length &&
                    <div className={style.items}>
                        {content.field_items.map((item, i) => (
                            <div className={style.item} key={i}>
                                <div className={style.mediaWrapper}>
                                    <Image
                                        src={item['field_media_image'][0]['url']}
                                        alt={item['field_media_image'][0]['alt']}
                                        layout="fill"
                                        objectFit="cover"
                                        objectPosition="center"
                                    />
                                </div>
                                <Link href={item['field_link'][0]['url']}>
                                    <div className={style.linkWrapper}>
                                        <div className={style.linkContainer}>
                                            <div className={style.linkTitle}>{item['field_link'][0]['title']}</div>
                                            {item['field_description'] &&
                                            <div className={style.linkDescription} dangerouslySetInnerHTML={{__html:item['field_description']}}></div>
                                            }
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </section>
    )
}

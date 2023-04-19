import style from './explore.module.scss';
import Image
    from "next/image";
import Link
    from "next/link";

type Props = {
    section: {
        field_title: string,
        field_explore_more: Array<object>
    }
}

export default function Explore(props: Props) {
    let content = props['section'];
    console.log(content);
    return (
        <section className={style.exploreMore}>
            <div className={`section__inner`}>
                <div className={`section__title_2`} dangerouslySetInnerHTML={{__html:content['field_title']}}></div>
                {Object.keys(content['field_explore_more']).length &&
                <div className={style.content}>
                    {content['field_explore_more'].map((data, i) => (
                        <div className={style.data} key={i}>
                            <div className={style.mediaWrapper}>
                                <Image
                                    src={data['field_media_image'][0]['url']}
                                    alt={data['field_media_image'][0]['alt']}
                                    layout="fill"
                                    objectFit="cover"
                                    objectPosition="center"
                                />
                            </div>
                            <Link href={data['field_link'][0]['url']}>
                                <div className={style.linkWrapper}>
                                    <div className={style.linkContainer}>
                                    <div className={style.linkTitle}>{data['field_link'][0]['title']}</div>
                                    {data['field_description'] &&
                                    <div className={style.linkDescription} dangerouslySetInnerHTML={{__html:data['field_description']}}></div>
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

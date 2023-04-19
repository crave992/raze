import style from './feature-lists.module.scss';
import Image
    from "next/image";

type Props = {
    section: {
        field_title: string,
        field_feature_lists: Array<object>
    }
}

export default function FeatureLists(props:Props) {
    let content = props['section'];
    return (
        <section className={style.featureLists}>
            <div className={`section__inner`}>
                <h2 className={style.title}>{content['field_title']}</h2>
                {content['field_feature_lists'].length &&
                    <div className={style.items}>
                        {content['field_feature_lists'].map((item, i) => (
                            <div className={style.item} key={i}>
                                <div className={style.image}>
                                    <Image
                                        src={item['field_media_image'][0]['url']}
                                        alt={item['field_media_image'][0]['alt']}
                                        width={60}
                                        height={60}
                                    />
                                </div>
                                <div className={style.name}>{item['field_title']}</div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </section>
    )
}

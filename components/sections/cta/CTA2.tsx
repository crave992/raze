import style
    from './cta.module.scss';
import classnames
    from "classnames";
import Image
    from "next/image";

type Props = {
    section: {
        field_title: string,
        field_description: string,
        field_media_image: Array<object>
    }
}

export default function CTA(props: Props) {
    let content = props['section'];
    return (
        <section className={style.cta2}>
            <div className={`rotateCircle`}></div>
            <div className={style.background}>
                <Image
                    src={content['field_media_image'][0]['url']}
                    alt={content['field_media_image'][0]['alt']}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                />
            </div>
            <section className={`section__inner`}>
                <div className={style.content}>
                    <h2 className={classnames(`section__title_2`, `white`)}>{content['field_title']}</h2>
                    <div className={classnames(`section__description`,`white`)} dangerouslySetInnerHTML={{__html:content['field_description']}}></div>
                </div>
            </section>
        </section>
    )
}

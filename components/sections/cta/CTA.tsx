import style
    from './cta.module.scss';
import classnames
    from "classnames";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";
import Image
    from "next/image";

type Props = {
    section: {
        field_headline: string,
        field_title: string,
        field_description: string,
        field_link: Array<string>,
        field_media_image: Array<object>
    }
}

export default function CTA(props: Props) {
    let content = props['section'];
    return (
        <section className={style.cta}>
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
                    <div className={style.left}>
                        <h3 className={classnames(`section__headline`, `white`)}>{content['field_headline']}</h3>
                        <h2 className={classnames(`section__title_2`, `white`)}>{content['field_title']}</h2>
                    </div>
                    <div className={style.right}>
                        <div className={classnames(`section__description`, `white`)} dangerouslySetInnerHTML={{__html: content['field_description']}}></div>
                        {Object.keys(content['field_link']).length &&
                        <ButtonSecondary color={`white`} title={content['field_link'][0]['title']} href={content['field_link'][0]['url']}/>
                        }
                    </div>
                </div>
            </section>
        </section>
    )
}

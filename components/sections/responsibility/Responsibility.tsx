import style from './responsibility.module.scss';
import classnames
    from "classnames";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";
import Image from "next/image"

type Props = {
    section: {
        field_headline: string,
        field_title: string,
        field_description: string,
        field_link: Array<string>,
        field_media_images: Array<string>
    }
}

export default function Responsibility(props: Props) {
    const content = props.section;
    return (
        <section className={style.responsibility}>
            <div className={`section__inner`}>
                <h3 className={classnames(`section__headline`, `white`)}>{content.field_headline}</h3>
                <h2 className={classnames(`section__title_2`, `white`)}>{content.field_title}</h2>
                <div className={classnames(`section__description`, `white`)} dangerouslySetInnerHTML={{__html:content.field_description}}></div>
                {content.field_link.length &&
                    <div className={style.link}>
                        <ButtonSecondary title={content.field_link[0]['title']} href={content.field_link[0]['url']} color={`white`}/>
                    </div>
                || null }
                {content.field_media_images.length &&
                    <div className={style.images}>
                        {content.field_media_images.map((image, i) => (
                            <div className={style.image} key={i}>
                                <Image src={image['url']} alt={image['alt']} width={500} height={650}/>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </section>
    )
}

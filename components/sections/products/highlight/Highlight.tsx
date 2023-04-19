import style
    from "./highlight.module.scss";
import classnames
    from "classnames";
import ButtonPrimary
    from "@atoms/buttons/ButtonPrimary";
import Image
    from "next/image";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";

type Props = {
    section: {
        field_blue_background: boolean,
        field_headline: string,
        field_title: string,
        field_description: string,
        field_link: Array<string>,
        field_media_image: Array<string>
    }
}

export default function Highlight(props: Props) {
    const content = props.section;
    const isBlue = content.field_blue_background;
    return (
        <section className={classnames(style.productHighlight, (isBlue) ? style.blue : '')}>
            <div className={`section__inner`}>
                <div className={style.wrapper}>
                    <div className={style.image}>
                        {Object.keys(content.field_media_image).length &&
                        <Image src={content.field_media_image[0]['url']} alt={content.field_media_image[0]['alt']} width={450} height={600}/>
                        || null}
                    </div>
                    <div className={style.content}>
                        <h3 className={classnames(`section__headline`, (isBlue) ? `white` : `orange`)}>{content.field_headline}</h3>
                        <h2 className={classnames(`section__title_2`, (isBlue) ? `white` : ``)}>{content.field_title}</h2>
                        <div className={classnames(`section__description`, (isBlue) ? `white` : ``)} dangerouslySetInnerHTML={{__html: content.field_description}}></div>
                        {Object.keys(content.field_link).length &&
                        <div className={style.link}>
                            {isBlue &&
                            <ButtonSecondary title={content.field_link[0]['title']} href={content.field_link[0]['url']} color={`white`}/>
                            ||
                            <ButtonPrimary title={content.field_link[0]['title']} href={content.field_link[0]['url']}/>
                            }
                        </div>
                        || null}
                    </div>
                </div>
            </div>
        </section>
    )
}

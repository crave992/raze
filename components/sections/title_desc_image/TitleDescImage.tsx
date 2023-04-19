import style from './titleDescImage.module.scss';
import Image from "next/image";
import classnames
    from "classnames";

type Props = {
    section: {
        field_title: string,
        field_description: string,
        field_media_image: Array<any>,
        field_background: string
    }
}

export default function TitleDescImage(props:Props) {
    const content = props.section;
    return (
        <section className={classnames(style.titleDescImage, style[content.field_background])}>
            <div className={`section__inner`}>
                <div className={style.wrapper}>
                <div className={style.content}>
                    <h3 className={style.title} dangerouslySetInnerHTML={{__html:content.field_title}}></h3>
                    <div className={style.text} dangerouslySetInnerHTML={{__html:content.field_description}}></div>
                </div>
                <div className={style.image}>
                    <img src={content.field_media_image[0]['url']} alt={content.field_media_image[0]['alt']}/>
                </div>
                </div>
            </div>
        </section>
    )
}

import style
    from "./banner.module.scss";
import ButtonPrimary
    from "@atoms/buttons/ButtonPrimary";
import Image
    from "next/image";

type Props = {
    section: {
        field_headline: string,
        field_title: string,
        field_description: string,
        field_image_media: Array<string>
    }
}

export default function Banner(props: Props) {
    let content = props['section'];
    return (
        <section className={style.banner}>
            <div className={style.contentWrapper}>
                <div className={`section__inner`}>
                    {content['field_headline'] &&
                    <h3 className={style.headline} dangerouslySetInnerHTML={{__html:content['field_headline']}}></h3>
                    }
                    <h1 className={style.title} dangerouslySetInnerHTML={{__html:content['field_title']}}></h1>
                    {content['field_description'] &&
                    <div className={style.description} dangerouslySetInnerHTML={{__html: content['field_description'][0]}}></div>
                    }
                </div>
            </div>
            <div className={style.mediaWrapper}>
                <Image
                    src={content['field_media_image'][0]['url']}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt={content['field_media_image'][0]['alt']}
                />
            </div>
        </section>
    )
}

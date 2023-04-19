import style
    from './homepage-banner.module.scss';
import Image
    from "next/image"
import ButtonPrimary
    from "@atoms/buttons/ButtonPrimary";

type Props = {
    section: {
        field_title: string,
        field_description: string,
        field_link: Array<string>,
        field_image_media: Array<string>
    }
}

export default function HomepageBanner(props: Props) {
    let content = props['section'];
    return (
        <section className={style.banner}>
            <div className={style.contentWrapper}>
                <section className={`section__inner`}>
                    <h1 className={style.title} dangerouslySetInnerHTML={{__html:content['field_title']}}></h1>
                    {content['field_description'] &&
                    <div className={style.description} dangerouslySetInnerHTML={{__html: content['field_description'][0]}}></div>
                    }
                    {content['field_link'] &&
                        <ButtonPrimary title={content['field_link'][0]['title']} href={content['field_link'][0]['url']}/>
                    }
                </section>
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

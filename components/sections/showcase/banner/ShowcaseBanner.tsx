import style  from './showcaseBanner.module.scss';
import Image from "next/image";
import ButtonPrimary
    from "@atoms/buttons/ButtonPrimary";

type Props = {
    section: {
        field_title: string,
        field_headline: string,
        field_description: string,
        field_link: Array<string>,
        field_media_image: Array<string>
    }
}

export default function ShowcaseBanner(props: Props) {
    const content = props.section;
    return (
        <section className={style.showcaseBanner}>
            <div className={style.contentWrapper}>
                <div className={`section__inner`}>
                    {content['field_headline'] &&
                    <h3 className={style.headline} dangerouslySetInnerHTML={{__html:content['field_headline']}}></h3>
                    }
                    <h1 className={style.title} dangerouslySetInnerHTML={{__html:content['field_title']}}></h1>
                    {content['field_description'] &&
                    <div className={style.description} dangerouslySetInnerHTML={{__html: content['field_description'][0]}}></div>
                    }
                    {Object.keys(content['field_link']).length &&
                        <div className={style.link}>
                            <ButtonPrimary title={content['field_link'][0]['title']} href={content['field_link'][0]['url']}/>
                        </div>
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

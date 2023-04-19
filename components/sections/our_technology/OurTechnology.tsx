import style
    from './our-technology.module.scss';
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";
import classnames
    from "classnames";
import Image
    from "next/image";


type Props = {
    section: {
        field_headline: string,
        field_title: string,
        field_description: string,
        field_link: Array<string>,
        field_media_images: Array<string>,
    }
}

export default function OurTechnology(props: Props) {
    let content = props['section'];
    return (
        <section className={style.ourTechnology}>
            <div className={`section__inner`}>
                <div className={style.content}>
                    {content.field_headline &&
                    <h3 className={classnames(`section__headline`, `blue`)}>{content.field_headline}</h3>
                    }
                    {content.field_title &&
                    <h2 className={classnames(`section__title`)} dangerouslySetInnerHTML={{__html: content.field_title}}></h2>
                    }
                    {content.field_description &&
                    <div className={style.description} dangerouslySetInnerHTML={{__html: content.field_description}}></div>
                    }
                    {Object.keys(content.field_link).length &&
                    <div className={style.link}>
                        <ButtonSecondary href={content.field_link[0]['url']} title={content.field_link[0]['title']} color={`blue`}/>
                    </div>
                    || null}
                </div>
                {Object.keys(content.field_media_images).length &&
                <div className={style.images}>
                    {content.field_media_images.slice(0,3).map((image, i) => {
                        return (
                            <div className={style.image}>
                            <Image
                                src={image['url']}
                                alt={image['alt']}
                                width={400}
                                height={520}
                            />
                            </div>
                        )
                    })}
                </div>
                }
            </div>
        </section>
    );
}

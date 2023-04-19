import style
    from "./testimonials.module.scss";
import Image
    from "next/image"
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";

type Props = {
    section: {
        field_title: string,
        field_description: string,
        field_testimonials: Array<object>,
        field_link:Array<any>
    }
}

export default function Testimonials(props: Props) {
    let content = props.section;

    return (
        <section className={style.testimonials}>
            <div className={`section__inner`}>
                <div className={`section__title_2`}>{content.field_title}</div>
                <div className={`section__description`} dangerouslySetInnerHTML={{__html: content.field_description}}></div>
                {content.field_testimonials.length &&
                    <div className={style.content}>
                        {content.field_testimonials.map((testimonial, i) => (
                            <div className={style.testimonial} key={i}>
                                {Object.keys(testimonial['field_media_image']).length &&
                                <div className={style.image}>
                                    <Image src={testimonial['field_media_image'][0]['url']} alt={testimonial['field_media_image'][0]['alt']} width={180} height={180}/>
                                </div>
                                }
                                <div className={style.description}>
                                    <div className={style.text} dangerouslySetInnerHTML={{__html:testimonial['field_description']}}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
                {content.field_link.length &&
                <div className={style.link}>
                    <ButtonSecondary title={content.field_link[0]['title']} href={content.field_link[0]['url']}/>
                </div>
                }
            </div>
        </section>
    )
}

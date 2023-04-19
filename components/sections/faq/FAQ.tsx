import style
    from './faq.module.scss';
import Image
    from "next/image"
import {useState} from "react";
import classnames
    from "classnames";

type Props = {
    section: {
        field_title: string,
        field_faqs: Array<Object>
    }
}

export default function FAQ(props: Props) {
    let content = props.section;
    const [activateItem, setActivateItem] = useState(0);

    return (
        <section className={style.faq}>
            <div className={`section__inner`}>
                <h2 className={`section__title_2`}>{content.field_title}</h2>
                {content.field_faqs.length &&
                <div className={style.items}>
                    {content.field_faqs.map((faq, i) => (
                        <div className={classnames(style.item, (i === activateItem) ? style.activate : '')} key={i}>
                            <div className={style.question} onClick={() => setActivateItem(i)}>{faq['field_title']}</div>
                            <div className={style.answer}>
                                <div className={style.text} dangerouslySetInnerHTML={{__html: faq['field_description']}}></div>
                                {Object.keys(faq['field_media_image']).length &&
                                <div className={style.image}>
                                    <img src={faq['field_media_image'][0]['url']} alt={faq['field_media_image'][0]['title']}/>
                                </div>
                                || null}
                            </div>
                        </div>
                    ))}
                </div>
                }
            </div>
        </section>
    )
}

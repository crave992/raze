import style
    from './anchor.module.scss';
import Link
    from 'next/link'

type Props = {
    section: {
        field_anchor_content: Array<any>
    }
}

export default function Anchor(props: Props) {
    const content = props.section;
    return (
        <section className={style.anchorWithContent}>
            <div className={`section__inner`}>
                <div className={style.anchorSideContent}>
            <div className={style.anchorSide}>
                <ul>
                    {content.field_anchor_content.map((anchor, i) => (
                        <Link href={`#section` + i}>
                            <li key={i}>{anchor.field_title}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className={style.anchorContent}>
                <div className={style.anchorSections}>
                    {content.field_anchor_content.map((anchor, i) => (
                        <div id={`section${i}`} className={style.anchorSection} key={i}>
                            <div dangerouslySetInnerHTML={{__html: anchor.field_description}}></div>
                        </div>
                    ))}
                </div>
            </div>
                </div>
            </div>
        </section>
    )
}

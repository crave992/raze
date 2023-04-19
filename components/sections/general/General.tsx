import style from './general.module.scss';

type Props = {
    section: {
        field_description: string
    }
}

export default function General(props:Props) {
    return (
        <section className={style.general}>
            <div className={`section__inner`}>
                <div className={style.content} dangerouslySetInnerHTML={{__html:props.section.field_description}}></div>
            </div>
        </section>
    )
}

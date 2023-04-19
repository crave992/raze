import style
    from './quickActions.module.scss';
import Link
    from 'next/link';

type Props = {
    section: {
        field_title: string,
        field_quick_action: Array<any>
    }
}

export default function QuickActions(props: Props) {
    const content = props.section;
    return (
        <section className={style.quickActions}>
            <div className={`section__inner`}>
                <h2 className={`section__title_2`}>{content.field_title}</h2>
                {content.field_quick_action.length &&
                <div className={style.actions}>
                    {content.field_quick_action.map((action, i) => (
                        <Link href={action.field_link[0]['url']}>
                            <div className={style.action} key={i}>
                                <div className={style.image}>
                                    <img src={action.field_media_image[0]['url']} alt={action.field_media_image[0]['alt']}/>
                                </div>
                                <div className={style.title}>{action.field_link[0]['title']}</div>
                            </div>
                        </Link>
                    ))}
                </div>
                }
            </div>
        </section>
    )
}

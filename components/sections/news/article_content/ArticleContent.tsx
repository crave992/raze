import style
    from './article-content.module.scss';

type Props = {
    section: {
        field_description: string,
        field_article_images: Array<any>
    }
}

export default function ArticleContent(props: Props) {
    return (
        <section className={style.articleContent}>
            <div className={`section__inner`}>
                <div className={style.content}>
                    <div className={style.body}>
                        <div className={`articleContent`} dangerouslySetInnerHTML={{__html: props.section.field_description}}></div>
                        {Object.keys(props.section.field_article_images).length &&
                        <div className={style.images}>
                            {props.section.field_article_images.map((image, i) => (
                                <div className={style.image}>
                                    <img src={image['url']} alt={image['alt']}/>
                                </div>
                            ))}
                        </div>
                        || null}
                    </div>
                </div>
            </div>
        </section>
    )
}

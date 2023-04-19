import style
    from './latest-news.module.scss';
import classnames
    from "classnames";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";
import CardArticle
    from "@molecules/cards/article/CardArticle";

type Props = {
    section: {
        field_headline: string,
        field_title: string,
        field_link: Array<string>,
        news: Array<string>,
    }
}

export default function LatestNews(props: Props) {
    let content = props['section'];
    return (
        <section className={style.latestNews}>
            <div className={`section__inner`}>
                {content.field_headline &&
                <h3 className={classnames(`section__headline`)}>{content.field_headline}</h3>
                }
                {content.field_title &&
                <h2 className={classnames(`section__title`)} dangerouslySetInnerHTML={{__html: content.field_title}}></h2>
                }
                {Object.keys(content.field_link).length &&
                <div className={style.link}>
                    <ButtonSecondary href={content.field_link[0]['url']} title={content.field_link[0]['title']}/>
                </div>
                || null}
                {Object.keys(content.news).length &&
                <div className={style.news}>
                    <div className={style.featured}>
                        <CardArticle
                            key={0}
                            title={content.news[0]['title']}
                            path={content.news[0]['path']}
                            image={content.news[0]['image']}
                            category={content.news[0]['category']}
                            body={content.news[0]['body']}
                            created={content.news[0]['created']}
                        />
                    </div>
                    <div className={style.normal}>
                        {Object.keys(content.news).length > 1 && content.news.slice(1).map((article, i) => (
                            <CardArticle
                                key={i}
                                title={article['title']}
                                path={article['path']}
                                image={article['image']}
                                category={article['category']}
                                body={article['body']}
                                created={article['created']}
                                hideImage={true}
                            />
                        ))}
                    </div>
                </div>
                }
            </div>
        </section>
    );
}

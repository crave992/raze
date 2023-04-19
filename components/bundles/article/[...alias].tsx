import style
    from "./article.module.scss";
import Breadcrumb
    from "@molecules/breadcrumb/Breadcrumb";
import {useTranslation} from "next-i18next";
import classnames
    from "classnames";
import Section
    from "@util/Section";
import {
    FacebookShareButton,
    TwitterShareButton
} from "react-share";
import {
    useEffect,
    useState
} from "react";
import {restGet} from "@api/rest";
import CardArticle
    from "@molecules/cards/article/CardArticle";
import Slider
    from "react-slick";

export default function Article(props) {
    const {t} = useTranslation('common');
    const node = props.node;
    const [myURL, setMyURL] = useState('');
    const [moreArticles, setMoreArticle] = useState([]);
    const [moreSlider, setMoreSlider] = useState(null);

    useEffect(() => {
        setMyURL(window.location.href);
        restGet(`rhm-articles?_format=json&page=1&term=all&self=${node.id}`).then((res) => {
            setMoreArticle(res.articles);
        });
    }, [node]);

    const settings = {
        dots: false,
        infinite: false,
        arrows: true,
        speed: 600,
        slidesToShow: 2.5,
        slidesToScroll: 1,
    }

    return (
        <article className={style.article}>
            <div className={`mainWrapper`}>
                {props.node.breadcrumb &&
                <Breadcrumb links={props.node.breadcrumb}/>
                }
                <section className={style.firstParagraph}>
                    <div className={`section__inner`}>
                        <div className={style.titleWrapper}>
                            <h2 className={classnames(`section__headline`, `orange`)} dangerouslySetInnerHTML={{__html: node.field_category[0]['name']}}></h2>
                            <h1 className={`section__title_2`} dangerouslySetInnerHTML={{__html: node.title}}></h1>
                            <div
                                className={style.tags}
                                dangerouslySetInnerHTML={{__html: node.created + '  |  ' + t('article.created', {author: node.author})}}
                            >
                            </div>
                        </div>
                    </div>
                    {node.field_media_image.length &&
                    <div className={style.featureImage}>
                        <img src={node.field_media_image[0]['url']} alt={node.field_media_image[0]['alt']}/>
                    </div>
                    }
                    <div className={`section__inner`}>
                        <div className={style.bodyWrapper}>
                            <div className={style.share}>
                                <div className={style.label}>{t('label.share')}</div>
                                {myURL &&
                                <div className={style.platform}>
                                    <FacebookShareButton
                                        url={myURL}
                                        className={classnames(`btn-share `, `btn-share__facebook`)}>
                                    </FacebookShareButton>
                                    <TwitterShareButton
                                        url={myURL}
                                        className={classnames(`btn-share `, `btn-share__twitter`)}>
                                    </TwitterShareButton>
                                </div>
                                }
                            </div>
                            <div className={style.body}>
                                <div className={`articleContent`} dangerouslySetInnerHTML={{__html: node.body[0]['value']}}></div>
                                {node.field_media_images.length &&
                                <div className={style.images}>
                                    {node.field_media_images.map((image, i) => (
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
                {node.field_article_sections && node.field_article_sections.map(section =>
                    <Section key={section.paragraph.uuid} section={section}/>
                )}
                <section className={style.latest}>
                    <div className={`section__inner`}>
                        <h2 className={`section__title_2`}>{t('article.more')}</h2>
                        {moreArticles && moreArticles.length &&
                        <div className={style.moreArticles}>
                            <Slider ref={(slider) => setMoreSlider(slider)} {...settings} >
                                {moreArticles.map((article, i) => (
                                    <CardArticle
                                        key={i}
                                        title={article['title']}
                                        path={article['path']}
                                        image={article['image']}
                                        category={article['category']}
                                        body={article['body']}
                                        created={article['created']}
                                    />
                                ))}
                            </Slider>
                        </div>
                        }
                    </div>
                </section>
            </div>
        </article>
    )
}

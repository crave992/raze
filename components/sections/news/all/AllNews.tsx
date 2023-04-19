import style from './allNews.module.scss';
import {useTranslation} from "next-i18next";
import {
    useEffect,
    useState
} from "react";
import {restGet} from "@api/rest";
import classnames
    from "classnames";
import CardArticle
    from "@molecules/cards/article/CardArticle";

type Props = {
    section: {
        field_title: string
    }
}


export default function AllNews(props:Props) {
    const {t} = useTranslation('common');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [articleType, setArticleType] = useState([]);
    const [articles, setArticles] = useState([]);
    const [selectedType, setSelectedType] = useState('all');
    const content = props.section;

    useEffect(() => {
        getArticles(page);
    }, [page, selectedType]);

    useEffect(() => {
        getArticleTerm();
    }, [])

    const getArticles = (page) => {
        restGet(`rhm-articles?_format=json&page=${page}&term=${selectedType}`).then((res) => {
            setArticles(res.articles);
            if (page == 1) {
                setTotal(res.total);
            }
        });
    }

    const getArticleTerm = () => {
        restGet(`rhm-term-load-tree?_format=json&term=category`).then((res) => {
            setArticleType(res);
        });
    }

    const handleUpdateArticles = (page) => {
        setPage(page);
    }

    const handleUpdatePage = (action) => {
        if (action === 'prev' && page > 1) {
            setPage(page - 1);

        }
        if (action === 'next' && page < total) {
            setPage(page + 1);
        }
    }

    return (
        <section className={style.allNews}>
            <div className={`section__inner`}>
                <div className={style.titleWrapper}>
                    <h2 className={`section__title_2`}>{content.field_title}</h2>
                    {articleType &&
                    <div className={`selectField`}>
                        <div className={`selectWrapper`}>
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                            >
                                <option value={`all`}>{t('label.all')}</option>
                                {articleType.map(option => (
                                    <option key={option.id} value={option.id}>{option.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    }
                </div>

                {articles.length &&
                <div className={style.articles}>
                    {articles.map((article, i) => (
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
                </div>
                }

                <div className={`pagination`}>
                    <ul>
                        <li className={classnames(`action`, `prev`, ( page == 1 ) ? `disabled` : '' )} onClick={() => handleUpdatePage('prev')}>&nbsp;</li>
                        {Array.from(Array(total)).map((e, i) => (
                            <li className={classnames(`nav`, ( (i + 1) == page ) ? `currently` : '')} onClick={() => handleUpdateArticles(( i + 1 ))}>{ ( i + 1 )}</li>
                        ))}
                        <li className={classnames(`action`, `next`, ( page == total ) ? `disabled` : '' )} onClick={() => handleUpdatePage('next')}>&nbsp;</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

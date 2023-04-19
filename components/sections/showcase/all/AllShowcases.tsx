import style
    from './allShowcases.module.scss'
import {useTranslation} from "next-i18next";
import CardShowcase
    from "@molecules/cards/showcase/CardShowcase";
import {
    useEffect,
    useState
} from "react";
import {restGet} from "@api/rest";
import classnames
    from "classnames";
import addressJSON
    from "../../../../addressfield.min.json";


export default function AllShowcases() {
    const {t} = useTranslation('common');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [showcaseType, setShowcaseType] = useState([]);
    const [showcases, setShowcases] = useState([]);
    const [selectedType, setSelectedType] = useState('all');

    useEffect(() => {
        getShowcases(page);
    }, [page, selectedType]);

    useEffect(() => {
        getShowcaseTerm();
    }, [])

    const getShowcases = (page) => {
        restGet(`rhm-showcases?_format=json&page=${page}&term=${selectedType}`).then((res) => {
            setShowcases(res.showcases);
            if (page == 1) {
                setTotal(res.total);
            }
        });
    }

    const getShowcaseTerm = () => {
        restGet(`rhm-term-load-tree?_format=json&term=showcase_type`).then((res) => {
            setShowcaseType(res);
        });
    }

    const handleUpdateShowcases = (page) => {
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
        <section className={style.allShowcases}>
            <div className={`section__inner`}>
                <div className={style.titleWrapper}>
                    <h2 className={`section__title_2`}>{t('showcase.all')}</h2>
                    {showcaseType &&
                    <div className={`selectField`}>
                        <div className={`selectWrapper`}>
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                            >
                                <option value={`all`}>{t('label.all')}</option>
                                {showcaseType.map(option => (
                                    <option key={option.id} value={option.id}>{option.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    }
                </div>

                {showcases.length &&
                <div className={style.showcases}>
                    {showcases.map((showcase, i) => (
                        <CardShowcase showcase={showcase}/>
                    ))}
                </div>
                }

                <div className={`pagination`}>
                    <ul>
                        <li className={classnames(`action`, `prev`, ( page == 1 ) ? `disabled` : '' )} onClick={() => handleUpdatePage('prev')}>&nbsp;</li>
                        {Array.from(Array(total)).map((e, i) => (
                            <li className={classnames(`nav`, ( (i + 1) == page ) ? `currently` : '')} onClick={() => handleUpdateShowcases(( i + 1 ))}>{ ( i + 1 )}</li>
                        ))}
                        <li className={classnames(`action`, `next`, ( page == total ) ? `disabled` : '' )} onClick={() => handleUpdatePage('next')}>&nbsp;</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

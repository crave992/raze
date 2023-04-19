import style from './certificate.module.scss';
import {useTranslation} from "next-i18next";
import {
    useEffect,
    useState
} from "react";
import {restGet} from "@api/rest";
import classnames
    from "classnames";
import CardShowcase
    from "@molecules/cards/showcase/CardShowcase";
import CardCertificate
    from "@molecules/cards/certificate/CardCertificate";

type Props = {
    section: {
        field_title: string,
        field_description: string
    }
}

export default function Certificate(props:Props) {
    const content = props.section;
    const {t} = useTranslation('common');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        getCertificates(page);
    }, [page]);

    const getCertificates = (page) => {
        restGet(`rhm-certificates?_format=json&page=${page}`).then((res) => {
            setCertificates(res.certificates);
            if (page == 1) {
                setTotal(res.total);
            }
        });
    }

    const handleUpdateCertificates = (page) => {
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
        <section className={style.certificate}>
            <div className={`section__inner`}>
                <div className={style.header}>
                    <h2 className={`section__title_2`} dangerouslySetInnerHTML={{__html:content.field_title}}></h2>
                    <div className={`section__description`} dangerouslySetInnerHTML={{__html:content.field_description}}></div>
                    {certificates.length &&
                    <div className={style.certificates}>
                        {certificates.map((certificate, i) => (
                            <CardCertificate certificate={certificate}/>
                        ))}
                    </div>
                    }
                    <div className={`pagination`}>
                        <ul>
                            <li className={classnames(`action`, `prev`, ( page == 1 ) ? `disabled` : '' )} onClick={() => handleUpdatePage('prev')}>&nbsp;</li>
                            {Array.from(Array(total)).map((e, i) => (
                                <li className={classnames(`nav`, ( (i + 1) == page ) ? `currently` : '')} onClick={() => handleUpdateCertificates(( i + 1 ))}>{ ( i + 1 )}</li>
                            ))}
                            <li className={classnames(`action`, `next`, ( page == total ) ? `disabled` : '' )} onClick={() => handleUpdatePage('next')}>&nbsp;</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

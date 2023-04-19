import Layout
    from "@site/layout/Layout";
import style
    from "./appointment.module.scss";
import {useTranslation} from "react-i18next";
import useStore
    from "@store/store";
import {formatDate} from "@util/helper";
import {useRouter} from "next/router";
import {
    useEffect,
    useState
} from "react";
import {restGet} from "@api/rest";
import withGlobalData
    from "@util/withGlobalData";

export default function AppointmentConfirmed(props) {

    const {t} = useTranslation('common');
    const [orderHistory, setOrderHistory] = useState([]);

    const setHasCoat = useStore.getState().setHasCoat;
    const coatingDate1 = useStore(state => state.coatingDate1);
    const coatingDate2 = useStore(state => state.coatingDate2);

    useEffect(() => {
        restGet('rhm-store/orders/get?_format=json&limit=1').then((res) => {
            setOrderHistory(res[0]);
            setHasCoat(false);
        });
    }, []);

    return (
        <Layout globals={props.globals}>
            <div className={`mainWrapper`}>
                <div className={`section__inner`}>
                    {Object.keys(orderHistory).length &&
                    <div className={style.confirmedWrapper}>
                        <div className={style.icon}>&nbsp;</div>
                        <h1 className={style.title}>{t('appointment.confirm')}</h1>
                        <h2 className={style.subtitle}>{t('appointment.confirm.text')}</h2>
                        <div className={style.coatingDetail}>
                            <div className={style.image}>Image</div>
                            <div className={style.details}>
                                <h4 className={style.name}>{orderHistory['lineItems'][0]['title']}</h4>
                                <div className={style.dates}>
                                    <div className={style.date}>
                                        <div className={style.label}>{t('product.coat.preferred_1')}</div>
                                        <div className={style.value}>{formatDate(coatingDate1)}</div>
                                    </div>
                                    <div className={style.date}>
                                        <div className={style.label}>{t('product.coat.preferred_2')}</div>
                                        <div className={style.value}>{formatDate(coatingDate2)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </Layout>
    );
}

export const getStaticProps = withGlobalData(context => {

    const props = {auth: true};
    return {props, revalidate: 5}

});

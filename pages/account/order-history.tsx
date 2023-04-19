import withAuth
    from "@util/withAuth";
import Layout
    from "@site/layout/Layout";
import AccountLayout
    from "@site/layout/AccountLayout";
import withGlobalData
    from "@util/withGlobalData";
import {
    useEffect,
    useState
} from "react";
import {restGet} from "@api/rest";
import style
    from "./account.module.scss";
import {useTranslation} from "next-i18next";
import classnames
    from "classnames";
import OrderHistoryPopupModal
    from "@molecules/popupModal/orderHistoryPopupModal";
import {priceFormatted} from "@util/helper";
import Link
    from "next/link";


const OrderHistory = (props) => {

    const {t} = useTranslation('common');
    const [orderHistory, setOrderHistory] = useState([]);
    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const handleShow = (val) => {
        setModalContent(val);
        setShow(true);
    };

    useEffect(() => {
        restGet('rhm-store/orders/get?_format=json').then((res) => {
            setOrderHistory(res);
        });
    }, []);

    return (
        <Layout globals={props.globals}>
            <AccountLayout>
                <h1>{t('account.history.title')}</h1>
                <div className={style.headline}>{t('account.history.headline')}</div>
                {orderHistory &&
                <>
                    {orderHistory.length &&
                    <div className={classnames(style.wrapper, style.history)}>
                        <div className={classnames(style.row, style.rowHead)}>
                            <div className={style.column}>{t('account.history.number')}</div>
                            <div className={style.column}>{t('account.history.date')}</div>
                            <div className={style.column}>{t('account.history.status')}</div>
                            <div className={style.column}>{t('account.history.delivery')}</div>
                            <div className={classnames(style.column, style.amount)}>{t('account.history.amount')}</div>
                            <div className={classnames(style.column, style.last)}>&nbsp;</div>
                        </div>
                        {orderHistory.map(history => {
                            return (
                                <div className={classnames(style.row, style.rowBody)} key={history.id}>
                                    <div className={style.column}>{history.id}</div>
                                    <div className={style.column}>{history.created}</div>
                                    <div className={style.column}>
                                        {history.state.state}
                                        {history.state.tracking &&
                                            <Link href={history.state.tracking}><a target={`_blank`}>{t('account.history.track')}</a></Link>
                                        || null }
                                    </div>
                                    <div className={style.column}>
                                        {history.state.date &&
                                            <>{history.state.date}</>
                                        || null }
                                    </div>
                                    <div className={classnames(style.column, style.amount)}>{priceFormatted(history.totalAmount, history.currency)}</div>
                                    <div className={classnames(style.column, style.last)}>
                                        <div className={style.detailBtn} onClick={() => handleShow(history)}>&nbsp;</div>
                                    </div>
                                </div>
                            )
                        })}
                        <OrderHistoryPopupModal show={show} content={modalContent} onHide={()=> setShow(false)}/>
                    </div>
                    ||
                    <div>No Order Record</div>
                    }
                </>
                ||
                <div>Loading...</div>
                }
            </AccountLayout>
        </Layout>
    )
};

export const getStaticProps = withGlobalData(context => {

    const props = {auth: true};
    return {
        props,
        revalidate: 5
    }

});

export default withAuth(OrderHistory);

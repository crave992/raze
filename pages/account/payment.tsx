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
import {
    restGet,
    restPost
} from "@api/rest";
import style
    from "./account.module.scss";
import {useTranslation} from "next-i18next";
import classnames
    from "classnames";
import CardPayment
    from "@molecules/cards/payment/CardPayment";
import PaymentPopupModal
    from "@molecules/popupModal/paymentPopupModal";
import AlertPopupModal
    from "@molecules/popupModal/alertPopupModal";

const Payment = (props) => {

    const {t} = useTranslation('common');
    const [cardDetails, setCardDetails] = useState(null);
    const [show, setShow] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [deletePayment, setDeletePayment] = useState(null);

    useEffect(() => {
        getCardDetails();
    }, [show]);

    let defaultCard = '';
    if (cardDetails) {
        defaultCard = cardDetails.find(element => {
            return (element.isDefault == 1) ? element : '';
        });
    }

    const getCardDetails = () => {
        restGet('rhm-store/cards/get?_format=json').then((res) => {
            setCardDetails(res);
        });
    }

    const handleDefault = () => (paragraphID) => {
        let data = {
            action: 'setDefault',
            paragraphID: paragraphID,
        }
        restPost('rhm-store/account/payment?_format=json', data).then((res) => {
            getCardDetails();
        });
    }

    const handleShow = () => (card) => {
        card.action = 'update';
        setModalContent(card);
        setShow(true);
    }

    const handleCreate = () => {
        setModalContent({action: 'create'});
        setShow(true);
    }

    const handleAlert = () => (paragraphID) => {
        setDeletePayment(paragraphID);
        setAlertShow(true);
    }

    const handleDelete = () => {
        let data = {
            'action': 'delete',
            'paragraphID': deletePayment,
        }
        restPost('rhm-store/account/payment?_format=json', data).then((res) => {
            getCardDetails();
            setAlertShow(false);
        });
    }

    const alertContent = {
        'title': t('account.payment.confirm'),
        'btn': t('account.payment.confirmed')
    }

    return (
        <Layout globals={props.globals}>
            <AccountLayout>
                <h1 className={style.title}>{t(`account.payment.title`)}</h1>
                {cardDetails &&
                <>
                    <div className={classnames(style.wrapper, style.addresses)}>
                        {cardDetails.length &&
                        <>
                            {defaultCard &&
                            <div className={style.section}>
                                <div className={style.sectionHeader}>
                                    <h2>{t(`account.payment.default`)}</h2>
                                </div>
                                <CardPayment card={defaultCard} defaultAction={handleDefault()} editAction={handleShow()} deleteAction={handleAlert()}/>
                            </div>
                            }
                            {  ( ( defaultCard && cardDetails.length > 1 ) || ( !defaultCard && cardDetails ) ) &&
                            <div className={style.section}>
                                <div className={style.sectionHeader}>
                                    <h2>{t(`account.payment.other`)}</h2>
                                </div>
                                {cardDetails.map(card => {
                                    if (card.isDefault == '0') {
                                        return (
                                            <CardPayment card={card} defaultAction={handleDefault()} editAction={handleShow()} deleteAction={handleAlert()}/>
                                        )
                                    }
                                })}
                            </div>
                            }
                        </>
                        ||
                        <div className={style.section}>
                            <div className={style.sectionHeader}>
                                <h2>{t(`account.payment.empty`)}</h2>
                            </div>
                        </div>
                        }
                        <div className={style.addPayment}>
                            <div className={style.addBtn} onClick={() => handleCreate()}>{t('account.payment.add')}</div>
                        </div>
                    </div>
                    <PaymentPopupModal show={show} content={modalContent} onHide={() => setShow(false)}/>
                    <AlertPopupModal show={alertShow} content={alertContent} alertAction={handleDelete} onHide={() => setAlertShow(false)}/>
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

export default withAuth(Payment);

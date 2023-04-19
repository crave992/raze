import withGlobalData
    from "@util/withGlobalData";
import Layout
    from "@site/layout/Layout";
import {useTranslation} from "next-i18next";
import style
    from "./checkout.module.scss";
import classnames
    from "classnames";
import Image
    from "next/image";
import {
    useEffect,
    useState
} from "react";
import {restGet} from "@api/rest";
import {priceFormatted} from "@util/helper";
import AddressFormat
    from "@molecules/cards/address/AddressFormat";
import useStore
    from "@store/store";
import {useRouter} from "next/router";

export default function ThankYou(props) {

    const {t} = useTranslation('common');
    const [orderHistory, setOrderHistory] = useState([]);

    const router = useRouter();
    const hasCoat = useStore(state => state.hasCoat);
    if(hasCoat) {
        router.replace('/appointment');
    }

    useEffect(() => {
        restGet('rhm-store/orders/get?_format=json&limit=1').then((res) => {
            setOrderHistory(res[0]);
        });
    }, []);

    return (
        <Layout globals={props.globals}>
            <div className={`mainWrapper`}>
                <div className={`section__inner`}>
                    {Object.keys(orderHistory).length &&
                    <div className={style.thankYouWrapper}>
                        <div className={style.icon}>&nbsp;</div>
                        <h1 className={style.title}>{t('checkout.success.title')}</h1>
                        <h2 className={style.subtitle}>{t('checkout.success.subtitle')}</h2>
                        <div className={style.orderDetail}>
                            <h3 className={style.modalTitle}>{t(`checkout.success.detailTitle`, {orderNumber: orderHistory['id']})}</h3>
                            <div className={style.modalSubtitle}>{t('checkout.success.detailSubtitle')}</div>
                            {orderHistory['lineItems'] &&
                            <>
                                <div className={classnames(style.modalRow, style.modalRowHead)}>
                                    <div className={classnames(style.modalColumn, style.image)}>&nbsp;</div>
                                    <div className={classnames(style.modalColumn, style.title)}>&nbsp;</div>
                                    <div className={classnames(style.modalColumn, style.quantity)}>{t('account.history.quantity')}</div>
                                    <div className={classnames(style.modalColumn, style.amount)}>{t('account.history.amount')}</div>
                                </div>
                                {orderHistory['lineItems'].map(item => {
                                    return (
                                        <div className={classnames(style.modalRow, style.modalRowBody)} key={item}>
                                            <div className={classnames(style.modalColumn, style.image)}>
                                                {item.media && item.media.length > 0 &&
                                                <Image
                                                    width={110}
                                                    height={110}
                                                    objectFit="cover"
                                                    objectPosition="center"
                                                    src={item.media[0]['url']}/>
                                                }
                                            </div>
                                            <div className={classnames(style.modalColumn, style.title)}>{item.title}</div>
                                            <div className={classnames(style.modalColumn, style.quantity)}>{item.quantity}</div>
                                            <div className={classnames(style.modalColumn, style.amount)}>{priceFormatted(item.subTotal, item.currency)}</div>
                                        </div>
                                    )
                                })}
                            </>
                            }
                            <div className={style.modalFooter}>
                                <div className={style.modalAddress}>
                                    {orderHistory['shipping'] &&
                                    <AddressFormat address={orderHistory['shipping']}/>
                                    || null}
                                </div>
                                <div className={style.modalAmount}>
                                    {orderHistory['discount'] && orderHistory['discount'].hasOwnProperty('amount') &&
                                    <div className={style.amountRow}>
                                        <div className={style.amountLabel}>{t('checkout.discount')}</div>
                                        <div className={style.amountValue}>{priceFormatted(orderHistory['discount']['amount'], orderHistory['discount']['currency'])}</div>
                                    </div>
                                    || null}
                                    {orderHistory['shipment'] && orderHistory['shipment'].hasOwnProperty('amount') &&
                                    <div className={style.amountRow}>
                                        <div className={style.amountLabel}>{t('checkout.shipping')}</div>
                                        <div className={style.amountValue}>{priceFormatted(orderHistory['shipment']['amount'], orderHistory['shipment']['currency'], orderHistory['shipment']['isFree'])}</div>
                                    </div>
                                    || null}
                                    <div className={style.amountRow}>
                                        <div className={style.amountLabel}>{t('checkout.total')}</div>
                                        <div className={classnames(style.amountValue, style.totalPrice)}>{priceFormatted(orderHistory['totalAmount'], orderHistory['currency'])}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </Layout>
    )
}


export const getStaticProps = withGlobalData(context => {

        const props = {auth: false};
        return {
            props,
            revalidate: 5
        }
    }
);

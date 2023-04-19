import useStore
    from "@store/store";
import {
    useEffect,
    useState
} from "react";
import {useTranslation} from "react-i18next";
import style
    from "./bookingSummary.module.scss";
import Link
    from "next/link";
import {formatDate} from "@util/helper";


export default function BookingSummary() {
    const {t} = useTranslation('common');
    const cart = useStore(state => state.cart);
    const [isReady, setIsReady] = useState(false);

    const coatingDate1 = useStore(state => state.coatingDate1);
    const coatingDate2 = useStore(state => state.coatingDate2);

    useEffect(() => {
        if (cart && cart.length > 0 && cart[0].order_items.length) {
            setIsReady(true);
            console.log(cart);
        }
    }, [cart]);

    console.log(cart);

    return (
        <div className={style.bookingSummary}>
            <div className={style.header}>
                <h3 className={style.title}>{t('appointment.summary.title')}</h3>
            </div>
            {isReady &&
            <>
                <div className={style.items}>
                    {cart[0].order_items.map(cartItem => (
                        <div className={style.item} key={`item-${cartItem.order_item_id}`}>
                            <div className={style.image}>Image</div>
                            <div className={style.details}>
                                <h4 className={style.name}>{cartItem.title}</h4>
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
                    ))}
                </div>
                <div className={style.totalWrapper}>
                    <div className={style.label}>{t('checkout.total')}</div>
                    <div className={style.total}>{t('appointment.total')}</div>
                </div>
            </>
            }
        </div>
    )
}

import useStore
    from "@store/store";
import style
    from './orderSummary.module.scss';
import {useTranslation} from "next-i18next";
import Link
    from "next/link";
import {
    useEffect,
    useState
} from "react";
import TextInput
    from "@molecules/form/TextInput";
import {useForm} from "react-hook-form";
import {
    restGet,
    restPost
} from "@api/rest";

const OrderSummary = () => {

    const {t} = useTranslation('common');
    const cart = useStore(state => state.cart);
    const [isReady, setIsReady] = useState(false);
    const [promoMsg, setPromoMsg] = useState(null);
    const setCart = useStore.getState().setCart;

    useEffect(() => {
        if (cart && cart.length > 0 && cart[0].order_items.length) {
            setIsReady(true);
            console.log(cart);
        }
    }, [cart]);


    let shippingFee = '';
    let promoCode = '';
    if (isReady) {
        const hasRate = cart[0]['order_total']['adjustments'].find(adjustment => {
            return (adjustment.type === 'shipping') ? adjustment : '';
        });

        if(hasRate) {
            if(hasRate['amount']['number'] == '0.00') {
                shippingFee =  t('checkout.shipping.free');
            } else {
                shippingFee = hasRate['amount']['formatted'];
            }
        }

        const hasPromo = cart[0]['order_total']['adjustments'].find(adjustment => {
            return (adjustment.type === 'promotion') ? adjustment : '';
        });
        if (hasPromo) {
            promoCode = hasPromo;
        }
    }

    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({});

    const onSubmit = async data => {
        setPromoMsg(null);
        data.action = 'apply';
        restPost('rhm-store/promo?_format=json', data).then((callback) => {
            if (callback.json === '200') {
                console.log('working');
                restGet('cart?_format=json').then((res) => {
                    setCart(res);
                    console.log('reloaded');
                });
            } else {
                setPromoMsg(t(`checkout.promo.msg.${callback.json}`));
            }
        });
    };

    const handleRemoveCoupon = async () => {
        setPromoMsg(null);
        let data = {'action':'remove'};
        restPost('rhm-store/promo?_format=json', data).then((callback) => {
            if (callback.json === '400') {
                console.log('removed');
                restGet('cart?_format=json').then((res) => {
                    setCart(res);
                    console.log('reloaded');
                });
            }
        });
    }

    return (
        <div className={style.orderSummary}>
            <div className={style.header}>
                <h3 className={style.title}>{t('checkout.summary.title')}</h3>
                <Link href={`/cart`}><a className={style.edit}>{t('checkout.summary.edit')}</a></Link>
            </div>
            {isReady &&
            <>
                <div className={style.items}>
                    {cart[0].order_items.map(cartItem => (
                        <div className={style.item} key={`item-${cartItem.order_item_id}`}>
                            <div className={style.image}>Image</div>
                            <div className={style.details}>
                                <h4 className={style.name}>{cartItem.title}</h4>
                                <div className={style.tag}>
                                    <span>{t('checkout.quantity')} : {parseInt(cartItem.quantity)}</span>
                                    <span>{cartItem.total_price.formatted}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={style.promoCodeWrapper}>
                    {promoCode &&
                    <div className={style.promoApplied}>
                        <div className={style.content}>
                            <div className={style.label}>{t(`checkout.promo.placeholder`)}</div>
                            <div className={style.value}>{promoCode['label']}</div>
                        </div>
                        <div className={style.removeBtn}
                            onClick={() => {handleRemoveCoupon()}}>&nbsp;</div>
                    </div>
                    ||
                    <>
                        <form className={style.promoForm} onSubmit={handleSubmit(onSubmit)}>
                            <div className={style.promoInput}>
                                <TextInput
                                    control={control}
                                    name={`promo_code`}
                                    placeholder={t(`checkout.promo.placeholder`)}
                                    rules={{required: true}}
                                />
                            </div>
                            <div className={style.promoSubmit} title={t('checkout.apply')} onClick={handleSubmit(onSubmit)}>{t('checkout.promo.apply')}</div>
                        </form>
                        {promoMsg &&
                        <div className={style.promoMsg}>{promoMsg}</div>}
                    </>
                    }
                </div>
                <div className={style.adjustmentsWrapper}>
                    {promoCode &&
                    <div className={style.dataSet}>
                        <div className={style.label}>{t('checkout.discount')}</div>
                        <div className={style.value}>{promoCode['amount']['formatted']}</div>
                    </div>
                    }
                    {shippingFee &&
                    <div className={style.dataSet}>
                        <div className={style.label}>{t('checkout.shipping')}</div>
                        <div className={style.value}>{shippingFee}</div>
                    </div>
                    }
                </div>
                <div className={style.totalWrapper}>
                    <div className={style.label}>{t('checkout.total')}</div>
                    <div className={style.total}>{cart[0]['total_price']['formatted']}</div>
                </div>
            </>
            }
        </div>
    )
}

export default OrderSummary;

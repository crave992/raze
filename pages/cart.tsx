import Layout
    from "@site/layout/Layout";
import withGlobalData
    from "@util/withGlobalData";
import useStore
    from "@store/store";
import {useEffect} from "react";
import {
    restGet,
    restPost,
    restPatch,
    restDelete
} from "@api/rest";
import Link
    from "next/link";
import {useTranslation} from "react-i18next";
import style
    from './cart.module.scss';
import classnames
    from "classnames";
import ButtonPrimary
    from "@atoms/buttons/ButtonPrimary";
import ButtonText
    from "@atoms/buttons/ButtonText";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";
import {useRouter} from "next/router";

export default function Cart(props) {

    const router = useRouter();
    const {t} = useTranslation('common');
    const cart = useStore(state => state.cart);
    const isLoggedIn = useStore(state => state.isLoggedIn);
    const setCart = useStore.getState().setCart;

    const hasCoat = useStore(state => state.hasCoat);
    if(hasCoat) {
        router.replace('/appointment');
    }


    let orderID = 0;
    if (cart && cart.length > 0) {
        orderID = cart[0].order_id;
    }

    const maxNum: number = 20;

    useEffect(() => {
        restGet('cart?_format=json').then((res) => {
            setCart(res);
        });
    }, []);

    const handleCartItemQuantityChange = (itemID, Quantity) => {
        let data = {[itemID]: {"quantity": Quantity}}
        restPatch(`cart/${orderID}/items?_format=json`, data).then((res) => {
            restGet('cart?_format=json').then((res) => {
                setCart(res);
            });
        })
    };

    const handleCartItemRemove = (itemID) => {
        restDelete(`/cart/${orderID}/items/${itemID}?_format=json`).then((res) => {
            restGet('cart?_format=json').then((res) => {
                setCart(res);
            });
        })
    };

    let shippingFee = '';
    let promoCode = '';
    if(cart && cart.length > 0 && cart[0].order_items.length > 0) {
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

    return (
        <Layout globals={props.globals}>
            <div className={`mainWrapper`}>
            <div className={`section__inner`}>
                <h1 className={style.title}>{t('checkout.cart.title')}</h1>
                {cart && cart.length > 0 && cart[0].order_items.length > 0 &&
                <div>
                    <div className={style.cartWrapper}>
                        <div className={style.cartItems}>
                        <div className={classnames(style.row, style.rowHead)}>
                            <div className={classnames(style.column, style.image)}>&nbsp;</div>
                            <div className={classnames(style.column, style.details)}>&nbsp;</div>
                            <div className={classnames(style.column, style.quantity)}>{t('checkout.quantity')}</div>
                            <div className={classnames(style.column, style.subtotal)}>{t('checkout.subtotal')}</div>
                            <div className={classnames(style.column, style.remove)}>&nbsp;</div>
                        </div>
                        {cart[0].order_items.map(cartItem => (
                            <div className={classnames(style.row, style.cartItem)} key={`item-${cartItem.order_item_id}`}>
                                <div className={classnames(style.column, style.image)}>Image</div>
                                <div className={classnames(style.column, style.details)}>
                                    <h2>{cartItem.title}</h2>
                                </div>
                                <div className={classnames(style.column, style.quantity)}>
                                    <div className={style.selectWrapper}>
                                        <select
                                            className={style.quantitySelect}
                                            onChange={(e) => handleCartItemQuantityChange(cartItem.order_item_id, parseInt(e.target.value))}
                                            value={parseInt(cartItem.quantity)}
                                        >
                                            {Array.from(Array(maxNum)).map((e, i) => {
                                                i = i + 1;
                                                return (
                                                    <option key={`item_${cartItem.order_item_id}_${i}`} value={i}>{i}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className={classnames(style.column, style.subtotal)}>
                                    <span>{cartItem.total_price.formatted}</span>
                                </div>
                                <div className={classnames(style.column, style.remove)}>
                                    <div className={style.removeBtn}
                                        onClick={() => {
                                            if (parseInt(cartItem.quantity) > 0) {
                                                handleCartItemRemove(cartItem.order_item_id)
                                            }}}>&nbsp;</div>
                                </div>
                            </div>
                        ))}
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
                            <div className={style.total}>{cart[0].total_price.formatted}</div>
                        </div>
                    </div>

                    <div className={style.actionWrapper}>
                        <div>
                            <ButtonSecondary title={t('checkout.continue.shopping')} href={`/products`} isLeft={true}/>
                        </div>
                        <div>
                            {isLoggedIn &&
                            <ButtonPrimary title={t('checkout.checkout')} href={`/checkout/shipping`}/>
                            ||
                            <ButtonPrimary title={t('checkout.checkout')} href={`/checkout/login`}/>
                            }
                        </div>
                    </div>
                </div>
                ||
                <>
                    {t('checkout.cart.empty')}
                </>
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
})

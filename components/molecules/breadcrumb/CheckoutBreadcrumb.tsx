import style from './breadcrumb.module.scss';
import {useTranslation} from "next-i18next";


export default function CheckoutBreadcrumb({active}){

    const {t} = useTranslation('common');

    return (
        <div className={style.checkoutBreadcrumb}>
            <span className={(active === 'login') ? style.active : ''}>{t('checkout.breadcrumb.login')}</span>
            <span className={style.arrow}>&nbsp;</span>
            <span className={(active === 'delivery') ? style.active : ''}>{t('checkout.breadcrumb.delivery')}</span>
            <span className={style.arrow}>&nbsp;</span>
            <span className={(active === 'billing') ? style.active : ''}>{t('checkout.breadcrumb.billing')}</span>
        </div>
    )
}

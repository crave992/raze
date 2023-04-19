import Link from "next/link";
import {logOut} from "@api/auth";
import style from "./accountMenu.module.scss";
import {useRouter} from "next/router";
import classnames
    from "classnames";
import {useTranslation} from "next-i18next";
import {useState} from "react";
import {restPost} from "@api/rest";
import AlertPopupModal
    from "@molecules/popupModal/alertPopupModal";

export default function AccountMenu(){

    const router = useRouter();
    const {t} = useTranslation('common');
    const [alertShow, setAlertShow] = useState(false);

    const handleAlert = () => {
        setAlertShow(true);
    }

    const alertContent = {
        'title' : t('account.logout.confirm'),
        'btn': t('account.logout.confirmed')
    }

    return(
        <div>
            <ul className={style.accountMenu}>
                <li className={classnames(style.aboutMe, (router.asPath === '/account/me')?style.active:'')}>
                    <Link href="/account/me">
                        <a>{t(`account.me.title`)}</a>
                    </Link>
                </li>
                <li className={classnames(style.history, (router.asPath === '/account/order-history')?style.active:'')}>
                    <Link href="/account/order-history">
                        <a>{t(`account.history.title`)}</a>
                    </Link>
                </li>
                <li className={classnames(style.address, (router.asPath === '/account/addresses')?style.active:'')}>
                    <Link href="/account/addresses">
                        <a>{t(`account.address.title`)}</a>
                    </Link>
                </li>
                <li className={classnames(style.payment, (router.asPath === '/account/payment')?style.active:'')}>
                    <Link href="/account/payment">
                        <a>{t(`account.payment.title`)}</a>
                    </Link>
                </li>
                <li className={classnames(style.password, (router.asPath === '/account/password')?style.active:'')}>
                    <Link href="/account/password">
                        <a>{t(`account.password.title`)}</a>
                    </Link>
                </li>
                <li className={style.logout}>
                    <a onClick={() => handleAlert()}>{t(`account.logout.title`)}</a>
                </li>
            </ul>
            <AlertPopupModal show={alertShow} content={alertContent} alertAction={logOut} onHide={() => setAlertShow(false)}/>
        </div>
    )
}

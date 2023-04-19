import Layout
    from "@site/layout/Layout";
import withGlobalData
    from "@util/withGlobalData";
import useStore
    from "@store/store";
import {
    useEffect,
    useState
} from "react";
import {
    restDelete,
    restGet,
    restPatch
} from "@api/rest";
import Link
    from "next/link";
import LoginForm
    from "@site/forms/loginForm/LoginForm";
import RegisterWrapper
    from "@site/forms/RegisterWrapper";
import style
    from "./checkout.module.scss";
import {useTranslation} from "next-i18next";
import OrderSummary
    from "@molecules/orderSummary/OrderSummary";
import CheckoutBreadcrumb
    from "@molecules/breadcrumb/CheckoutBreadcrumb";
import classnames
    from "classnames";

export default function CheckoutLogin(props) {

    const [userAction, setUserAction] = useState('login');
    const {t} = useTranslation('common');

    useEffect(() => {
    }, []);

    return (
        <Layout globals={props.globals}>
            <div className={`mainWrapper`}>
            <div className={`section__inner`}>
                <h1 className={style.title}>{t('checkout.title')}</h1>
                <div className={style.checkoutWrapper}>
                    <div className={style.primary}>
                        <CheckoutBreadcrumb active={`login`}/>
                        <div className={style.checkoutHeadline}>
                            <h2 className={classnames(style.headline, style.login, (userAction === 'login') ? style.active : '')} onClick={() => setUserAction('login')}>
                                {t('login')}
                            </h2>
                            <h2 className={classnames(style.headline, style.register, (userAction === 'register') ? style.active : '')} onClick={() => setUserAction('register')}>
                                {t('register')}
                            </h2>
                        </div>
                        {userAction === 'login' &&
                        <LoginForm isCheckout={true}/>
                        || userAction === 'register' &&
                        <RegisterWrapper/>
                        }
                    </div>
                    <div className={style.secondary}>
                        <OrderSummary/>
                    </div>
                </div>
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

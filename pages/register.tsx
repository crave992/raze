import Layout
    from "@site/layout/Layout";
import withGlobalData
    from "@util/withGlobalData";
import RegisterWrapper
    from "@site/forms/RegisterWrapper";
import classnames
    from "classnames";
import Link
    from "next/link";
import Image
    from "next/image";
import background
    from "../assets/background.jpg";
import {useTranslation} from "react-i18next";
import useStore
    from "@store/store";
import {
    useEffect,
    useState
} from "react";
import style
    from './login.module.scss';

export default function Register(props) {

    const {t} = useTranslation('common');
    const [showSubTitle, setShowSubTitle] = useState(true);
    const [title, setTitle] = useState(t(`login.register`));
    const registeredEmail = useStore(state => state.registeredEmail);
    const emailVerified = useStore(state => state.emailVerified);

    useEffect(() => {
        if (registeredEmail && !emailVerified) {
            setTitle(t('login.activate.account'));
        }
        if (registeredEmail && emailVerified) {
            setTitle(t('login.registration.successful'));
        }
    }, [registeredEmail, emailVerified]);

    return (
        <Layout globals={props.globals}>
            <div className={`mainWrapper`}>
                <div className={style.login__container}>
                    <div className={style.login__wrapper}>
                        <div className={style.login__title__wrapper}>
                            <h1 className={style.login__title}>{title}</h1>
                            {showSubTitle &&
                            <h2 className={classnames(style.login__subtitle, style.login__login)}>
                                <Link href={`/login`}><a>{t(`login.login`)}</a></Link>
                            </h2>
                            }
                        </div>
                        <RegisterWrapper/>
                    </div>
                    <div className={style.login__background}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            position: 'relative'
                        }}>
                            <Image
                                src={background}
                                layout={`fill`}
                                objectFit={`cover`}
                            />
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

});

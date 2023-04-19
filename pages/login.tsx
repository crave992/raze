import Layout
    from "@site/layout/Layout";
import withGlobalData
    from "@util/withGlobalData";
import LoginForm
    from "@site/forms/loginForm/LoginForm";
import Image
    from "next/image";
import background
    from "../assets/background.jpg";
import {useTranslation} from "react-i18next";
import classnames
    from "classnames";
import Link
    from "next/link";
import style
    from './login.module.scss';

export default function Login(props) {

    const {t} = useTranslation('common');

    return (
        <Layout globals={props.globals}>
            <div className={`mainWrapper`}>
                <div className={style.login__container}>
                    <div className={style.login__wrapper}>
                        <div className={style.login__title__wrapper}>
                            <h1 className={style.login__title}>{t(`login.login`)}</h1>
                            <h2 className={classnames(style.login__subtitle, style.login__register)}>
                                <Link href={`/register`}><a>{t(`login.register`)}</a></Link>
                            </h2>
                        </div>
                        <LoginForm/>
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

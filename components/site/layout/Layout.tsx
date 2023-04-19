import Head
    from 'next/head';
import Header
    from "@site/header/Header";
import Footer
    from "@site/footer/Footer";
import style
    from "./layout.module.scss";
import {useRouter} from "next/router";
import {
    useEffect,
    useState
} from "react";



export default function Layout(props) {

    const router = useRouter();

    useEffect(() => {
        document.body.className ='';
        if(checkIsLoginSection()) {
            document.querySelector("body").classList.add(`isLoginSection`);
        }
        if(checkIsAccountSection()) {
            document.querySelector("body").classList.add(`isAccountSection`);
        }
        if(checkIsCheckoutProcess()) {
            document.querySelector("body").classList.add(`isCheckoutProcess`);
        }
    }, []);

    const checkIsLoginSection = () => {
        const target = ['/login', '/register', '/password'];
        return target.includes(router.asPath);
    }

    const checkIsAccountSection = () => {
        const target = ['/account/me', '/account/order-history', '/account/addresses', '/account/payment', '/account/password'];
        return target.includes(router.asPath);
    }

    const checkIsCheckoutProcess = () => {
        const target = ['/cart', '/checkout/login', '/checkout/payment', '/checkout/shipping', '/checkout/thankyou', '/appointment', '/appointment-confirmed'];
        return target.includes(router.asPath);
    }

    return (
        <>
            <Head>
                <link rel={`preload`} href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Zen+Kurenaido&display=swap"/>
                <link rel={`preconnect`} href="https://fonts.googleapis.com"/>
                <link rel={`preconnect`} href="https://fonts.gstatic.com"/>
            </Head>
            <div>
                <Header menu={props.globals && props.globals.mainMenu}/>
                <main className={style.main}>{props.children}</main>
                <Footer menu={props.globals && props.globals.footerMenu} footerContent={props.globals && props.globals.footerContent}/>
            </div>
        </>
    );
}

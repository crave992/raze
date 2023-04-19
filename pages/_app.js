import '../styles/globals.scss'
import {appWithTranslation} from 'next-i18next';
import useStore from "@store/store";
import Login from "./login";
import {
    useEffect,
    useState
} from "react";
import {restGet} from "@api/rest";
import {useRouter} from "next/router";

function MyApp({ Component, pageProps, mainMenu, footerMenu }) {

    const router = useRouter();
    const setCart = useStore.getState().setCart;
    const setUser = useStore.getState().setUser;
    const unsetUser = useStore.getState().unsetUser;
    const isLoggedIn = useStore.getState().isLoggedIn;
    const [userLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            const response = await restGet('rhm-load-user?_format=json');
            // console.log(response);
            if(response && response.name) {
                setUser(response.name, response.logoutToken);
            }
            else {
                unsetUser();
            }

            setUserLoaded(true);
        };
        const getOrder = async () => {
            const response = await restGet('cart?_format=json');
            if(response) {
                setCart(response);
            }
        };

        getUser();
        getOrder();
    })

    function AuthLogin() {

        useEffect(() => {
            router.replace('/login', undefined, { shallow: true })
        }, [])
        return <Login />
    }

    return(
        <>
            { pageProps.auth && !isLoggedIn && userLoaded &&
            <AuthLogin/>
            ||
            <Component {...pageProps} />
            }
        </>
    )
}
export default appWithTranslation(MyApp);

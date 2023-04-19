import ButtonPrimary from "@atoms/buttons/ButtonPrimary";
import FacebookProvider, { Login as FbLogin } from 'react-facebook-sdk';
import {restPost} from "@api/rest";
import useStore from "@store/store";
import GoogleLogin from "react-google-login";
import classnames
    from "classnames";
import style
    from "@atoms/buttons/buttons.module.scss";
import {useTranslation} from "react-i18next";

interface Props{
    handleResponse: (res: any) => void
}

export default function ButtonGoogleLogin({handleResponse} : Props) {

    const {t} = useTranslation('common');
    const goAppId = process.env.NEXT_PUBLIC_GO_APP_ID;
    const setUser = useStore(state => state.setUser);

    /**
     * Handles response from Google
     * @param response
     */
    const responseGoogle = (response) => {
        if(response && response.accessToken){
            restPost('user/login/google?_format=json', {
                'access_token': response.accessToken
            }).then((res) => {

                if(res.status === 200){
                    setUser({
                        name: res.json.current_user.name,
                        logoutToken: res.json.logout_token
                    });
                }

                handleResponse && handleResponse(res);
            });
        }
    };

    return(
        <GoogleLogin
            clientId={goAppId}
            render={renderProps => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className={classnames(style.social, style.google)}>{t(`Log in with Google`)}</button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )

}

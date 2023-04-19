import ButtonPrimary from "@atoms/buttons/ButtonPrimary";
import FacebookProvider, { Login as FbLogin } from 'react-facebook-sdk';
import {restPost} from "@api/rest";
import useStore from "@store/store";
import style
    from "@atoms/buttons/buttons.module.scss";
import classnames
    from "classnames";
import {useTranslation} from "react-i18next";


interface Props{
    handleResponse: (res: any) => void
}

export default function ButtonFacebookLogin({handleResponse} : Props){

    const {t} = useTranslation('common');
    const fbAppId = process.env.NEXT_PUBLIC_FB_APP_ID;
    const setUser = useStore(state => state.setUser);

    const handleFacebookResponse = (response) => {

        if(response && response.tokenDetail){
            restPost('user/login/facebook?_format=json', {
                'access_token': response.tokenDetail.accessToken
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
        <FacebookProvider appId={fbAppId}>
            <FbLogin
                scope="email"
                onResponse={handleFacebookResponse}
                onError={(e) => console.log(e)}
            >
                <button className={classnames(style.social, style.facebook)}>{t(`Login with Facebook`)}</button>
            </FbLogin>
        </FacebookProvider>
    )
}

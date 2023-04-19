import {
    logIn,
} from "@api/auth";
import ButtonFacebookLogin
    from "@atoms/buttons/ButtonFacebookLogin";
import ButtonGoogleLogin
    from "@atoms/buttons/ButtonGoogleLogin";
import TextInput
    from "@molecules/form/TextInput";
import validateEmail
    from "@util/validateEmail";
import VerifyTokenForm
    from "@site/forms/verifyTokenForm/VerifyTokenForm";
import {useForm} from "react-hook-form";
import {
    useRef,
    useState
} from "react";
import {useTranslation} from "react-i18next";
import useStore
    from "@store/store";
import {useRouter} from "next/router";
import style
    from "./loginForm.module.scss";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";
import ButtonText
    from "@atoms/buttons/ButtonText";
import classnames
    from "classnames";

interface Props {
    isCheckout?: boolean,
    onSuccess?: () => void,
    onError?: () => void
}

export default function LoginForm({
                                      isCheckout,
                                      onSuccess,
                                      onError
                                  }: Props) {

    const {t} = useTranslation('common');
    const user = useStore(state => state.user);
    const isLoggedIn = useStore(state => state.isLoggedIn);
    const [formError, setFormError] = useState(null);
    const [showTokenForm, setShowTokenForm] = useState(null);

    const router = useRouter();

    const {
        control,
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm();

    const email = useRef({});
    email.current = watch("email", "");
    const password = useRef({});
    password.current = watch("password", "");

    /**
     * Handles response from Facebook
     * @param res
     */
    const responseSocial = (res) => {
        console.log(res);
        if (res.status !== 200) {
            setFormError(res.json.message);
        } else {

            // Redirect if on checkout process
            if (router.pathname === '/checkout/login') {
                router.replace('/checkout/shipping', undefined, {shallow: true})
            }
            else {
                router.replace('/', undefined, {shallow: true});
            }
        }
    };


    /**
     * Handles login form submission
     * @param data
     */
    const onSubmit = async (data) => {
        logIn(data.email, data.password).then((res) => {
            if (res.status !== 200) {
                setFormError(res.json.message);
                if (res.json.message === 'The user has not been activated or is blocked.') {
                    setShowTokenForm(true);
                }
            } else {

                // Redirect if on checkout process
                if (router.pathname === '/checkout/login') {
                    router.replace('/checkout/shipping', undefined, {shallow: true})
                }
                else {
                    router.replace('/', undefined, {shallow: true});
                }

                setFormError(null);
            }
        });
    };

    return (
        <>
            {!isLoggedIn && !showTokenForm &&
            <>
                <form className={classnames(style.loginForm, (isCheckout) ? style.checkout : '')} onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.column}>
                    <div className={style.form}>
                        <TextInput
                            control={control}
                            name={`email`}
                            label={t(`Email`)}
                            rules={{
                                required: true,
                                validate: {
                                    checkEmail: v => validateEmail(v)
                                }
                            }}
                        />

                        <TextInput
                            control={control}
                            name={`password`}
                            inputType={`password`}
                            label={t(`Password`)}
                            rules={{required: true}}
                        />

                        <div className={style.forget_password}>
                            <ButtonText title={t('Forgot password')} href={`/password`}></ButtonText>
                        </div>

                    </div>

                    <div className={style.or}>
                        <span>or</span>
                    </div>

                    <div className={style.social}>
                        <ButtonFacebookLogin handleResponse={responseSocial}/>
                        <ButtonGoogleLogin handleResponse={responseSocial}/>
                    </div>
                    </div>

                    <ButtonSecondary
                        onClick={handleSubmit(onSubmit)}
                        title={t('Continue')}
                    />

                </form>
            </>
            }

            {formError &&
            <div>{formError}</div>
            }

            {showTokenForm &&
            <VerifyTokenForm
                onSuccess={() => {
                    logIn(email.current, password.current);
                    setShowTokenForm(false)
                }}
            />
            }
        </>
    )
}

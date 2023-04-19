import Layout from "@site/layout/Layout";
import {useForm} from "react-hook-form";
import TextInput from "@molecules/form/TextInput";
import {useTranslation} from "react-i18next";
import ButtonPrimary from "@atoms/buttons/ButtonPrimary";
import {restPost} from "@api/rest";
import useStore from "@store/store";
import { useRouter } from 'next/router'
import Link from "next/link";
import withGlobalData from "@util/withGlobalData";
import style
    from "./login.module.scss";
import classnames
    from "classnames";
import LoginForm
    from "@site/forms/loginForm/LoginForm";
import Image
    from "next/image";
import background
    from "../assets/background.jpg";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";

export default function Password(props){

    const {control, register, setValue, handleSubmit, watch, formState: {errors}} = useForm();
    const {t} = useTranslation('common');
    const setRegisteredEmail = useStore(state => state.setRegisteredEmail);
    const router = useRouter();

    const onSubmit = (data) => {
      restPost('user/lost-password?_format=json', {
        mail: data.email
      }).then((res) => {
          if(res.status === 200){
              setRegisteredEmail(data.email);
              router.push('/password/reset');
          }
      })
    };

    return (
        // <Layout globals={props.globals}>
        //     <div className="section__inner">
        //         <h1>Forgot Password</h1>
        //
        //     </div>
        // </Layout>
        <Layout globals={props.globals}>
            <div className={`mainWrapper`}>
                <div className={style.login__container}>
                    <div className={style.login__wrapper}>
                        <div className={style.login__title__wrapper}>
                            <h1 className={style.login__title}>{t(`login.forgot.password`)}</h1>
                        </div>
                        <form className={style.passwordForm} onSubmit={handleSubmit(onSubmit)}>
                            <p>{t('login.forgot.text')}</p>
                            <TextInput
                                control={control}
                                name={`email`}
                                inputType={`email`}
                                label={t(`Email Address`)}
                                rules={{
                                    required: true
                                }}
                            />
                            <ButtonSecondary
                                onClick={handleSubmit(onSubmit)}
                                title={t('button.continue')}
                            />
                        </form>
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
    return {props, revalidate: 5}

});

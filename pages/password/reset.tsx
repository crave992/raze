import Layout from "@site/layout/Layout";
import {useForm} from "react-hook-form";
import TextInput from "@molecules/form/TextInput";
import {useTranslation} from "react-i18next";
import ButtonPrimary from "@atoms/buttons/ButtonPrimary";
import {restPost} from "@api/rest";
import useStore from "@store/store";
import {useRef, useState} from "react";
import {useRouter} from "next/router";
import withGlobalData from "@util/withGlobalData";

export default function Reset(props){

    const {control, register, setValue, handleSubmit, watch, formState: {errors}} = useForm();
    const {t} = useTranslation('common');
    const registeredEmail = useStore(state => state.registeredEmail);
    const [formError, setFormError] = useState(null);
    const password = useRef({});
    password.current = watch("password", "");
    const router = useRouter();


    const onSubmit = (data) => {
        restPost('user/lost-password-reset?_format=json', {
            name: registeredEmail,
            temp_pass: data.code,
            new_pass: data.password
        }).then((res) => {
            console.log(res);
            if(res.status === 200){
                setFormError(null);
                router.push('/login')
            }else{
                setFormError(res.json.message);
            }

        });
    };

    return(
        <Layout mainMenu={props.mainMenu} footerMenu={props.footerMenu}>
            <div className="section__inner">
                <h1>Reset Password</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <p>Email: {registeredEmail}</p>
                    <TextInput
                        control={control}
                        name={`code`}
                        label={t(`Code`)}
                        rules={{
                            required: true
                        }}
                    />

                    <TextInput
                        control={control}
                        name={`password`}
                        inputType={`password`}
                        label={t(`Password`)}
                        rules={{
                            required: true,
                            minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                            },
                        }}
                    />

                    <TextInput
                        control={control}
                        name={`password_confirm`}
                        inputType={`password`}
                        label={t(`Confirm Password`)}
                        rules={{
                            required: true,
                            minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                            },
                            validate: value => value === password.current || "The passwords do not match"
                        }}
                    />

                    <ButtonPrimary
                        onClick={handleSubmit(onSubmit)}
                        title={t('Submit')}
                    />

                    {formError &&
                        <div>{formError}</div>
                    }

                </form>

            </div>
        </Layout>
    )

}

export const getStaticProps = withGlobalData(context => {

    const props = {auth: false};
    return {props, revalidate: 5}

});

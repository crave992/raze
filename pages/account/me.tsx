import Layout
    from "@site/layout/Layout";
import AccountLayout
    from "@site/layout/AccountLayout";
import withGlobalData
    from "@util/withGlobalData";
import {useTranslation} from "next-i18next";
import TextInput
    from "@molecules/form/TextInput";
import {useForm} from "react-hook-form";
import style
    from "./account.module.scss";
import classnames
    from "classnames";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";
import {
    useEffect,
    useState
} from "react";
import {
    restPost
} from "@api/rest";
import validateEmail
    from "@util/validateEmail";


const Me = (props) => {

    const {t} = useTranslation('common');
    const [userData, setUserData] = useState('');

    useEffect(() => {
        restPost('rhm-store/account/user?_format=json', {action:'get'}).then((res) => {
            setUserData(res.json);
        });
    }, []);

    const {
        control,
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm();

    if(userData) {
        setValue("name", userData['name']);
        setValue("email", userData['email']);
        setValue("phone", userData['phone']);
    }

    const onSubmit = async (formData) => {
        let data = {
            action: 'update',
            name: formData['name'],
            email: formData['email'],
            phone: formData['phone'],
        }
        restPost('rhm-store/account/user?_format=json', data).then((res) => {
            setUserData(res.json);
            console.log('updated');
        });
    }

    return (
        <Layout globals={props.globals}>
            <AccountLayout>
                <h1 className={style.title}>{t(`account.me.title`)}</h1>
                <div className={classnames(style.wrapper, style.aboutMe)}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.fieldset}>
                        <div className={style.input}>
                            <TextInput name={`name`} control={control} rules={{required: true}} label={t(`label.name`)}/>
                        </div>
                        <div className={style.input}>
                            <TextInput name={`email`} control={control} rules={{
                                required: true,
                                validate: {
                                    checkEmail: v => validateEmail(v)
                                }
                            }} label={t(`label.email`)}/>
                        </div>
                    </div>
                    <div className={style.input}>
                        <TextInput name={`phone`} control={control} rules={{
                            required: true,
                            maxLength: {
                                value: 9,
                                message: t('error.phone')
                            },
                        }} label={t(`label.phone`)}/>
                    </div>
                    <div className={style.submit}>
                        <ButtonSecondary title={t('button.update')} onClick={handleSubmit(onSubmit)}/>
                    </div>
                    </form>
                </div>
            </AccountLayout>
        </Layout>
    )
};

export const getStaticProps = withGlobalData(context => {

    const props = {auth: true};
    return {
        props,
        revalidate: 5
    }

});

export default Me;

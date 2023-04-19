import useStore from "@store/store";
import {useForm} from "react-hook-form";
import TextInput from "@molecules/form/TextInput";
import {useTranslation} from "react-i18next";
import ButtonPrimary from "@atoms/buttons/ButtonPrimary";
import {restPost} from "@api/rest";
import {useState} from "react";


export default function SetPasswordForm(){

    const {control, register, setValue, handleSubmit, watch, formState: {errors}} = useForm();
    const {t} = useTranslation('common');

    const onSubmit = (data) => {

    };

    return(
        <form onSubmit={handleSubmit(onSubmit)}>

            <p>Please set your password</p>

            <TextInput
                control={control}
                name={`password`}
                label={t(`Password`)}
                inputType={`password`}
                rules={{
                    required: true
                }}
            />
            <TextInput
                control={control}
                name={`password_confirm`}
                label={t(`Confirm Password`)}
                inputType={`password`}
                rules={{
                    required: true
                }}
            />

            <ButtonPrimary
                onClick={handleSubmit(onSubmit)}
                title={t('Submit')}
            />

        </form>
    )
}
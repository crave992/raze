import useStore from "@store/store";
import {useForm} from "react-hook-form";
import TextInput from "@molecules/form/TextInput";
import {useTranslation} from "react-i18next";
import ButtonPrimary from "@atoms/buttons/ButtonPrimary";
import {restPost} from "@api/rest";
import {useState} from "react";
import style from "./verifyTokenForm.module.scss";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";
import ButtonText
    from "@atoms/buttons/ButtonText";

interface Props{
    onSuccess?: Function
}

export default function VerifyTokenForm({onSuccess}: Props){

    const registeredEmail = useStore(state => state.registeredEmail);
    const setEmailVerified = useStore(state => state.setEmailVerified);
    const {control, register, setValue, handleSubmit, watch, formState: {errors}} = useForm();
    const {t} = useTranslation('common');
    const [formError, setFormError] = useState(null);

    const onSubmit = (data) => {

        restPost('rest/verify-account?_format=json', {
            "name": registeredEmail,
            "temp_token": data.token
        }).then((res) => {
            if(res.status === 200){
                setEmailVerified(true);
                onSuccess && onSuccess();
            }else{
                setEmailVerified(false);
                setFormError(res.json.message);
            }
        });

    };

    const resendEmail = () => {
      restPost('rest/resend-token', {
          'mail': registeredEmail
      }) .then((res) => {
          console.log(res);
      })
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)}>

            <p>Please enter the 6-digit activation code to your registered email</p>
            {registeredEmail &&
                <strong>{registeredEmail}</strong>
            }

            <div className={style.codeInput}>
            <TextInput
                control={control}
                name={`token`}
                label={`Activation code`}
                rules={{
                    required: true
                }}
            />
            </div>

            <div className={style.resendEmail}>
                Can't receive the activation code :
                <ButtonText title={`Resend Email`} onClick={resendEmail}/>
            </div>

            <ButtonSecondary
                onClick={handleSubmit(onSubmit)}
                title={t('Continue')}
            />

            {formError &&
                <div>{formError}</div>
            }

        </form>
    )
}

import TextInput
    from "@molecules/form/TextInput";
import validateEmail
    from "@util/validateEmail";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {
    useRef,
    useState
} from "react";
import {restPost} from "@api/rest";
import useStore
    from "@store/store";
import style
    from "./registrationForm.module.scss";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";
import Checkbox
    from "@molecules/form/Checkbox";
import {formatDate} from "@util/helper";

interface Props {
    onSuccess?: () => void,
    onError?: () => void
}

export default function RegistrationForm({onSuccess, onError}: Props) {

    const {
        control,
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm();

    const {t} = useTranslation('common');
    const [formError, setFormError] = useState(null);
    const setRegisteredEmail = useStore(state => state.setRegisteredEmail);
    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = (data) => {

        console.log(data);

        restPost('rest/create-account?_format=json', {
            "mail": data.email,
            "pass": data.password,
            "field_name": data.name,
            "field_phone": data.phone,
            "field_date_of_birth": data.dob,
            "field_receive_news_offers": data.offers
        }).then(res => {
            if (res.status === 200) {
                setRegisteredEmail(data.email);
                onSuccess && onSuccess();
            } else {

                setFormError(res.json.message);
                onError && onError();
            }
        });
    };

    let today:any = new Date();
    let minYear:any = new Date();
    minYear = minYear.setFullYear( minYear.getFullYear() - 100 );

    return (
        <form className={style.registerForm} onSubmit={handleSubmit(onSubmit)}>

            <div className={style.fieldset}>

                <TextInput
                    control={control}
                    name={`name`}
                    label={t('label.name')}
                    rules={{
                        required: true
                    }}
                />

                <TextInput
                    control={control}
                    name={`email`}
                    label={t('label.email')}
                    rules={{
                        required: true,
                        validate: {
                            checkEmail: v => validateEmail(v)
                        }
                    }}
                />

            </div>

            <div className={style.fieldset}>

                <TextInput
                    label={t('label.phone')}
                    control={control}
                    name={`phone`}
                    inputType="number"
                    rules={{
                        required: true,
                        maxLength: {
                            value: 9,
                            message: t('error.phone')
                        },
                    }}
                />

                <TextInput
                    label={t('label.birth')}
                    control={control}
                    name={`dob`}
                    placeholder={t('label.day')}
                    inputType="date"
                    min={formatDate(minYear)}
                    max={formatDate(today)}
                    rules={{
                        required: true
                    }}
                />

            </div>

            <div className={style.fieldset}>

                <TextInput
                    control={control}
                    name={`password`}
                    label={t(`label.password`)}
                    inputType={`password`}
                    rules={{
                        required: true,
                        minLength: {
                            value: 8,
                            message: t('error.password')
                        }
                    }}
                />

                <TextInput
                    control={control}
                    name={`password_confirm`}
                    label={t(`label.password.Re`)}
                    inputType={`password`}
                    rules={{
                        required: true,
                        minLength: {
                            value: 8,
                            message: t('error.password')
                        },
                        validate: value => value === password.current || t('error.password.notMatch')
                    }}
                />

            </div>

            <Checkbox
                control={control}
                name={`offers`}
                label={t(`label.offers`)}
                rules={{required: false}}
                />

            <Checkbox
                control={control}
                name={`tnc`}
                label={t(`label.policy`)}
                rules={{required: t('error.required')}}
            />

            {formError &&
            <div>
                {formError}
            </div>
            }

            <ButtonSecondary
                onClick={handleSubmit(onSubmit)}
                title={t('button.continue')}
            />


        </form>
    )
}

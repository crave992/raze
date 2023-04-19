import style
    from './contact-us.module.scss';
import classnames
    from "classnames";
import TextInput
    from "@molecules/form/TextInput";
import {useForm} from "react-hook-form";
import {restPost} from "@api/rest";
import {useTranslation} from "next-i18next";
import ButtonPrimary
    from "@atoms/buttons/ButtonPrimary";
import validateEmail
    from "@util/validateEmail";
import {useState} from "react";

type Props = {
    section: {
        field_title: string,
    }
}

export default function ContactUs(props: Props) {

    let content = props['section'];
    const {t} = useTranslation('common');
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const {
        control,
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm();

    const onSubmit = async (formData) => {
        let data = {
            name: formData['name'],
            phone: formData['phone'],
            email: formData['email'],
            clientType: formData['clientType'],
            enquiry: formData['enquiry'],
        }
        setSubmitSuccess(false);
        restPost('rhm-contact-us-form?_format=json', data).then((res) => {
            setSubmitSuccess(true);
        });
    }

    return (
        <section className={style.contactUs}>
            <div className={`section__inner`}>
                <div className={style.wrapper}>
                    <div className={style.content}>
                        <h2 className={classnames(`section__title_2`, `white`)}>{content['field_title']}</h2>
                        <div className={`rotateCircle`}></div>
                    </div>
                    <div className={style.form}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={`fieldSet`}>
                                <TextInput name={`name`} control={control} rules={{required: true}} label={t(`label.name`)} color={`white`}/>
                                <TextInput name={`phone`} control={control} rules={{
                                    required: true,
                                    maxLength: {
                                        value: 9,
                                        message: t('error.phone')
                                    },
                                }} label={t(`label.phone`)} color={`white`}/>
                            </div>
                            <div className={`fieldSet`}>
                                <TextInput name={`email`} control={control} rules={{
                                    required: true,
                                    validate: {
                                        checkEmail: v => validateEmail(v)
                                    }
                                }} label={t(`label.email`)} color={`white`}/>
                                <div className={classnames(`selectField`, `white`)}>
                                    <label>{t(`label.contact.clientType`)}</label>
                                    <div className={`selectWrapper`}>
                                        <select
                                            {...register('clientType', {required: true})}
                                        >
                                            <option value={``}>{t('label.select')}</option>
                                            <option key={`resident`} value={`Resident`}>{t(`label.contact.type.resident`)}</option>
                                            <option key={`business`} value={`Business`}>{t(`label.contact.type.business`)}</option>
                                        </select>
                                    </div>
                                    <div className={`formError`}>{errors.clientType?.type === 'required' && t('error.required.clientType')}</div>
                                </div>
                            </div>
                            <div className={classnames(`textareaField`, `white`)}>
                                <label>{t(`label.contact.enquiry`)}</label>
                                <textarea {...register('enquiry', {required: true})} placeholder={`label.contact.enquiry.placeholder`}></textarea>
                                <div className={`formError`}>{errors.enquiry?.type === 'required' && t('error.required.enquiry')}</div>
                            </div>

                            <div className={style.submit}>
                                <ButtonPrimary title={t('button.send')} onClick={handleSubmit(onSubmit)} color={`white`}/>
                                {submitSuccess &&
                                <div className={`formSuccess`}>{t('success.contact')}</div>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

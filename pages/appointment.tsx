import style
    from "./appointment.module.scss";
import Layout
    from "@site/layout/Layout";
import {useTranslation} from "react-i18next";
import withGlobalData
    from "@util/withGlobalData";
import BookingSummary
    from "@molecules/bookingSummary/BookingSummary";
import TextInput
    from "@molecules/form/TextInput";
import {useForm} from "react-hook-form";
import validateEmail
    from "@util/validateEmail";
import addressJSON
    from 'addressfield.min.json';
import {useState} from "react";
import ButtonPrimary
    from "@atoms/buttons/ButtonPrimary";
import useStore
    from "@store/store";
import {restPost} from "@api/rest";
import {useRouter} from "next/router";

export default function Appointment(props) {
    const {t} = useTranslation('common');
    const router = useRouter();
    const [district, setDistrict] = useState('');
    const coatingDate1 = useStore(state => state.coatingDate1);
    const coatingDate2 = useStore(state => state.coatingDate2);
    const coatingType = useStore(state => state.coatingType);
    const [disableBtn, setDisableBtn] = useState(false);

    console.log(coatingType);
    console.log(coatingDate1);
    console.log(coatingDate2);

    const {
        control,
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm();

    let availableAddress = addressJSON.options.find(address => {
        return address.iso === 'HK';
    });

    const selectDistrict = (val) => {
        setDistrict(val);
    }

    const onSubmit = async data => {
        setDisableBtn(true);
        data.type = coatingType;
        data.preferred_1 = coatingDate1;
        data.preferred_2 = coatingDate2;
        restPost('rhm-store/appointment?_format=json', data).then((res) => {
            if(res.json === 200) {
                router.push(`/appointment-confirmed`);
            }
        });
    };

    return (
        <Layout globals={props.globals}>
            <div className={`mainWrapper`}>
                <div className={`section__inner`}>
                    <h1 className={style.title}>{t('appointment.title')}</h1>
                    <div className={style.wrapper}>
                        <div className={style.primary}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={style.group}>
                                    <h2 className={style.headline}>{t('appointment.details.headline')}</h2>
                                    <div className={`fieldSet`}>
                                        <TextInput
                                            control={control}
                                            name={`full_name`}
                                            label={t(`label.name`)}
                                            rules={{required: true}}
                                        />
                                        <TextInput name={`email`} control={control} rules={{
                                            required: true,
                                            validate: {
                                                checkEmail: v => validateEmail(v)
                                            }
                                        }} label={t(`label.email`)}/>
                                    </div>
                                    <div className={`fieldSet`}>
                                        <TextInput name={`phone`} control={control} rules={{
                                            required: true,
                                            maxLength: {
                                                value: 9,
                                                message: t('error.phone')
                                            },
                                        }} label={t(`label.phone`)}/>
                                    </div>
                                </div>
                                <div className={style.group}>
                                    <h2 className={style.headline}>{t('appointment.address.headline')}</h2>
                                    <TextInput
                                        control={control}
                                        name={`company`}
                                        label={t(`label.company`)}
                                        rules={{required: false}}
                                    />
                                    <TextInput
                                        control={control}
                                        name={`address`}
                                        label={t(`label.address`)}
                                        rules={{required: true}}
                                    />
                                    <div className={`fieldSet`}>
                                        <TextInput
                                            control={control}
                                            name={`apartment`}
                                            label={t(`label.apartment`)}
                                            rules={{required: false}}
                                        />
                                        <div className={`selectField`}>
                                            <label>{t(`label.district`)}</label>
                                            <div className={`selectWrapper`}>
                                                <select
                                                    value={district}
                                                    {...register('district', {required: true})}
                                                    onChange={(e) => selectDistrict(e.target.value)}
                                                >
                                                    {availableAddress['fields'][2]['locality'][1]['administrativearea']['options'].map(option => (
                                                        <option value={Object.keys(option)}>{Object.values(option)}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className={`formError`}>{errors.district?.type === 'required' && t('error.required')}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.actionWrapper}>
                                    <ButtonPrimary title={(disableBtn) ? t('appointment.processing') : t('appointment.confirm')} onClick={handleSubmit(onSubmit)}/>
                                </div>
                            </form>
                        </div>
                        <div className={style.secondary}>
                            <BookingSummary/>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const getStaticProps = withGlobalData(context => {

    const props = {auth: false};
    return {
        props,
        revalidate: 5
    }
})

import style
    from './addressModal.module.scss'
import classnames
    from "classnames";
import Image
    from "next/image";
import {Modal} from "react-bootstrap";
import {useTranslation} from "next-i18next";
import addressJSON
    from 'addressfield.min.json';
import {
    useEffect,
    useState
} from "react";
import TextInput
    from "@molecules/form/TextInput";
import {useForm} from "react-hook-form";
import {
    restGet,
    restPost
} from "@api/rest";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";

export default function AddressPopupModal(props) {

    const modalContent = props.content;
    const {t} = useTranslation('common');
    const [country, setCountry] = useState('');
    const [addressFields, setAddressFields] = useState([]);
    const [region, setRegion] = useState('');

    const selectCountry = (val) => {
            setCountry(val);
            setAddressFields(null);
            addressJSON.options.map(option => {
                if (option.iso === val) {
                    setAddressFields(option.fields);
                }
            });
    }

    const selectRegion = (val) => {
        setRegion(val);
    }

    const {
        control,
        register,
        setValue,
        handleSubmit,
        reset,
        watch,
        formState: {errors}
    } = useForm();

    let headline = t('account.address.new');
    if(modalContent && modalContent['action'] === 'update') {
        headline = t('account.address.update');
    }
    useEffect(()=> {
        if(modalContent) {
            if(modalContent['action'] === 'update') {
                setValue("family_name", modalContent['details']['address']['family_name']);
                setValue("given_name", modalContent['details']['address']['given_name']);
                setValue("company", modalContent['details']['address']['organization']);
                setValue("country",  modalContent['details']['address']['country_code']);
                setValue("address", modalContent['details']['address']['address_line1']);
                setValue("city", modalContent['details']['address']['locality']);
                setValue("region", modalContent['details']['address']['administrative_area']);
                setValue("postal_code",  modalContent['details']['address']['postal_code']);
                selectCountry(modalContent['details']['address']['country_code']);
                selectRegion(modalContent['details']['address']['administrative_area']);
            }
            else {
                setValue("family_name", '');
                setValue("given_name", '');
                setValue("company", '');
                setValue("country",  '');
                setValue("address", '');
                setValue("city", '');
                setValue("region",'');
                setValue("postal_code",  '');
                selectCountry('');
                selectRegion('');
            }
        }
    }, [modalContent]);

    const onSubmit = async data => {
        data.action = modalContent['action'];

        if(modalContent['action'] === 'update') {
            data.id = modalContent['details']['id'];
            restPost('rhm-store/account/address?_format=json', data).then(res => {
                if(res.json === 200) {
                    props.onHide();
                }
            });
        }
        else {
            restPost('rhm-store/address/save?_format=json', data).then(res => {
                if(res.json === 200) {
                    props.onHide();
                }
            });
        }
    };

    return (
        <Modal
            {...props}
            size="xl"
            centered>
            <>
                <Modal.Body>
                    <div className={style.addressPopupModal}>
                        <h3 className={style.headline}>{headline}</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={`fieldSet`}>
                                <TextInput
                                    control={control}
                                    name={`family_name`}
                                    label={t(`label.lastName`)}
                                    rules={{required: true}}
                                />
                                <TextInput
                                    control={control}
                                    name={`given_name`}
                                    label={t(`label.firstName`)}
                                    rules={{required: true}}
                                />
                            </div>
                            <TextInput
                                control={control}
                                name={`company`}
                                label={t(`label.company`)}
                                rules={{required: false}}
                            />
                            <div className={`selectField`}>
                                <label>{t(`label.country`)}</label>
                                <div className={`selectWrapper`}>
                                    <select
                                        value={country}
                                        {...register('country', {required: true})}
                                        onChange={(e) => selectCountry(e.target.value)}
                                    >
                                        <option value={``}>{t('label.country.select')}</option>
                                        {addressJSON.options.map(option => (
                                            <option key={option.iso} value={option.iso}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={`formError`}>{errors.country?.type === 'required' && t('error.required.country')}</div>
                            {addressFields &&
                            <>
                                {addressFields.map(field => (
                                    <>
                                        {field.thoroughfare &&
                                        <TextInput
                                            control={control}
                                            name={`address`}
                                            label={t(`label.address`)}
                                            rules={{required: true}}
                                        />
                                        }
                                        {field.locality && field.locality.map(localityField => (
                                            <>
                                                {localityField.localityname &&
                                                <TextInput
                                                    control={control}
                                                    name={`city`}
                                                    label={t(`label.city`)}
                                                    rules={{required: false}}
                                                />
                                                }
                                                {localityField.administrativearea && localityField.administrativearea.options &&
                                                <div className={`selectField`}>
                                                    <label>{t(`label.state`)}</label>
                                                    <div className={`selectWrapper`}>
                                                        <select
                                                            value={region}
                                                            {...register('region', {required: true})}
                                                            onChange={(e) => selectRegion(e.target.value)}
                                                        >
                                                            {localityField.administrativearea.options.map(option => (
                                                                <option value={Object.keys(option)}>{Object.values(option)}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className={`formError`}>{errors.region?.type === 'required' && t('error.required.region')}</div>
                                                </div>
                                                }
                                                {localityField.postalcode &&
                                                <div className={`fieldSet`}>
                                                    <TextInput
                                                        control={control}
                                                        name={`postal_code`}
                                                        label={t(`label.postal`)}
                                                        rules={{required: true}}
                                                    />
                                                </div>
                                                }
                                            </>
                                        ))}
                                    </>
                                ))}
                            </>
                            }
                            <div className={style.actionWrapper}>
                            <ButtonSecondary title={t('button.save')} onClick={handleSubmit(onSubmit)}/>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </>
        </Modal>
    )
}

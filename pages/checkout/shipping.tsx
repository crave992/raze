import Layout
    from "@site/layout/Layout";
import withGlobalData
    from "@util/withGlobalData";
import useStore
    from "@store/store";
import {
    useEffect,
    useState
} from "react";
import {
    restGet,
    restPost
} from "@api/rest";
import {
    useForm,
    Controller
} from 'react-hook-form';
import TextInput
    from "@molecules/form/TextInput";
import {useTranslation} from "react-i18next";
import addressJSON
    from 'addressfield.min.json';
import classnames
    from "classnames";
import {useRouter} from "next/router";
import OrderSummary
    from "@molecules/orderSummary/OrderSummary";
import style
    from './checkout.module.scss';
import CheckoutBreadcrumb
    from "@molecules/breadcrumb/CheckoutBreadcrumb";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";
import AddressFormat
    from "@molecules/cards/address/AddressFormat";

export default function CheckoutShipping(props) {

    const {t} = useTranslation('common');
    const router = useRouter();
    const setCart = useStore.getState().setCart;
    const setShippingAddress = useStore.getState().setShippingAddress;
    const [country, setCountry] = useState('');
    const [addressFields, setAddressFields] = useState([]);
    const [region, setRegion] = useState('');
    const [clientAddresses, setClientAddresses] = useState(null);
    const [showNewAddress, setShowNewAddress] = useState(false);
    const shippingAddress = useStore(state => state.shippingAddress);

    const hasCoat = useStore(state => state.hasCoat);
    if(hasCoat) {
        router.replace('/appointment');
    }

    useEffect(() => {
        restGet('rhm-store/address/get?_format=json').then((res) => {
            if (res && res.length) {
                setShowNewAddress(false);
                setClientAddresses(res);
                res.map(address => {
                    if (address.isDefault == 1) {
                        // setBillingAddress(address.details);
                        handleShipping(address.details.address.country_code, address).then(() => {
                            setShippingAddress(address.details);
                        });
                    }
                });
            } else {
                setShowNewAddress(true);
            }
        });
    }, []);

    const {
        control,
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm({
        defaultValues: {
            company: '',
            country: '',
            address: '',
            city: '',
            region: '',
            postal_code: ''
        }
    });

    const handleShipping = async (country, address = null) => {
        restPost('rhm-store/shipping?_format=json', {country, address}).then(res => {
            restGet('cart?_format=json').then((res) => {
                setCart(res);
            });
        });
    }

    const handleAddressChange = (address) => {
        handleShipping(address.details.address.country_code, address).then(() => {
            setShippingAddress(address.details);
        });
    }

    const selectCountry = (val) => {
        handleShipping(val).then(() => {
            setCountry(val);
            setAddressFields(null);
            addressJSON.options.map(option => {
                if (option.iso === val) {
                    setAddressFields(option.fields);
                }
            });
        });
    }

    const selectRegion = (val) => {
        setRegion(val);
    }

    const onSubmit = async data => {
        restPost('rhm-store/address/save?_format=json', data).then(res => {
            restGet('rhm-store/address/get?_format=json').then((res) => {
                if (res && res.length) {
                    setClientAddresses(res);
                    if (res) {
                        res.map(address => {
                            if (address.isDefault == 1) {
                                handleShipping(address.details.address.country_code, address).then( ()=> {
                                    handleAddressChange(address);
                                    handleContinueCheckout();
                                });
                            }
                        });
                    }
                }
            });
        });
    };

    const handleContinueCheckout = () => {
        if (shippingAddress) {
            router.replace('/checkout/payment', undefined, {shallow: false});
        } else {
            alert('No address selected');
        }
    }

    return (
        <Layout globals={props.globals}>
            <div className={`mainWrapper`}>
            <div className={`section__inner`}>
                <h1 className={style.title}>{t('checkout.title')}</h1>
                <div className={style.checkoutWrapper}>
                    <div className={style.primary}>
                        <CheckoutBreadcrumb active={`delivery`}/>
                        {shippingAddress && clientAddresses && clientAddresses.length > 0 &&
                        <>
                            <div className={style.checkoutHeadline}>
                                <h2 className={style.headline}>{t('checkout.delivery.headline')}</h2>
                            </div>
                            <div className={style.addresses}>
                                {clientAddresses.map(address => {
                                    let addressContent = address.details.address;
                                    return (
                                        <div onClick={() => handleAddressChange(address)}
                                            className={classnames(style.address, (shippingAddress.id == address.details.id && style.selected))} key={`address-${address.details.id}`}>
                                            <AddressFormat address={addressContent}/>
                                        </div>
                                    )
                                })}
                            </div>
                            {!showNewAddress &&
                            <div
                                className={style.btnAddAddress}
                                onClick={() => setShowNewAddress(true)}
                            >
                                {t('checkout.delivery.add')}
                            </div>
                            }
                        </>
                        }
                        {showNewAddress &&
                        <div className={style.newAddress}>
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
                                            <option value={``}>{t('select_country')}</option>
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
                            </form>
                        </div>
                        }
                        <div className={style.actionWrapper}>
                            {showNewAddress &&
                            <ButtonSecondary
                                onClick={handleSubmit(onSubmit)}
                                title={t('checkout.continue1')}
                            />
                            ||
                            <ButtonSecondary
                                onClick={() => handleContinueCheckout()}
                                title={t('checkout.continue2')}
                            />
                            }
                        </div>
                    </div>
                    <div className={style.secondary}>
                        <OrderSummary/>
                    </div>
                </div>
            </div>
            </div>
        </Layout>
    )
}

export const getStaticProps = withGlobalData(context => {

    const props = {auth: true};
    return {
        props,
        revalidate: 5
    }
})

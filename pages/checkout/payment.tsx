import {useTranslation} from 'react-i18next';
import withGlobalData
    from "@util/withGlobalData";
import useStore
    from "@store/store";
import {
    useEffect,
    useState,
} from "react";
import {
    useForm,
} from 'react-hook-form';
import {
    loadStripe
} from '@stripe/stripe-js';
import {
    Elements,
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    CardElement
} from '@stripe/react-stripe-js';
import {
    restGet,
    restPost
} from "@api/rest";
import Layout
    from "@site/layout/Layout";
import {useRouter} from 'next/router';
import TextInput
    from "@molecules/form/TextInput";
import style
    from "./checkout.module.scss";
import CheckoutBreadcrumb
    from "@molecules/breadcrumb/CheckoutBreadcrumb";
import OrderSummary
    from "@molecules/orderSummary/OrderSummary";
import classnames
    from "classnames";
import AddressFormat
    from "@molecules/cards/address/AddressFormat";
import addressJSON
    from "../../addressfield.min.json";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";


const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY;
const stripePromise = loadStripe(stripeKey);

const CheckoutForm = (props) => {

    const {t} = useTranslation('common');
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();

    const cart = useStore(state => state.cart);
    const shippingAddress = useStore(state => state.shippingAddress);

    const setCart = useStore.getState().setCart;
    const setShippingAddress = useStore.getState().setShippingAddress;

    const [errorMsg, setErrorMsg] = useState(null);
    const [disableBtn, setDisableBtn] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [isNewCard, setIsNewCard] = useState(true);
    const [cardDetails, setCardDetails] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        restGet('rhm-store/cards/get?_format=json').then((res) => {
            if (res && res.length) {
                setCardDetails(res);
                setIsNewCard(false);
            } else {
                setIsNewCard(true);
                setIsLoading(false);
            }
        });
    }, []);

    useEffect(() => {
        if (cardDetails) {
            let hasDefaultCard = cardDetails.find(element => {
                if (element.isDefault == 1) {
                    setSelectedCard(element.details.token);
                }
            });

            if (!hasDefaultCard) {
                setSelectedCard(cardDetails[0].details.token);
            }

            setIsLoading(false);
        }
    }, [cardDetails]);

    const {
        control,
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm();

    const handleSelectCard = (token) => {
        if (token) {
            setSelectedCard(token);
            setIsNewCard(false);
        } else {
            setSelectedCard([]);
            setIsNewCard(true);
        }
    }

    const handleCardSubmit = async (data, billingAddress) => {

        let customData = {
            name: data.name_on_card,
            address_line1: billingAddress.address.address_line1,
            address_city: billingAddress.address.locality,
            address_country: billingAddress.address.country_code
        };

        const card = elements.getElement(CardNumberElement);
        const result = await stripe.createToken(card, customData);

        if (result.error) {
            // Show error to your customer.
            setErrorMsg(result.error.message);
            return false;
        } else {
            setErrorMsg('token:' + JSON.stringify(result));
            return result.token;
        }
    };

    const onSubmit = async (data) => {
        setDisableBtn(true);
        let billingAddress = setBillingAddress();
        if (billingAddress) {
            handleCardSubmit(data, billingAddress).then((token) => {
                // todo: handle errors
                if (token) {
                    data.token = token;
                    data.shippingAddress = shippingAddress;
                    data.billingAddress = billingAddress;
                    data.isNewCard = isNewCard;
                    data.cartID = cart[0].order_id;
                    restPost(`rhm-store/stripe/checkout`, data).then((res) => {
                        if (res.json === 200) {
                            // Clear data and redirect to thank you page
                            setCart(null);
                            setShippingAddress(null);
                            router.replace('/checkout/thankyou', undefined, {shallow: true})
                        }
                    })
                } else {
                    setDisableBtn(false);
                }
            });
        }
    };

    const oldCardSubmit = async () => {
        setDisableBtn(true);
        let billingAddress = setBillingAddress();
        console.log(billingAddress);
        if(billingAddress) {
            let data = {
                'token' : selectedCard,
                'shippingAddress' : shippingAddress,
                'billingAddress' : billingAddress,
                'isNewCard' : isNewCard,
                'cartID' : cart[0].order_id,
            };
            console.log(data);
            restPost(`rhm-store/stripe/checkout`, data).then((res) => {
                console.log(res);
                if (res.json === 200) {
                    // Clear data and redirect to thank you page
                    // setCart(null);
                    // setShippingAddress(null);
                    // setBillingAddress(null);
                    router.replace('/checkout/thankyou', undefined, {shallow: true})
                }
            })
        }
    }

    const setBillingAddress = () => {

        if (!props.sameWithShipping) {
            let familyName = document.getElementById('family_name')['value'];
            let givenName = document.getElementById('given_name')['value'];
            let company = document.getElementById('company')['value'];
            let country = document.getElementById('country')['value'];

            if (!familyName) {
                props.errorData('familyName');
                setDisableBtn(false);
                return;
            }

            if (!givenName) {
                props.errorData('givenName');
                setDisableBtn(false);
                return;
            }

            if (!country) {
                props.errorData('country');
                setDisableBtn(false);
                return;
            }

            let address = document.getElementById('address')['value'];
            if (!address) {
                props.errorData('address');
                setDisableBtn(false);
                return;
            }

            let city = '';
            if (document.getElementById('city')) {
                city = document.getElementById('city')['value'];
            }

            let region = '';
            if (document.getElementById('region')) {
                region = document.getElementById('region')['value'];
            }

            let postal_code = '';
            if (document.getElementById('postal_code')) {
                postal_code = document.getElementById('postal_code')['value'];
            }

            return {
                'id': 0,
                'address': {
                    'address_line1': address,
                    'administrative_area': region,
                    'country_code': country,
                    'family_name': familyName,
                    'given_name': givenName,
                    'locality': city,
                    'organization': company,
                    'postal_code': postal_code
                }
            }
        } else {
            return shippingAddress;
        }
    }

    return (
        <>
            {!isLoading &&
            <>
                <div className={style.paymentMethods}>
                    {cardDetails && cardDetails.map(card => {
                        let cardContent = card.details;
                        return (
                            <div onClick={() => handleSelectCard(card.details.token)} className={classnames(style.option, (selectedCard === card.details.token) ? style.selected : '')}>
                                <div className={style.brand}>{cardContent['brand']}</div>
                                <div className={style.details}>
                                    {cardContent['name'] &&
                                    <p className={style.name}>{cardContent['name']}</p>
                                    }
                                    <p className={style.cardNumber}>XXXX-XXXX-XXXX-{cardContent['last4']}</p>
                                    <p className={style.expiry}>{cardContent['exp_month']}/{cardContent['exp_year']}</p>
                                </div>
                            </div>
                        );
                    })}
                    <div onClick={() => handleSelectCard(null)} className={classnames(style.option, (isNewCard) ? style.selected : '')}>
                        <div>{t('checkout.billing.newCard')}</div>
                    </div>
                </div>
                {isNewCard &&
                <form className={style.newPayment} onSubmit={handleSubmit(onSubmit)}>
                    <div className={`fieldSet`}>
                        <TextInput
                            control={control}
                            name={`name_on_card`}
                            label={t(`Name On Card`)}
                            rules={{required: false}}
                        />
                        <div className={`stripeEle`}>
                            <label>{t('Card Number')}</label>
                            <div className={`stripeInput`}>
                                <CardNumberElement options={{
                                    placeholder: '',
                                    style: {base: {
                                            fontFamily: 'Larsseit',
                                            color: '#0B2B4E',
                                            fontWeight: '300'
                                        }}
                                }}/>
                            </div>
                        </div>
                    </div>
                    <div className={`fieldSet`}>
                        <div className={`stripeEle`}>
                            <label>{t('MM/YY')}</label>
                            <div className={`stripeInput`}>
                                <CardExpiryElement options={{
                                    placeholder: '',
                                    style: {base: {
                                            fontFamily: 'Larsseit',
                                            color: '#0B2B4E',
                                            fontWeight: '300'
                                        }}
                                }}/>
                            </div>
                        </div>
                        <div className={`stripeEle`}>
                            <label>{t('CVC')}</label>
                            <div className={`stripeInput`}>
                                <CardCvcElement options={{
                                    placeholder: '',
                                    style: {base: {
                                            fontFamily: 'Larsseit',
                                            color: '#0B2B4E',
                                            fontWeight: '300'
                                        }}
                                }}/>
                            </div>
                        </div>
                    </div>
                    <div className={style.errorMsg}>{errorMsg}</div>
                </form>
                }

                <div className={style.actionWrapper}>
                    {isNewCard &&
                    <ButtonSecondary onClick={handleSubmit(onSubmit)} title={(disableBtn) ? t('checkout.processing') : t('checkout.submit')}/>
                    ||
                    <ButtonSecondary onClick={oldCardSubmit} title={(disableBtn) ? t('checkout.processing') : t('checkout.submit')}/>
                    }
                </div>
            </>
            }
        </>
    );
}

export default function Payment(props) {

    const router = useRouter();
    const {t} = useTranslation('common');
    const shippingAddress = useStore(state => state.shippingAddress);
    const [sameWithShipping, setSameWithShipping] = useState(true);
    const [country, setCountry] = useState('');
    const [addressFields, setAddressFields] = useState([]);
    const [region, setRegion] = useState('');
    const [billingFormError, setBillingFormError] = useState(null);

    const hasCoat = useStore(state => state.hasCoat);
    if(hasCoat) {
        router.replace('/appointment');
    }

    const {
        control,
        register,
        handleSubmit,
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

    let shippingContent = '';
    if (shippingAddress) {
        shippingContent = shippingAddress.address;
    }

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

    function getErrorData(error) {
        setBillingFormError(error);
    }

    return (
        <Layout globals={props.globals}>
            <div className={`mainWrapper`}>
            <div className={`section__inner`}>
                <h1 className={style.title}>{t('checkout.title')}</h1>
                <div className={style.checkoutWrapper}>
                    <div className={style.primary}>
                        <CheckoutBreadcrumb active={`billing`}/>
                        <>
                            <div className={style.checkoutHeadline}>
                                <h2 className={style.headline}>{t('checkout.billing.headline')}</h2>
                            </div>
                            <div className={style.billingAddresses}>
                                <div onClick={() => setSameWithShipping(true)} className={classnames(style.option, (sameWithShipping) ? style.selected : '')}>
                                    <AddressFormat address={shippingContent}/>
                                </div>
                                <div onClick={() => setSameWithShipping(false)} className={classnames(style.option, (!sameWithShipping) ? style.selected : '')}>
                                    <div>{t('checkout.billing.input')}</div>
                                </div>
                            </div>
                            {!sameWithShipping &&
                            <div className={style.newAddress}>
                                <form>
                                    <div className={`fieldSet`}>
                                        <TextInput
                                            id={`family_name`}
                                            control={control}
                                            name={`family_name`}
                                            label={t(`label.lastName`)}
                                            rules={{required: true}}
                                        />
                                        <TextInput
                                            id={`given_name`}
                                            control={control}
                                            name={`given_name`}
                                            label={t(`label.firstName`)}
                                            rules={{required: true}}
                                        />
                                    </div>
                                    <>{billingFormError === 'familyName' && t('error.required.familyName')}</>
                                    <>{billingFormError === 'givenName' && t('error.required.givenName')}</>
                                    <TextInput
                                        id={`company`}
                                        control={control}
                                        name={`company`}
                                        label={t(`label.company`)}
                                        rules={{required: false}}
                                    />
                                    <div className={`selectField`}>
                                        <label>{t(`label.country`)}</label>
                                        <div className={`selectWrapper`}>
                                            <select
                                                id={`country`}
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
                                    <>{billingFormError === 'country' && t('error.required.country')}</>
                                    {addressFields &&
                                    <>
                                        {addressFields.map(field => (
                                            <>
                                                {field.thoroughfare &&
                                                <>
                                                    <TextInput
                                                        id={`address`}
                                                        control={control}
                                                        name={`address`}
                                                        label={t(`label.address`)}
                                                        rules={{required: true}}
                                                    />
                                                    <>{billingFormError === 'address' && t('error.required.address')}</>
                                                </>
                                                }
                                                {field.locality && field.locality.map(localityField => (
                                                    <>
                                                        {localityField.localityname &&
                                                        <TextInput
                                                            id={`city`}
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
                                                                    id={`region`}
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
                                                                id={`postal_code`}
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
                            {stripePromise &&
                            <div className={style.stripeWrapper}>
                                <div className={style.checkoutHeadline}>
                                    <h2 className={style.headline}>{t('checkout.billing.details')}</h2>
                                </div>
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm sameWithShipping={sameWithShipping} errorData={getErrorData}/>
                                </Elements>
                            </div>
                            }
                        </>
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
    }
);

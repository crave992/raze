import style
    from './paymentModal.module.scss'
import {Modal} from "react-bootstrap";
import {useTranslation} from "next-i18next";
import TextInput
    from "@molecules/form/TextInput";
import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    Elements,
    useElements,
    useStripe
} from "@stripe/react-stripe-js";
import {useForm} from "react-hook-form";
import {restPost} from "@api/rest";
import {
    useEffect,
    useState
} from "react";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";
import {loadStripe} from "@stripe/stripe-js";
import classnames
    from "classnames";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY;
const stripePromise = loadStripe(stripeKey);

const CheckoutForm = (props) => {

    const stripe = useStripe();
    const elements = useElements();
    const content = props.content;
    const modalContent = content['content'];
    const {t} = useTranslation('common');
    const [errorMsg, setErrorMsg] = useState(null);

    let action = '';
    if (modalContent) {
        action = modalContent['action'];
    }
    console.log(modalContent);

    const {
        control,
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm();

    useEffect(() => {
        if (modalContent) {
            if (action === 'update') {
                setValue("name_on_card", modalContent['details']['name']);
                setValue("expiry", modalContent['details']['exp_month'] + '/' + modalContent['details']['exp_year']);
            } else {
                setValue("name_on_card", '');
                setValue("expiry", '');
            }
        }
    }, [modalContent]);

    const onSubmit = async (data) => {

        let customData = {};

        if (action === 'update') {
            customData = {
                action: 'update',
                name: data.name_on_card,
                expiry: data.expiry,
                paragraphID: modalContent['paragraphID']
            }
            restPost('rhm-store/account/payment?_format=json', customData).then((res) => {
                if(res.json.status === 100) {
                    setErrorMsg(res.json.message);
                }
                else {
                    setErrorMsg('');
                    content.onHide();
                }
            });
        } else {
            customData = {
                name: data.name_on_card
            };
            const card = elements.getElement(CardNumberElement);
            const result = await stripe.createToken(card, customData);
            if (result.error) {
                setErrorMsg(result.error.message);
            } else if(result.token) {
                setErrorMsg('');
                let data = {
                    action: 'create',
                    token: result.token
                }
                restPost('rhm-store/account/payment?_format=json', data).then((res) => {
                    content.onHide();
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`fieldSet`}>
                <TextInput
                    control={control}
                    name={`name_on_card`}
                    label={t(`Name On Card`)}
                    rules={{required: t('error.required')}}
                />
                <div className={`stripeEle`}>
                    <label>{t('Card Number')}</label>
                    <div className={classnames(`stripeInput`, `disabled`)}>
                        {action === 'create' &&
                        <CardNumberElement options={{
                            placeholder: '',
                            style: {
                                base: {
                                    fontFamily: 'Larsseit',
                                    color: '#0B2B4E',
                                    fontWeight: '300'
                                }
                            }
                        }}/>
                        ||
                        <input type={`text`} value={`XXXX-XXXX-XXXX-${modalContent['details']['last4']}`} disabled/>
                        }
                    </div>
                </div>
            </div>
            <div className={`fieldSet`}>
                {action === 'create' &&
                <div className={`stripeEle`}>
                    <label>{t('MM/YY')}</label>
                    <div className={`stripeInput`}>
                        <CardExpiryElement options={{
                            placeholder: '',
                            style: {
                                base: {
                                    fontFamily: 'Larsseit',
                                    color: '#0B2B4E',
                                    fontWeight: '300'
                                }
                            }
                        }}/>
                    </div>
                </div>
                ||
                <TextInput
                    control={control}
                    name={`expiry`}
                    label={t(`label.expiry`)}
                    rules={{required: t('error.required'), maxLength: {value: 7, message: t('error.expiry')}}}
                />
                }
                <div className={`stripeEle`}>
                    <label>{t('CVC')}</label>
                    <div className={classnames(`stripeInput`, `disabled`)}>
                        {action === 'create' &&
                        <CardCvcElement options={{
                            placeholder: '',
                            style: {
                                base: {
                                    fontFamily: 'Larsseit',
                                    color: '#0B2B4E',
                                    fontWeight: '300'
                                }
                            }
                        }}/>
                        ||
                        <input type={`text`} value={`XXX`} disabled/>
                        }
                    </div>
                </div>
            </div>
            <div className={style.errorMsg}>{errorMsg}</div>
            <div className={style.actionWrapper}>
                <ButtonSecondary title={t('button.save')} onClick={handleSubmit(onSubmit)}/>
            </div>
        </form>
    )
}

export default function PaymentPopupModal(props) {
    const modalContent = props;
    const {t} = useTranslation('common');
    let headline = t('account.payment.new');
    if (modalContent && modalContent['action'] === 'update') {
        headline = t('account.payment.update');
    }
    return (
        <Modal
            {...props}
            size="xl"
            centered>
            <>
                <Modal.Body>
                    <div className={style.paymentPopupModal}>
                        <h3 className={style.headline}>{headline}</h3>
                        {stripePromise &&
                        <Elements stripe={stripePromise}>
                            <CheckoutForm content={modalContent}/>
                        </Elements>
                        }
                    </div>
                </Modal.Body>
            </>
        </Modal>
    )
}

import style from './card-payment.module.scss';
import {useTranslation} from "next-i18next";

interface Props {
    card: any,
    defaultAction: any,
    editAction: any,
    deleteAction: any
}

const CardPayment = ({card, defaultAction = null, editAction, deleteAction}: Props) => {

    const cardContent = card['details'];
    const {t} = useTranslation('common');

    return (
        <div className={style.paymentCard}>
            <div className={style.brand}>{cardContent['brand']}</div>
            <div className={style.details}>
                {cardContent['name'] &&
                <p className={style.name}>{cardContent['name']}</p>
                }
                <p className={style.cardNumber}>XXXX-XXXX-XXXX-{cardContent['last4']}</p>
                <p className={style.expiry}>{cardContent['exp_month']}/{cardContent['exp_year']}</p>
            </div>
            <div className={style.action}>
                {card['isDefault'] == 0 &&
                <div className={style.defaultBtn} onClick={() => defaultAction(card['paragraphID'])}>{t('account.payment.set.default')}</div>
                }
                <div className={style.editBtn} onClick={() => editAction(card)}>&nbsp;</div>
                <div className={style.deleteBtn} onClick={() => deleteAction(card['paragraphID'])}>&nbsp;</div>
            </div>
        </div>
    )
}

export default CardPayment;

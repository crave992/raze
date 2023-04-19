import addressJSON
    from "addressfield.min.json";
import style
    from "./card-address.module.scss";
import {useTranslation} from "next-i18next";
import {isoToString} from "@util/helper";
import AddressFormat
    from "@molecules/cards/address/AddressFormat";

interface Props {
    address: any,
    defaultAction: any,
    editAction: any,
    deleteAction: any
}

const CardAddress = ({
                         address,
                         defaultAction = null,
                         editAction,
                         deleteAction
                     }: Props) => {

    const addressContent = address['details']['address'];
    const {t} = useTranslation('common');

    return (
        <div className={style.addressCard}>
            <div className={style.details}>
                <AddressFormat address={addressContent}/>
            </div>
            <div className={style.action}>
                {address['isDefault'] == 0 &&
                <div className={style.defaultBtn} onClick={() => defaultAction(address['details']['id'])}>{t('account.address.set.default')}</div>
                }
                <div className={style.editBtn} onClick={() => editAction(address)}>&nbsp;</div>
                <div className={style.deleteBtn} onClick={() => deleteAction(address['details']['id'])}>&nbsp;</div>
            </div>
        </div>
    )
}

export default CardAddress;

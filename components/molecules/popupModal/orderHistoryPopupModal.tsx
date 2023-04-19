import style from './orderHistoryModal.module.scss';
import classnames
    from "classnames";
import Image from "next/image";
import {Modal} from "react-bootstrap";
import {useTranslation} from "next-i18next";
import AddressFormat
    from "@molecules/cards/address/AddressFormat";
import {priceFormatted} from "@util/helper";


export default function OrderHistoryPopupModal(props) {

    const modalContent = props.content;
    const {t} = useTranslation('common');

    return (
        <Modal
            {...props}
            size="xl"
            centered>
            {modalContent &&
            <>
                <Modal.Body>
                    <div className={style.orderHistoryPopupModal}>
                    <h3 className={style.modalTitle}>{t(`account.history.modalTitle`, {orderNumber: modalContent.id})}</h3>
                    <div className={style.modalSubtitle}>{t('account.history.modalSubtitle')}</div>
                    {modalContent.lineItems &&
                    <>
                        <div className={classnames(style.modalRow, style.modalRowHead)}>
                            <div className={classnames(style.modalColumn, style.image)}>&nbsp;</div>
                            <div className={classnames(style.modalColumn, style.title)}>&nbsp;</div>
                            <div className={classnames(style.modalColumn, style.quantity)}>{t('account.history.quantity')}</div>
                            <div className={classnames(style.modalColumn, style.amount)}>{t('account.history.amount')}</div>
                        </div>
                        {modalContent.lineItems.map(item => {
                            return (
                                <div className={classnames(style.modalRow, style.modalRowBody)} key={item}>
                                    <div className={classnames(style.modalColumn, style.image)}>
                                        {item.media && item.media.length > 0 &&
                                        <Image
                                            width={110}
                                            height={110}
                                            objectFit="cover"
                                            objectPosition="center"
                                            src={item.media[0]['url']}/>
                                        }
                                    </div>
                                    <div className={classnames(style.modalColumn, style.title)}>{item.title}</div>
                                    <div className={classnames(style.modalColumn, style.quantity)}>{item.quantity}</div>
                                    <div className={classnames(style.modalColumn, style.amount)}>{priceFormatted( item.subTotal, item.currency)}</div>
                                </div>
                            )
                        })}
                    </>
                    }
                    <div className={style.modalFooter}>
                        <div className={style.modalAddress}>
                            {modalContent['shipping'] &&
                            <AddressFormat address={modalContent['shipping']}/>
                            || null}
                        </div>
                        <div className={style.modalAmount}>
                            {modalContent['discount'].hasOwnProperty('amount') &&
                            <div className={style.amountRow}>
                                <div className={style.amountLabel}>{t('checkout.discount')}</div>
                                <div className={style.amountValue}><div className={style.amountValue}>{priceFormatted(modalContent['discount']['amount'], modalContent['discount']['currency'])}</div></div>
                            </div>
                            || null}
                            {modalContent['shipment'].hasOwnProperty('amount') &&
                            <div className={style.amountRow}>
                                <div className={style.amountLabel}>{t('checkout.shipping')}</div>
                                <div className={style.amountValue}>{priceFormatted(modalContent['shipment']['amount'], modalContent['shipment']['currency'], modalContent['shipment']['isFree'])}</div>
                            </div>
                            || null }
                            <div className={style.amountRow}>
                                <div className={style.amountLabel}>Total</div>
                                <div className={classnames(style.amountValue, style.totalPrice)}>{priceFormatted(  modalContent.totalAmount, modalContent.currency)}</div>
                            </div>
                        </div>
                    </div>
                    </div>
                </Modal.Body>
            </>
            }
        </Modal>
    )
}

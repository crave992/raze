import Layout
    from "@site/layout/Layout";
import AccountLayout
    from "@site/layout/AccountLayout";
import withGlobalData
    from "@util/withGlobalData";
import {
    useEffect,
    useState
} from "react";
import {
    restGet,
    restPost
} from "@api/rest";
import style
    from "./account.module.scss";
import {useTranslation} from "next-i18next";
import classnames
    from "classnames";
import CardAddress
    from "@molecules/cards/address/CardAddress";
import AddressPopupModal
    from "@molecules/popupModal/addressPopupModal";
import AlertPopupModal
    from "@molecules/popupModal/alertPopupModal";


const Addresses = (props) => {

    const {t} = useTranslation('common');
    const [userAddress, setUserAddress] = useState(null);
    const [show, setShow] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [deleteAddress, setDeleteAddress] = useState(null);

    useEffect(() => {
        getUserAddress();
    }, [show]);

    let defaultAddress = '';
    if (userAddress) {
        defaultAddress = userAddress.find(element => {
            return (element.isDefault == 1) ? element : '';
        });
    }

    const getUserAddress = () => {
        restGet('rhm-store/address/get?_format=json').then((res) => {
            setUserAddress(res);
        });
    }

    const handleDefault = () => (addressID) => {
        let data = {
            action: 'setDefault',
            id: addressID,
        }
        restPost('rhm-store/account/address?_format=json', data).then((res) => {
            getUserAddress();
        });
    }

    const handleShow = () => (address) => {
        address.action = 'update';
        setModalContent(address);
        setShow(true);
    }

    const handleCreate = () => {
        setModalContent({action: 'create'});
        setShow(true);
    }

    const handleAlert = () => (paragraphID) => {
        setDeleteAddress(paragraphID);
        setAlertShow(true);
    }

    const handleDelete = () => {
        let data = {
            action: 'delete',
            id: deleteAddress,
        }
        restPost('rhm-store/account/address?_format=json', data).then((res) => {
            getUserAddress();
            setAlertShow(false);
        });
    }

    const alertContent = {
        'title': t('account.address.confirm'),
        'btn': t('account.address.confirmed')
    }

    return (
        <Layout globals={props.globals}>
            <AccountLayout>
                <h1 className={style.title}>{t(`account.address.title`)}</h1>
                {userAddress &&
                <>
                    <div className={classnames(style.wrapper, style.addresses)}>
                        {userAddress.length &&
                        <>
                            {defaultAddress &&
                            <div className={style.section}>
                                <div className={style.sectionHeader}>
                                    <h2>{t(`account.address.default`)}</h2>
                                </div>
                                <CardAddress address={defaultAddress} defaultAction={handleDefault()} editAction={handleShow()} deleteAction={handleAlert()}/>
                            </div>
                            }
                            {  ( ( defaultAddress && userAddress.length > 1 ) || ( !defaultAddress && userAddress ) ) &&
                            <div className={style.section}>
                                <div className={style.sectionHeader}>
                                    <h2>{t(`account.address.other`)}</h2>
                                </div>
                                {userAddress.map(address => {
                                    if (address.isDefault == '0') {
                                        return (
                                            <CardAddress address={address} defaultAction={handleDefault()} editAction={handleShow()} deleteAction={handleAlert()}/>
                                        )
                                    }
                                })}
                            </div>
                            }
                        </>
                        ||
                        <div className={style.section}>
                            <div className={style.sectionHeader}>
                                <h2>{t(`account.address.empty`)}</h2>
                            </div>
                        </div>
                        }
                        <div className={style.addAddress}>
                            <div className={style.addBtn} onClick={() => handleCreate()}>{t('account.address.add')}</div>
                        </div>
                    </div>
                    <AddressPopupModal show={show} content={modalContent} onHide={() => setShow(false)}/>
                    <AlertPopupModal show={alertShow} content={alertContent} alertAction={handleDelete} onHide={() => setAlertShow(false)}/>
                </>
                ||
                <div>Loading...</div>
                }
            </AccountLayout>
        </Layout>
    )
}

export const getStaticProps = withGlobalData(context => {

    const props = {auth: true};
    return {
        props,
        revalidate: 5
    }

});

export default Addresses;

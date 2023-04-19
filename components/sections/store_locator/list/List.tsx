import style
    from './list.module.scss';
import useStore
    from "@store/store";
import {
    useEffect,
    useState
} from "react";
import {useTranslation} from "next-i18next";
import {restGet} from "@api/rest";

export default function List() {
    const {t} = useTranslation('common');
    const storeLocation = useStore(state => state.storeLocation);
    const [storeList, setStoreList] = useState([]);
    const [retailerList, setRetailerList] = useState([]);
    const [partnerList, setPartnerList] = useState([]);

    useEffect(() => {
        getStore('store');
        getStore('retailers');
        getStore('partner');
    }, [storeLocation]);

    const getStore = (type) => {
        restGet(`rhm-store-locator?_format=json&location=${storeLocation}&type=${type}`).then((res) => {
            if (type === 'store') {
                setStoreList(res.stores)
            } else if (type === 'retailers') {
                setRetailerList(res.stores)
            } else if (type === 'partner') {
                setPartnerList(res.stores)
            }
        });
    }

    return (
        <section className={style.storeLocator}>
            <div className={style.storeList}>
                <div className={`section__inner`}>
                    <h2 className={`section__title_2`}>{t('store.title.store')}</h2>
                    {storeList &&
                    <div className={style.storeListStore}>
                        {storeList.map((store, i) => (
                            <div className={style.store}>
                                <div className={style.imageWrapper}>
                                    <img src={store.thumbnail.url} alt={store.thumbnail.alt}/>
                                    <div className={style.content}>
                                        <div className={style.name} dangerouslySetInnerHTML={{__html:store.title}}></div>
                                        <div className={style.address} dangerouslySetInnerHTML={{__html:store.address[0]['value']}}></div>
                                    </div>
                                </div>
                                <div className={style.tags}>
                                    <div>{t('label.period')} : {store.period}</div>
                                    <div>{t('label.opening')} : {store.opening}</div>
                                    <div>{t('label.phone')} : {store.phone}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    ||
                    <div className={style.noStore}>
                        <div className={style.noStoreIcon}></div>
                        <div className={style.noStoreTitle}>{t('store.no.title')}</div>
                        <div className={style.noStoreTitle}>{t('store.no.description')}</div>
                    </div>
                    }
                </div>
            </div>
            <section className={style.retailerList}>
                <div className={`section__inner`}>
                    <h2 className={`section__title_2`}>{t('store.title.retailer')}</h2>
                    {retailerList &&
                    <div className={style.storeListRetailer}>
                        {retailerList.map((store, i) => (
                            <div className={style.retailer}>
                                <div className={style.name}>
                                    {store.link &&
                                    <a href={store.link} target={`_blank`}>
                                        <span dangerouslySetInnerHTML={{__html: store.title}}></span>
                                    </a>
                                    ||
                                    <span dangerouslySetInnerHTML={{__html: store.title}}></span>
                                    }
                                </div>
                                <div className={style.address} dangerouslySetInnerHTML={{__html: store.address[0]['value']}}></div>
                                <div className={style.phone}>{store.phone}</div>
                            </div>
                        ))}
                    </div>
                    ||
                    <div className={style.noStore}>
                        <div className={style.noStoreIcon}></div>
                        <div className={style.noStoreTitle}>{t('store.no.title')}</div>
                        <div className={style.noStoreText}>{t('store.no.description')}</div>
                    </div>
                    }
                </div>
            </section>
            <section className={style.partnerList}>
                <div className={`section__inner`}>
                    <h2 className={`section__title_2`}>{t('store.title.partner')}</h2>
                    {partnerList &&
                    <div className={style.storeListPartner}>
                        {partnerList.map((store, i) => (
                            <div className={style.partner}>
                                {store.link &&
                                <a href={store.link} target={`_blank`}>
                                    <div className={style.image}>
                                        <img src={store.thumbnail.url} alt={store.thumbnail.alt}/>
                                    </div>
                                    <div className={style.name} dangerouslySetInnerHTML={{__html: store.title}}></div>
                                </a>
                                ||
                                <>
                                    <div className={style.image}>
                                        <img src={store.thumbnail.url} alt={store.thumbnail.alt}/>
                                    </div>
                                    <div className={style.name}>{store.title}</div>
                                </>
                                }
                            </div>
                        ))}
                    </div>
                    }
                </div>
            </section>
        </section>
    )
}

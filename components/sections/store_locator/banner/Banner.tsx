import style
    from './banner.module.scss';
import Image
    from "next/image";
import classnames
    from "classnames";
import {
    useEffect,
    useState
} from "react";
import {restGet} from "@api/rest";
import {useTranslation} from "next-i18next";
import useStore
    from "@store/store";

type Props = {
    section: {
        field_title: string,
        field_description: string,
        field_media_image: Array<any>
    }
}

export default function Banner(props: Props) {
    const {t} = useTranslation('common');
    const content = props.section;
    const [storeLocationOptions, setStoreLocationOptions] = useState([]);
    const storeLocation = useStore(state => state.storeLocation);
    const setStoreLocation = useStore.getState().setStoreLocation;

    useEffect(() => {
        restGet(`rhm-term-load-tree?_format=json&term=locations`).then((res) => {
            setStoreLocationOptions(res);
        });
    }, [])

    const handleUpdateLocation = (val) => {
        setStoreLocation(val);
    }

    return (
        <section className={style.storeLocatorBanner}>
            <div className={style.contentWrapper}>
                <div className={`section__inner`}>
                    <h1 className={classnames(`node__title`, `white`)} dangerouslySetInnerHTML={{__html:content['field_title']}}></h1>
                    {content['field_description'] &&
                    <div className={style.description} dangerouslySetInnerHTML={{__html: content['field_description'][0]}}></div>
                    }
                </div>
            </div>
            <div className={style.mediaWrapper}>
                <Image
                    src={content['field_media_image'][0]['url']}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt={content['field_media_image'][0]['alt']}
                />
            </div>
            {storeLocationOptions.length &&
            <div className={style.storeType}>
                <div className={`section__inner`}>
                    <div className={`selectField`}>
                        <label>{t('label.location')}</label>
                        <div className={`selectWrapper`}>
                            <select
                                value={storeLocation}
                                onChange={(e) => handleUpdateLocation(e.target.value)}
                            >
                                <option value={`all`}>{t('label.all')}</option>
                                {storeLocationOptions.map(option => (
                                    <option key={option.id} value={option.id}>{option.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            }
        </section>
    )
}

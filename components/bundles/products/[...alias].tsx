import style
    from "./product.module.scss";
import Image
    from "next/image";
import Breadcrumb
    from "@molecules/breadcrumb/Breadcrumb";
import {useTranslation} from "next-i18next";
import {
    restDelete,
    restGet,
    restPost
} from "@api/rest";
import {
    useEffect,
    useState
} from "react";
import Section
    from "@util/Section";
import {priceFormatted} from "@util/helper";
import useStore
    from "@store/store";
import ButtonPrimary
    from "@atoms/buttons/ButtonPrimary";
import classnames
    from "classnames";
import DatePicker
    from "react-datepicker";
import {useRouter} from "next/router";

export default function ProductDisplay(props) {

    const {t} = useTranslation('common');
    const router = useRouter();
    const cart = useStore(state => state.cart);
    const setCart = useStore.getState().setCart;

    const hasCoat = useStore(state => state.hasCoat);
    const setHasCoat = useStore.getState().setHasCoat;

    let imagesArr: any = [];
    const node = props.node;
    const product = node.field_product;
    const productType = node.field_product_type[0]['field_slug'][0].toLowerCase();

    const maxNum: number = 20;
    const [bigImage, setBigImage] = useState('');
    const [selectedVariation, setSelectedVariation] = useState(product.variations.length ? product.variations[0] : null);
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');

    let orderID = 0;
    if (cart && cart.length > 0) {
        orderID = cart[0].order_id;
    }

    // Image Slider
    // if (node.field_media_image.length > 0) {
    //     imagesArr.push({
    //         'id': 'parent',
    //         'images': node.field_media_image
    //     });
    // }
    if (node.field_product && node.field_product.variations.length) {
        node.field_product.variations.map(v => {
            if (v.images.length > 0) {
                imagesArr.push({
                    'id': v.id,
                    'images': v.images
                });
            }
        });
    }

    useEffect(() => {
        if (imagesArr && imagesArr.length > 0) {
            setBigImage(imagesArr[0].images[Object.keys(imagesArr[0].images)[0]].url);
        }
    }, []);

    const handleImageOnChange = (id, url) => {
        handleAttributeChange(id);
        setBigImage(url);
    }

    const handleAttributeChange = (id) => {
        const thisVariation = product.variations.find((variation) => {
            return variation.id === id;
        });
        if (thisVariation) {
            setSelectedVariation(thisVariation);
            let imageFound = imagesArr.find((e) => {
                return (e.id === id);
            });
            if (imageFound) {
                setBigImage(imageFound.images[0].url);
            }
        }
        setQuantity(1);
        setMessage('');
    };

    const handleNormalAddToCart = () => {
        if (hasCoat) {
            setHasCoat(false);
            setCoatingType(null);
            restDelete(`/cart/${orderID}/items?_format=json`).then((res) => {
                handleAddToCart();
            });
        } else {
            handleAddToCart();
        }
    }

    const handleAddToCart = () => {
        restPost('cart/add', [
                {
                    'purchased_entity_type': 'commerce_product_variation',
                    'purchased_entity_id': selectedVariation.id,
                    'quantity': quantity
                }
            ]
        ).then((res) => {
            restGet('cart?_format=json').then((res) => {
                setCart(res);
                setQuantity(1);
                setMessage(t('product.label.addSuccess'));
            });
        })
    };

    // Product - Coat
    const coatingDate1 = useStore(state => state.coatingDate1);
    const coatingDate2 = useStore(state => state.coatingDate2);
    const setCoatingDate = useStore.getState().setCoatingDate;
    const setCoatingType = useStore.getState().setCoatingType;
    const [disableProcess, setDisableProcess] = useState(true);

    let minDate: any = new Date();
    minDate = minDate.setDate(minDate.getDate() + 2);

    let maxDate: any = new Date();
    maxDate = maxDate.setFullYear(maxDate.getFullYear() + 1);

    const disabledDate = [Date.parse('2022-06-14'), Date.parse('2022-06-18')]; // todo CMS

    const handlePreferredDate = (option, date) => {
        setCoatingDate(option, date);
    }

    const handleCoatingAddToCart = () => {
        if (!hasCoat) {
            setHasCoat(true);
        }
        setCoatingType(selectedVariation['name']);
        restDelete(`/cart/${orderID}/items?_format=json`).then((res) => {
            handleAddToCart();
            router.push(`/appointment`);
        });
    }

    useEffect(() => {
        if (productType === 'coat') {
            if (coatingDate1 && coatingDate2) {
                setDisableProcess(false);
            } else {
                setDisableProcess(true);
            }
        }
    }, [coatingDate1, coatingDate2]);

    return (
        <>
            <section className={style.product}>
                <div className={`section__inner`}>
                    {node.breadcrumb &&
                    <Breadcrumb links={node.breadcrumb}/>
                    }
                    <div className={style.wrapper}>
                        {/*Media Wrapper*/}
                        <div className={style.media}>
                            {imagesArr && imagesArr.length > 0 &&
                            <div className={style.thumbnail}>
                                {imagesArr.map((images, key) => (
                                    <div key={`images_${key}`}>
                                        {Object.values(images.images).map((image, key) => {
                                            return (
                                                <div key={`image_${images.id}_${key}`} onClick={() => handleImageOnChange(images['id'], image['url'])}>
                                                    <Image
                                                        src={image['url']}
                                                        width={120}
                                                        height={120}
                                                        objectFit="cover"
                                                        objectPosition="center"
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                ))}
                            </div>
                            }
                            {bigImage &&
                            <div className={style.feature}>
                                <Image
                                    src={bigImage}
                                    width={550}
                                    height={550}
                                    objectFit="cover"
                                    objectPosition="center"
                                />
                            </div>
                            }
                        </div>
                        {/*Content Wrapper*/}
                        <div className={style.content}>
                            <h2 className={classnames(`section__headline`, `orange`)}>{productType}</h2>
                            <h1 className={`section__title`} dangerouslySetInnerHTML={{__html: node.title}}></h1>
                            {node.body.length &&
                            <div className={style.body} dangerouslySetInnerHTML={{__html: node.body[0]['value']}}></div>
                            || null}
                            {productType === 'coat' && product.description &&
                            <div className={style.description} dangerouslySetInnerHTML={{__html: product.description}}></div>
                            }
                            {productType !== 'coat' &&
                            <div className={style.price}>
                                {priceFormatted(selectedVariation['price'], selectedVariation['currency'])}
                            </div>
                            }
                            <div className={classnames(style.variationsContent, (product.variations.length === 1) ? style.hide : '')}>
                                <div className={style.label}>{t('product.label.size')}</div>
                                <div className={style.variations}>
                                    {product.variations.map((attr, i) => {
                                        // console.log(attr);
                                        return (
                                            <>
                                                {product.type === 'paint' &&
                                                <div
                                                    key={i}
                                                    className={classnames(style.colorBox, (selectedVariation['id'] == attr.id) ? style.selected : '')}
                                                    onClick={() => handleAttributeChange(attr.id)}
                                                    style={{backgroundColor: attr.colour[0]['color']}}></div>
                                                ||
                                                <div
                                                    key={i}
                                                    className={classnames(style.variation, (selectedVariation['id'] == attr.id) ? style.selected : '')}
                                                    onClick={() => handleAttributeChange(attr.id)}>
                                                    {product.type === 'coating_service' &&
                                                    <>{attr.attributes.attribute_salable_area.name}</>
                                                    ||
                                                    product.type === 'mask' &&
                                                    <>{attr.attributes.attribute_size.name}</>
                                                    }
                                                </div>
                                                }
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                            {productType === 'coat' &&
                            <>
                                <div className={style.preferredDates}>
                                    <div className={`dateField`}>
                                        <label>{t('product.coat.preferred_1')}</label>
                                        <DatePicker
                                            selected={(coatingDate1) ? new Date(coatingDate1) : ''}
                                            onSelect={(date: Date) => handlePreferredDate(1, date)}
                                            onChange={(date: Date) => handlePreferredDate(1, date)}
                                            dateFormat="yyyy-MM-dd"
                                            minDate={minDate}
                                            maxDate={maxDate}
                                            excludeDates={disabledDate}
                                            placeholderText="YYYY-MM-DD"
                                        />
                                    </div>
                                    <div className={`dateField`}>
                                        <label>{t('product.coat.preferred_2')}</label>
                                        <DatePicker
                                            selected={(coatingDate2) ? new Date(coatingDate2) : ''}
                                            onSelect={(date: Date) => handlePreferredDate(2, date)}
                                            onChange={(date: Date) => handlePreferredDate(2, date)}
                                            dateFormat="yyyy-MM-dd"
                                            minDate={minDate}
                                            maxDate={maxDate}
                                            excludeDates={disabledDate}
                                            placeholderText="YYYY-MM-DD"
                                        />
                                    </div>
                                </div>
                                <ButtonPrimary title={t('product.label.proceed')} onClick={handleCoatingAddToCart} disabled={(disableProcess)}/>
                            </>
                            ||
                            <>
                                {selectedVariation.always_in_stock === 1 || selectedVariation.stock > 0 &&
                                <div className={style.quantityContent}>
                                    <div className={style.label}>{t('product.label.quantity')}</div>
                                    <div className={style.selectWrapper}>
                                        <select
                                            className={style.quantitySelect}
                                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                                            value={quantity}
                                        >
                                            {Array.from(Array(maxNum)).map((e, i) => {
                                                i = i + 1;
                                                return (
                                                    <option key={i} value={i}>{i}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <ButtonPrimary title={t('product.label.add')} onClick={handleNormalAddToCart}/>
                                    {message &&
                                    <div className={style.message} dangerouslySetInnerHTML={{__html: message}}></div>
                                    }
                                </div>
                                ||
                                <div className={style.message}>
                                    <div className={style.out}>{t('product.label.out')}</div>
                                    <p>{t('product.label.stores')}</p>
                                    {props.globals.globalLink['field_store_link'] &&
                                    <div className={style.storeLink}>
                                        <ButtonPrimary title={props.globals.globalLink['field_store_link']['title']} href={props.globals.globalLink['field_store_link']['url']}/>
                                    </div>
                                    }
                                </div>
                                }
                            </>
                            }
                        </div>
                    </div>
                </div>
            </section>
            {node.field_sections && node.field_sections.map(section =>
                <Section key={section.paragraph.uuid} section={section}/>
            )}
        </>
    )
}

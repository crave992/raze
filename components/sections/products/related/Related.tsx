import style from './related.module.scss';
import {useTranslation} from "next-i18next";
import Product
    from "@molecules/cards/product/Product";

export default function Related(props) {
    let content = props['section'];
    const {t} = useTranslation('common');
    if (Object.keys(content.products).length) {
        return (
            <section className={style.productRelated}>
                <div className={`section__inner`}>
                    <div className={style.wrapper}>
                        <h2 className={`section__title_2`}>{t('product.label.related')}</h2>
                        <div className={style.products}>
                            {content.products.map((product, i) => {
                                return (
                                    <Product displayType={product['displayType']} path={product['path']} media={product['media']} title={product['title']} body={product['body']} variations={product['variations']}/>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        )
    } else {
        return null;
    }
}

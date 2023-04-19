import style from './special.module.scss';
import Product
    from "@molecules/cards/product/Product";
import classnames
    from "classnames";

type Props = {
    section: {
        field_title: string,
        field_products: Array<object>,
        field_background: string
    }
}

export default function Special(props: Props) {
    let content = props['section'];
    // console.log(content);
    return (
        <section className={classnames(style.special, style[content['field_background']])}>
            <div className={`section__inner`}>
                <div className={`section__title_2`} dangerouslySetInnerHTML={{__html: content['field_title']}}></div>
                {Object.keys(content['field_products']).length &&
                <div className={style.products}>
                    {content['field_products'].map((product, i) => {
                        return (
                            <Product
                                displayType={product['field_product_type'][0]}
                                path={product['path']}
                                media={product['field_media_image'][0]}
                                title={product['title']}
                                body={product['body']}
                                variations={product['field_product']['variations']}/>
                        )
                    })}
                </div>
                }
            </div>
        </section>
    )
}

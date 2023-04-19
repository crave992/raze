import style
    from "./byType.module.scss";
import Product
    from "@molecules/cards/product/Product";
import classnames
    from "classnames";

type Props = {
    section: {
        displayType: string,
        products: Array<Object>,
        field_background: string
    }
}

export default function byType(props: Props) {
    let content = props.section;
    if (content.products.length) {
        return (
            <section className={classnames(style.productByType, style[content.field_background])}>
                <div className={`section__inner`}>
                    <div className={style.wrapper}>
                        <h2 className={`section__title_2`}>{content.displayType}</h2>
                        <div className={style.products}>
                            {content.products.map((product, i) => (
                                <Product displayType={product['displayType']} path={product['path']} media={product['media']} title={product['title']} body={product['body']} variations={product['variations']}/>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        )
    } else {
        return null;
    }
}

import style from './archive.module.scss';
import classnames
    from "classnames";
import ProductArchive
    from "@molecules/cards/product/ProductArchive";

type Props = {
    section: {
        field_background: string,
        field_headline:string,
        field_product_list:Array<any>
    }
}

export default function Archive(props:Props) {
    const content = props.section;
    return (
        <section className={classnames(style.productArchive, style[content.field_background])}>
            <div className={`section__inner`}>
                <h3 className={classnames(`section__headline`,`yellow`)} dangerouslySetInnerHTML={{__html:content.field_headline}}></h3>
                {content.field_product_list.length &&
                    <div className={style.productSections}>
                        {content.field_product_list.map((pSection, i) => (
                            <div className={style.productSection} key={i}>
                                <h2 className={`section__title_2`} dangerouslySetInnerHTML={{__html:pSection.field_title}}></h2>
                                {pSection.field_items.length &&
                                    <div className={style.items}>
                                        {pSection.field_items.map((item, i) => (
                                            <ProductArchive item={item}/>
                                        ))}
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                }
            </div>
        </section>
    )
}

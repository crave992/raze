import style from './weProvide.module.scss';
import classnames
    from "classnames";
import Item
    from "@molecules/item/Item";

type Props = {
    section:{
        field_title: string,
        field_provide_items: Array<string>
    }
}

export default function weProvide(props: Props) {
    const content = props.section;

    return (
        <section className={style.weProvide}>
            <div className={`section__inner`}>
                <h2 className={classnames(`section__title_2`, `white`)}>{content.field_title}</h2>
                {Object.keys(content.field_provide_items).length &&
                    <div className={style.items}>
                        {content.field_provide_items.map((item, i) => (
                            <Item key={i} icon={item['field_media_image']} description={item['field_title']} column={`col-3`} color={`white`}/>
                        ))}
                    </div>
                }
            </div>
        </section>
    )
}

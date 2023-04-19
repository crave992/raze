import style
    from './item.module.scss';
import Image
    from "next/image";
import classnames
    from "classnames";

interface Props {
    icon: Array<string>,
    title?: string,
    description?: string,
    column: string,
    color?: string,
}

export default function Item(props: Props) {
    return (
        <div className={classnames(style.item, style[props.column], style[props.color])}>
            {props.icon.length &&
            <div className={style.image}>
                <Image
                    src={props.icon[0]['url']}
                    alt={props.icon[0]['alt']}
                    width={140}
                    height={140}
                />
            </div>
            || null }
            {props.title &&
            <div className={style.title}>{props.title}</div>
            || null }
            {props.description &&
            <div className={style.description} dangerouslySetInnerHTML={{__html: props.description}}></div>
            || null }
        </div>
    )
}

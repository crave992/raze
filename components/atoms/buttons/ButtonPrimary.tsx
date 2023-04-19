import style from "./buttons.module.scss";
import Link from "next/link";
import classnames
    from "classnames";

type Props = {
    href?: string
    target?: string
    title: string
    disabled?: boolean,
    color?: string,
    onClick?: () => void,
}

export default function ButtonPrimary({href, target, title, disabled, color, onClick}: Props){
    return(
        <>
            {href &&
            <Link href={href}>
                <a className={classnames(style.primary, style[color])} target={(target) ? target : ''}>
                    {title}
                </a>
            </Link>
            }
            {!href &&
            <button
                disabled={disabled ? disabled : false}
                onClick={onClick}
                className={classnames(style.primary, style[color])}>
                    {title}
            </button>

            }

        </>
    )
}

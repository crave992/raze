import style from "./buttons.module.scss";
import Link from "next/link";
import classnames
    from "classnames";

type Props = {
    href?: string
    target?: string
    title: string
    disabled?: boolean
    isLeft?: boolean
    color?:string
    onClick?: () => void
}

export default function ButtonSecondary({href, target, title, disabled, isLeft = false, color = null, onClick}: Props){
    return(
        <>
            {href &&
            <Link href={href}>
                <a className={classnames(style.secondary, (isLeft) ? style.isLeft : '', style[color])} target={(target) ? target : ''}>
                    {title}
                </a>
            </Link>
            }
            {!href &&
            <button
                disabled={disabled ? disabled : false}
                onClick={onClick}
                className={classnames(style.secondary, (isLeft) ? style.isLeft : '')}>
                    {title}
            </button>

            }

        </>
    )
}

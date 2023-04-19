import style from "./buttons.module.scss";
import Link from "next/link";

type Props = {
    href?: string
    target?: string
    title: string
    disabled?: boolean
    onClick?: () => void
}

export default function ButtonText({href, target, title, disabled, onClick}: Props){
    return(
        <>
            {href &&
            <Link href={href}>
                <a className={style.text} target={(target) ? target : ''}>
                    {title}
                </a>
            </Link>
            }
            {!href &&
            <button
                disabled={disabled ? disabled : false}
                onClick={onClick}
                className={style.text}>
                    {title}
            </button>

            }

        </>
    )
}

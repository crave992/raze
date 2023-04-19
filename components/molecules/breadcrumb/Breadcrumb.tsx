import style from "./breadcrumb.module.scss";
import Link from "next/link";
import React from "react";

export default function Breadcrumb({links}){

    return(
        <>
            {links.length > 1 &&
            <div className={style.breadcrumb}>
                <div className={`section__inner`}>
                    {links && links.map((link, i) => {
                        return(
                            <React.Fragment key={i}>
                                {link.link &&
                                <Link href={link.link}>
                                    <a>
                                        {link.text}
                                    </a>
                                </Link>
                                }
                                {!link.link && <span>{link.text}</span>}

                                {i < links.length - 1 ? " / " : null}
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
            }
        </>
    )

}
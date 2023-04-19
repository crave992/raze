import Link
    from "next/link";
import style
    from "./footer.module.scss";
import {useTranslation} from "next-i18next";
import Image
    from "next/image";

export default function Footer(props) {

    const {t} = useTranslation('common');

    const getYear = () => {
        return new Date().getFullYear();
    }

    const footerContent = props.footerContent;
    // console.log(footerContent);
    return (
        <footer className={style.footer}>
            <div className={style.footer__section}>
                <div className={`section__inner`}>
                    {footerContent &&
                    <div className={style.about__raze}>
                        {footerContent.logo &&
                        <Image
                            src={footerContent.logo}
                            width={180}
                            height={180}
                            objectFit={`contain`}
                        />
                        }
                        {footerContent.body &&
                        <div dangerouslySetInnerHTML={{__html: footerContent.body}}></div>
                        }
                        <div className={style.social}>
                            {footerContent.fb_link &&
                            <Link href={footerContent.fb_link.url}>
                                <a target={`_blank`} className={style.fbLink}></a>
                            </Link>
                            }
                            {footerContent.ig_link &&
                            <Link href={footerContent.ig_link.url}>
                                <a target={`_blank`} className={style.igLink}></a>
                            </Link>
                            }
                        </div>
                    </div>
                    }
                    {props.menu && (
                        <div className={style.footer__menu}>
                            <nav>
                                <ul>{props.menu.map((menuItem, i) => (
                                    <li key={i}>
                                        <Link href={menuItem.relative}>
                                            <a target={(menuItem.external) ? `_blank` : ''}>{menuItem.title}</a>
                                        </Link>
                                        {menuItem.below &&
                                        <ul>
                                            {menuItem.below.map((subMenuItem, i) => (
                                                <li key={i}>
                                                    <Link href={subMenuItem.relative}>
                                                        <a target={(subMenuItem.external) ? `_blank` : ''}>{subMenuItem.title}</a>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                        || null}
                                    </li>
                                ))}</ul>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
            <div className={style.site__info}>
                <div className={`section__inner`}>
                    <div className={style.copyright}>{t('copyright', {year: getYear()})}</div>
                    <div className={style.siteBy}>
                        Site by <Link href={`https://www.rushhourdigital.com`}>
                        <a target={`_blank`}>Rush Hour Digital</a></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

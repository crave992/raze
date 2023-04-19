import Link
    from "next/link";
import style
    from "./header.module.scss";
import {useRouter} from 'next/router';
import useStore
    from "../../../store/store";
import {
    useEffect,
    useState
} from "react";
import Image
    from "next/image";
import logo
    from "../../../assets/Logo.png";
import Head
    from "next/head";
import classnames
    from "classnames";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";

export default function Header(props) {

    const router = useRouter();
    const isLoggedIn = useStore(state => state.isLoggedIn);

    const [blockContent, setBlockContent] = useState([]);
    const [activeMega, setActiveMega] = useState('');
    const [currentLang, setCurrentLang] = useState('');

    const [mounted, setMounted] = useState(false);
    const [megaStatus, setMegaStatus] = useState(false);
    const [switcherStatus, setSwitcherStatus] = useState(false);

    const cartTotalItems = useStore(state => state.cartTotalItems);

    useEffect(() => {
        setMounted(true);
        if(router.locale == 'en-US') {
            setCurrentLang('EN');
        }else if(router.locale == 'zh-Hant') {
            setCurrentLang('繁體');
        }else if(router.locale == 'zh-Hans') {
            setCurrentLang('简体');
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });


    /* Method that will fix header after a specific scrollable */
    const isSticky = (e) => {
        const header = document.getElementById('site-header');
        const scrollTop = window.scrollY;
        scrollTop >= 250 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
    };


    const currentPage = (alias) => {
        return router.asPath.includes(alias);
    }

    const handleOpenMegaMenu = (blocks, i) => {
        setBlockContent(blocks);
        setMegaStatus(true);
        document.getElementById('site-header').classList.add(style.megaMenuOpened);
        setActiveMega(i);
    }

    const handleCloseMegaMenu = () => {
        setBlockContent([]);
        setMegaStatus(false);
        document.getElementById('site-header').classList.remove(style.megaMenuOpened);
        setActiveMega('');
    }

    return (
        <header id={`site-header`} className={classnames(style.siteHeader)}>
            {router &&
                <div className={style.preMenu}>
                    <div className={'section__inner'}>
                        <div className={style.languageSwitcher}>
                            <div className={style.currentLanguage} onClick={() => setSwitcherStatus(!switcherStatus)}>{currentLang}</div>
                            {switcherStatus &&
                            <ul>
                                <li className={(router.locale == 'en-US') ? style.hide : ''}>
                                    <Link href={router.asPath} locale='en-US'>
                                        <a>EN</a>
                                    </Link>
                                </li>
                                <li className={(router.locale == 'zh-Hant') ? style.hide : ''}>
                                    <Link href={router.asPath} locale='zh-Hant'>
                                        <a>繁體</a>
                                    </Link>
                                </li>
                                <li className={(router.locale == 'zh-Hans') ? style.hide : ''}>
                                    <Link href={router.asPath} locale='zh-Hans'>
                                        <a>简体</a>
                                    </Link>
                                </li>
                            </ul>
                            }
                        </div>
                    </div>
                </div>
            }
            <div className={style.mainMenu}>
                <div className={'section__inner'}>
                    <div className={style.headerLogo}>
                        <Link href={`/`}>
                            <a>
                                <Image
                                    src={logo}
                                    width={192}
                                    height={72}
                                />
                            </a>
                        </Link>
                    </div>
                    <div className={classnames(style.headerInner, 'headerRightColumn')}>
                        {props.menu && (
                            <nav className={style.mainNav}>
                                <ul>
                                    {props.menu && props.menu.map((menuItem, i) => {
                                        return (
                                            <li key={i} className={classnames((currentPage(menuItem.alias)) ? style.active : '', (activeMega === i) ? style.active : '')}>
                                                {menuItem.relative &&
                                                <Link href={menuItem.relative === '' ? '/' : menuItem.relative}>
                                                    <a>{menuItem.title}</a>
                                                </Link>
                                                ||
                                                <div className={style.menuItem} onClick={() => handleOpenMegaMenu(menuItem.blocks, i)}>{menuItem.title}</div>
                                                }
                                            </li>
                                        )
                                    })}
                                </ul>
                            </nav>
                        )}
                        {mounted &&
                        <div className={style.headerOthers}>
                            <div>
                                <Link href="/search">
                                    <a className={`btn__search`}></a>
                                </Link>
                            </div>
                            <div>
                                <Link href="/cart">
                                    <a className={`btn__cart`}>
                                        <span>{cartTotalItems}</span>
                                    </a>
                                </Link>
                            </div>
                            {isLoggedIn &&
                            <div>
                                <Link href="/account/me">
                                    <a className={`btn__account`}></a>
                                </Link>
                            </div>
                            }
                            {!isLoggedIn &&
                            <div>
                                <Link href="/login">
                                    <a className={`btn__login`}></a>
                                </Link>
                            </div>
                            }
                        </div>
                        }
                    </div>
                </div>
            </div>
            {blockContent && megaStatus &&
            <div className={style.megaMenu}>
                <div className={'section__inner'}>
                    <div className={style.megaClose} onClick={()=>handleCloseMegaMenu()}>&nbps;</div>
                    {blockContent.map((row, i) => {
                        return (
                            <div className={style.megaRow} key={i}>
                                {row.title &&
                                <div className={style.rowTitle}>{row.title}</div>
                                }
                                {Object.keys(row.block).length &&
                                <div className={style.blockRow}>
                                    {row.block.map((block, i) => (
                                        <div className={style.block} key={i}>
                                            {block.title &&
                                            <div className={style.blockTitle}>{block.title}</div>
                                            }
                                            {block.description &&
                                            <div className={style.blockDescription} dangerouslySetInnerHTML={{__html: block.description}}></div>
                                            }
                                            {Object.keys(block.links).length &&
                                            <div className={style.blockLinks}>
                                                {block.links.map((link, i) => (
                                                    <Link href={link.url} key={i}><a target={(link.isExternal) ? '_blank' : ''} onClick={()=>handleCloseMegaMenu()}>{link.title}</a></Link>
                                                ))}
                                            </div>
                                            || null}
                                        </div>
                                    ))}
                                </div>
                                }
                                {Object.keys(row.link).length &&
                                <div className={style.rowLink}>
                                    <ButtonSecondary title={row.link.title} href={row.link.url} target={(row.link.isExternal) ? '_blank' : ''} color={`white`} onClick={handleCloseMegaMenu}/>
                                </div>
                                || null}
                            </div>
                        )
                    })}
                </div>
            </div>
            }
        </header>
    )
}

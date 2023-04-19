import style
    from "./card-article.module.scss"
import Image
    from "next/image"
import Link
    from "next/link"
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";
import {useTranslation} from "next-i18next";
import classnames
    from "classnames";

export default function CardArticle(props) {
    let isHideImage = (props.hideImage) ? true : false;
    const {t} = useTranslation('common');
    return (
        <Link href={props.path}>
            <div className={classnames(style.card, `cardArticle`)}>
                {!isHideImage && props.image &&
                <div className={style.image}>
                    <Image
                        src={props.image.url}
                        alt={props.image.alt}
                        width={620}
                        height={460}
                    />
                </div>
                }
                {props.category &&
                <div className={style.category} dangerouslySetInnerHTML={{__html:props.category.name}}></div> || null}
                <h3 className={style.title} dangerouslySetInnerHTML={{__html:props.title}}></h3>
                <div className={style.created}>{props.created}</div>
                {props.body[0]['summary'] &&
                <div dangerouslySetInnerHTML={{__html: props.body[0]['summary']}} className={style.summary}></div>
                }
                <div className={style.link}>
                <ButtonSecondary title={t('viewMore')}/>
                </div>
            </div>
        </Link>
    );
}

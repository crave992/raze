import style
    from './cardCertificate.module.scss';
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";
import {useTranslation} from "next-i18next";

type Props = {
    certificate: Array<any>
}

export default function CardCertificate(content: Props) {
    const {t} = useTranslation('common');
    const certificate = content.certificate;
    return (
        <div className={style.certificate} key={certificate['nid']}>
            <h3 className={style.title} dangerouslySetInnerHTML={{__html:certificate['title']}}></h3>
            <div className={style.description} dangerouslySetInnerHTML={{__html:certificate['body']}}></div>
            <ButtonSecondary title={t('certificate.download')} href={certificate['file']} target={`_blank`}/>
        </div>
    )
}

import style from './other-showcase.module.scss';
import {useTranslation} from "next-i18next";
import CardShowcase
    from "@molecules/cards/showcase/CardShowcase";

type Props = {
    section:{
        showcase: Array<any>
    }
}

export default function OtherShowcase(props:Props) {
    const content = props.section;
    const {t} = useTranslation('common');
    return (
        <section className={style.otherShowcase}>
            <div className={`section__inner`}>
                <h2 className={`section__title_2`}>{t('showcase.other')}</h2>
                {content.showcase.length &&
                <div className={style.showcases}>
                    {content.showcase.map((showcase, i ) => (
                        <CardShowcase showcase={showcase}/>
                    ))}
                </div>
                }
            </div>
        </section>
    )
}

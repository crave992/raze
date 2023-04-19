import Layout
    from "@site/layout/Layout";
import withGlobalData
    from "@util/withGlobalData";
import style from './404.module.scss';
import {useTranslation} from "next-i18next";
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";
import image from "assets/404.jpg";

export default function Custom404(props) {
    const {t} = useTranslation('common');
    console.log(image);
    return (
        <Layout globals={props.globals}>
            <section className={style.custom404}>
                <div className={`section__inner`}>
                    <div className={style.wrapper}>
                        <div className={style.image}>
                            <div className={`rotateCircle`}></div>
                            <img src={image.src} alt={t('404.title')}/>
                        </div>
                        <div className={style.content}>
                            <h1 className={`node__title`}>{t('404.title')}</h1>
                            <ButtonSecondary title={t('404.button')} href={'/'}/>
                        </div>
                    </div>
                </div>
            </section>

        </Layout>
    )
}


export const getStaticProps = withGlobalData(context => {

    const props = {};
    return {
        props,
        revalidate: 5
    }

});

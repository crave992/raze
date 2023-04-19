import style
    from './solutions.module.scss';
import Image
    from "next/image"
import ButtonSecondary
    from "@atoms/buttons/ButtonSecondary";
import {pad} from "@util/helper";
import {useTranslation} from "next-i18next";
import classnames
    from "classnames";

type Props = {
    section: {
        field_headline: string,
        field_solutions: Array<string>,
    }
}

export default function Solutions(props: Props) {
    let content = props['section'];
    const {t} = useTranslation('common');
    return (
        <section className={style.solutions}>
            <div className={`section__inner`}>
                {content.field_headline &&
                <h3 className={classnames(`section__headline`,`orange`)}>{content.field_headline}</h3>
                }
                {Object.keys(content.field_solutions).length &&
                <div className={style.solutionsContent}>
                    {content.field_solutions.map((solution, i) => {
                        return (
                            <div className={style.solution} key={i}>
                                {Object.keys(solution['field_media_image']).length &&
                                <div className={style.image}>
                                    <Image src={solution['field_media_image'][0]['url']} alt={solution['field_media_image'][0]['alt']} layout={`responsive`} width={720} height={930}/>
                                </div>
                                || null }
                                <div className={style.content}>
                                    <div className={style.number} dangerouslySetInnerHTML={{__html: pad((i + 1))}}></div>
                                    {solution['field_title'] &&
                                    <h2 className={style.title}>{solution['field_title']}</h2>
                                    }
                                    {solution['field_description'] &&
                                    <div className={style.description} dangerouslySetInnerHTML={{__html: solution['field_description']}}></div>
                                    }
                                    {Object.keys(solution['field_link']).length &&
                                    <ButtonSecondary title={solution['field_link'][0]['title']} href={solution['field_link'][0]['url']}/>
                                    }
                                    <div className={style.products}>
                                        {Object.keys(solution['field_products']).length &&
                                        <>
                                            {solution['field_products'].map((product, k) => {
                                                return (
                                                    <div className={style.product} key={k}>
                                                        <a href={product['path']}>
                                                            {Object.keys(product['field_media_image']).length &&
                                                            <Image src={product['field_media_image'][0]['url']} alt={product['field_media_image'][0]['alt']} layout={`fill`} objectFit={`cover`}/>
                                                            || null }
                                                            <div className={style.productTitle}>{product['title']}</div>
                                                        </a>
                                                    </div>
                                                )
                                            })}
                                        </>
                                        ||
                                        <div className={classnames(style.product, style.noLink)}>
                                            <a>
                                                <div className={style.productTitle}>{t('product.comingSoon')}</div>
                                            </a>
                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                }
            </div>
        </section>
    )
}

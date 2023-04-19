import style
    from './table.module.scss';
import {useState} from "react";
import classnames
    from "classnames";

type Props = {
    section: {
        field_title: string,
        field_description: string,
        field_media_image: Array<any>,
        field_tabs_table: Array<any>
    }
}

export default function Table(props: Props) {
    const content = props.section;
    const [activateTab, setActivateTab] = useState(0);
    console.log(content);
    return (
        <section className={style.introWithTable}>
            <div className={`section__inner`}>
                <div className={style.intro}>
                    <div className={style.title}>
                        <h2 className={`section__title_2`} dangerouslySetInnerHTML={{__html: content.field_title}}></h2>
                        {content.field_media_image.length &&
                        <img src={content.field_media_image[0]['url']} alt={content.field_media_image[0]['alt']}/>
                        }
                    </div>
                    <div className={classnames(`section__description`, `small`)} dangerouslySetInnerHTML={{__html: content.field_description}}></div>
                </div>
                <div className={style.tabNavs}>
                    {content.field_tabs_table.map((tab, i) => (
                        <div
                            key={i}
                            className={classnames(style.tabNav, (activateTab === i) ? style.activated : '')}
                            onClick={() => setActivateTab(i)}
                            dangerouslySetInnerHTML={{__html: tab.field_title}}>
                        </div>
                    ))}
                </div>
                <div className={classnames(style.tabContent)}>
                    {content.field_tabs_table[activateTab].field_tab_table.length &&
                    <>
                        {content.field_tabs_table[activateTab].field_tab_table.map((tabContent, i) => (
                            <div key={i}>
                                <div className={style.tHeads}>
                                    {tabContent.field_table_head.map((value, i) => (
                                        <div className={style.tHead} dangerouslySetInnerHTML={{__html: value}} key={i}></div>
                                    ))}
                                </div>
                                <div className={style.tRows} key={i}>
                                    {tabContent.field_table_row.map((row, i) => (
                                        <div className={style.tRow} key={i}>
                                            {row.field_row_content.map((content, i) => (
                                                <div className={style.tContent} key={i}>
                                                    <div dangerouslySetInnerHTML={{__html: content}}></div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </>
                    }
                </div>
            </div>
        </section>
    )
}

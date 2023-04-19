import style
    from './tabs.module.scss';
import {useState} from "react";
import classnames
    from "classnames";
import Image
    from "next/image";

type Props = {
    section: {
        field_tabs: Array<any>
    }
}

export default function Tabs(props: Props) {
    const tabs = props.section.field_tabs;
    const [activateTab, setActivateTab] = useState(0);
    if (tabs) {
        return (
            <section className={style.tabs}>
                <div className={`section__inner`}>
                    <div className={style.tabNavs}>
                        {tabs.map((tab, i) => (
                            <div
                                key={i}
                                className={classnames(style.tabNav, (activateTab === i) ? style.activated : '')}
                                onClick={() => setActivateTab(i)}>
                                {tab.field_title}
                            </div>
                        ))}
                    </div>
                    <div className={classnames(style.tabContent)}>
                        {tabs[activateTab].field_tab_content.length &&
                        <>
                            {tabs[activateTab].field_tab_content.map((tabContent, i) => (
                                <div className={style.contentRow} key={i}>
                                    <div className={style.content}>
                                        <h3 className={`section__title_2`}>{tabContent.field_title}</h3>
                                        <div className={style.description} dangerouslySetInnerHTML={{__html: tabContent.field_description}}></div>
                                    </div>
                                    <div className={style.image}>
                                        <Image src={tabContent.field_media_image[0]['url']} alt={tabContent.field_media_image[0]['alt']} width={744} height={480}/>
                                    </div>
                                </div>
                            ))}
                        </>
                        }
                    </div>
                </div>
            </section>
        )
    } else {
        return null;
    }
}

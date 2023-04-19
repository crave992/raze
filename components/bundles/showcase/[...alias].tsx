import style from './showcase.module.scss';
import {useTranslation} from "next-i18next";
import Image
    from "next/image";
import classnames
    from "classnames";
import Section
    from "@util/Section";

export default function Showcase(props) {
    const {t} = useTranslation('common');
    const node = props.node;
    console.log(node);
    return (
      <div className={style.showcase}>
          <section className={style.banner}>
              <div className={style.mediaWrapper}>
                  <Image
                      src={node['field_media_image'][0]['url']}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      alt={node['field_media_image'][0]['alt']}
                  />
              </div>
              <div className={style.contentWrapper}>
                  <div className={`section__inner`}>
                      <h2 className={classnames(`section__headline`, `white`)} dangerouslySetInnerHTML={{__html: node['field_showcase_type'][0]['name']}}></h2>
                      <h1 className={classnames(`node__title`, `white`)}>{node['title']}</h1>
                  </div>
              </div>
          </section>
          <section className={classnames(style.body, `section__inner`)}>
              <h2 className={classnames(`section__headline`, `dark-blue`)}>{t('showcase.mission')}</h2>
              <div className={style.bodyText} dangerouslySetInnerHTML={{__html:node['body'][0]['value']}}></div>
          </section>
          {node.field_sections && node.field_sections.map(section =>
              <Section key={section.paragraph.uuid} section={section}/>
          )}
      </div>
    )
}

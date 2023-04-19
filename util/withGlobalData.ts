import {restGet} from "@api/rest";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

export default function withGlobalData(getStaticProps) {
    return async (context) => {

        let lang = (context.locale === 'en-US' || context.locale === undefined) ? '' : context.locale;
        lang = lang.toLowerCase();

        if(lang) {
            lang = lang + '/';
        }

        const globalLink = await restGet(`${lang}rhm-site-settings?_format=json&section=global_link`);
        // const mainMenu = await restGet(`${lang}rhm-menu?_format=json&menu_name=main`);
        // const footerMenu = await restGet(`${lang}api/menu_items/footer`);
        // const footerContent = await restGet(`${lang}rhm-site-settings?_format=json&section=footer_content`);
        const mainMenu = [];
        const footerMenu = [];
        const footerContent = [];
        const staticProps = await getStaticProps(context);

        const globals = {globalLink, mainMenu, footerMenu, footerContent};

        const props = {
            globals,
            ...staticProps.props,
            ...(await serverSideTranslations(context.locale, ['common']))
        }

        return {...staticProps, props};
    };
}

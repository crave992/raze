import dynamic from 'next/dynamic';

const paraMap = {
    'section_general_content': dynamic(()=>import("@sections/general/General")),
    'section_introduction': dynamic(()=>import("@sections/introduction/Introduction")),
    'section_banner': dynamic(() => import("@sections/banner/Banner")),
    'section_homepage_banner': dynamic(() => import("@sections/homepage_banner/HomepageBanner")),
    'section_solutions': dynamic(() => import("@sections/solutions/Solutions")),
    'section_our_vision': dynamic(() => import("@sections/our_vision/OurVision")),
    'section_services': dynamic(() => import("@sections/services/Services")),
    'section_our_technology': dynamic(() => import("@sections/our_technology/OurTechnology")),
    'section_testimonials': dynamic(()=>import("@sections/testimonials/Testimonials")),
    'section_explore_more': dynamic(()=>import("@sections/explore/Explore")),
    'section_cta': dynamic(()=>import("@sections/cta/CTA")),
    'section_cta_2': dynamic(()=>import("@sections/cta/CTA2")),
    'section_feature_list': dynamic(()=>import("@sections/feature_lists/FeatureLists")),
    'section_slider': dynamic(()=>import("@sections/sliders/Sliders")),
    'section_contact_us': dynamic(()=>import("@sections/contact_us/ContactUs")),
    'section_faq': dynamic(()=>import("@sections/faq/FAQ")),
    'section_we_provide': dynamic(()=>import("@sections/we_provide/weProvide")),
    'section_gallery': dynamic(()=>import("@sections/gallery/Gallery")),
    'section_clients': dynamic(()=>import("@sections/clients/Clients")),
    'section_responsibility': dynamic(()=>import("@sections/responsibility/Responsibility")),
    'section_tabs': dynamic(() =>import("@sections/tabs/Tabs/Tabs")),
    'section_table_with_introduction': dynamic(()=>import("@sections/tabs/Table/Table")),
    'section_certificate': dynamic(() =>import("@sections/certificate/Certificate")),
    'section_content_box': dynamic(() => import("@sections/content_box/ContentBox")),
    'section_anchor_with_content': dynamic(()=>import("@sections/anchor/Anchor")),
    'section_title_content_image': dynamic(()=>import("@sections/title_desc_image/TitleDescImage")),
    'section_paint_description': dynamic(()=>import("@sections/paint_description/PaintDescription")),
    'section_quick_actions': dynamic(()=>import("@sections/quick_actions/QuickActions")),
    // Articles
    'section_all_news': dynamic(() => import("@sections/news/all/AllNews")),
    'section_latest_news': dynamic(()=>import("@sections/news/latest_news/LatestNews")),
    'section_featured_articles': dynamic(() => import("@sections/news/featured_articles/FeaturedArticles")),
    'section_article_content': dynamic(()=>import("@sections//news/article_content/ArticleContent")),
    // Product
    'product_section_feature': dynamic(()=>import("@sections/products/feature/Feature")),
    'product_section_related': dynamic(()=>import("@sections/products/related/Related")),
    'product_section_highlight': dynamic(()=>import("@sections/products/highlight/Highlight")),
    'product_section_how_it_works': dynamic(()=>import("@sections/products/howItWorks/HowItWorks")),
    'section_product_by_type': dynamic(()=>import("@sections/products/byType/byType")),
    'section_product_special': dynamic(()=>import("@sections/products/special/Special")),
    'section_product_archive': dynamic(()=>import("@sections/products/archive/Archive")),
    // Showcase
    'section_other_showcase': dynamic(()=>import("@sections/showcase/other_showcase/OtherShowcase")),
    'section_showcase_banner': dynamic(()=>import("@sections/showcase/banner/ShowcaseBanner")),
    'section_client_speak': dynamic(()=>import("@sections/showcase/client_speak/ClientSpeak")),
    'section_all_showcase':dynamic(()=>import("@sections/showcase/all/AllShowcases")),
    // Store Locator
    'section_store_banner': dynamic(()=>import("@sections/store_locator/banner/Banner")),
    'section_store_locator': dynamic(()=>import("@sections/store_locator/list/List"))
};

export default function Section(props){

    const type = props.section.bundle;
    const Paragraph = paraMap[type] ? paraMap[type] : null;

    return(
        <>
            {Paragraph && <Paragraph section={props.section.paragraph} />}
        </>
    )
}

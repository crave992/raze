import CustomPage from "@bundles/custom_page/CustomPage";
import ProductDisplay from "@bundles/products/[...alias]";
import Showcase from "@bundles/showcase/[...alias]";
import Article from "@bundles/article/[...alias]";

const bundleMap = {
    article: Article,
    product_display: ProductDisplay,
    custom_page: CustomPage,
    showcase: Showcase
};

export default bundleMap;

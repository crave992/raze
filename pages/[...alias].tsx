import {restGet} from "@api/rest";
import Layout from "@site/layout/Layout";
import bundleMap from "@util/bundleMap";
import Meta from "@util/Meta";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import withGlobalData from "@util/withGlobalData";

const Alias = (props) => {
    let Bundle = null;

    if(props.node){
        Bundle = bundleMap[props.node.bundle] ? bundleMap[props.node.bundle] : null;
    }

    return(
        <>
        <Meta node={props.node} />
        <Layout globals={props.globals}>
            {Bundle && <Bundle node={props.node}/>}
        </Layout>
        </>
    )

};

export async function getStaticPaths({ locales }) {

    // Only include this if required to pre-build pages
    // const aliases = await restGet(`/rhm-alias-list?_format=json`);
    // const paths = [];
    // locales.forEach((locale, i) => (
    //     aliases.forEach(alias => (
    //         paths.push({params: {alias: [alias]}, locale: locale})
    //     ))
    // ));
    // return {
    //     paths: paths,
    //     fallback: 'blocking'
    // };

    return {
        paths: [],
        fallback: 'blocking'
    };
}

export const getStaticProps = withGlobalData(context => {

    const { alias } = context.params;

    return restGet(`rhm-alias?_format=json&slug=${alias.join('/')}&lang=${context.locale}`)
        .then((node) => {
            if(!node || !node.bundle) return {notFound: true}
            const props = {node};
            return {props, revalidate: 5}
        });
});



export default Alias;

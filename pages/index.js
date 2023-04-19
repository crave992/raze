import {restGet} from "../api/rest";
import Section from "../util/Section";
import Layout from "../components/site/layout/Layout";
import withGlobalData from "@util/withGlobalData";

export default function Home(props) {
    
    return (
        <Layout globals={props.globals}>
            <article>
                {props.node.field_sections && props.node.field_sections.map((section, index) =>
                    <Section key={section.paragraph.uuid} section={section} />
                )}
            </article>
        </Layout>
    )
}


export const getStaticProps = withGlobalData(context => {

    return restGet(`rhm-alias?_format=json&slug=&lang=${context.locale}`)
        .then((node) => {
            if(!node || !node.bundle) return {notFound: true}
            const props = {node};
            return {props, revalidate: 5}
        });
});

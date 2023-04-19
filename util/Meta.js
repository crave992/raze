import Head from "next/head";

export default function Meta(props){
    return(
        <Head>
            <meta charSet='UTF-8'/>
            {props.node.meta.title &&
                <title>{decodeURI(props.node.meta.title)}</title>
            }
            {props.node.meta.description &&
                <meta name="description" content={props.node.meta.description} />
            }
            {props.node.meta.keywords &&
                <meta name="keywords" content={props.node.meta.keywords} />
            }
        </Head>
    )
}

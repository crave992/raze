import {useRouter} from "next/router";
import withGlobalData from "@util/withGlobalData";
import {useEffect} from "react";

const Account = (props) => {
    const router = useRouter();

    useEffect(() => {
        router.push('/account/me');
    }, []);

    return(<div></div>)
}

export const getStaticProps = withGlobalData(context => {

    const props = {auth: true};
    return {props, revalidate: 5}

});

export default Account;

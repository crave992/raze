import withAuth from "@util/withAuth";
import Layout from "@site/layout/Layout";
import AccountLayout from "@site/layout/AccountLayout";
import withGlobalData
    from "@util/withGlobalData";


const Password = (props) => {
    return(
        <Layout globals={props.globals}>
            <AccountLayout>
                <h1>Change Password</h1>
            </AccountLayout>
        </Layout>
    )
};

export const getStaticProps = withGlobalData(context => {

    const props = {auth: true};
    return {props, revalidate: 5}

});

export default withAuth(Password);
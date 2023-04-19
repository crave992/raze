import { useRouter } from "next/router";
import useStore from "@store/store";


const withAuth = (WrappedComponent) => {
  return (props) => {

      if (typeof window !== "undefined") {
          const Router = useRouter();

          const isLoggedIn = useStore(state => state.isLoggedIn);

          if (!isLoggedIn) {
              Router.replace("/");
              return null;
          }

          return <WrappedComponent {...props} />;
      }

      return null;
  }

};

export default withAuth;
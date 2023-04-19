import {restPost, restGet} from "@api/rest";
import useStore from "@store/store";
import Router from 'next/router'
import {useState} from "react";


/**
 * Log in
 * @param email
 * @param password
 * @returns {Promise<{json, status}|Response>}
 */
export const logIn = async (email, password) => {

    const setUser = useStore.getState().setUser;

    const res = await restPost('user/email-login?_format=json', {
        mail: email,
        pass: password
    });

    if(res.status === 200){
        console.log('setting user');
        setUser({
            name: res.json.current_user.name,
            logoutToken: res.json.logout_token
        });
    }

    return res;
};

 /**
 * Logout
 */
export const logOut = async () => {

    // const logoutToken = useStore.getState().user.logoutToken;
    const unsetUser = useStore.getState().unsetUser;

    // might need ... ?
    const refreshToken = await restGet(`rhm-refresh-logout-token?_format=json`);

    if(refreshToken) {

        // const res = await restPost(`user/logout?_format=json&token=${logoutToken}`, {});
        const res = await restPost(`user/logout?_format=json&token=${refreshToken}`, {});

        if(res.status === 204){
            await Router.push('/');
            unsetUser();
        }
        return res;
    }
};

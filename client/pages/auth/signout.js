import { useEffect } from "react";
import Router from "next/router";

import useRequest from "../../hooks/use-request";


const SignOutPage = () => {

    const {doRequest} = useRequest({
       url: '/api/users/signout',
       method: 'post',
       body: {},
       onSuccess: () => Router.push('/')
    
    });

    useEffect(() => {
        doRequest();
    }, []);

    return (
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 flex justify-center">
            <p className="text-lg">Signing you out...</p>
        </div>
    );
};

export default SignOutPage;
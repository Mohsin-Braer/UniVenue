import { useState } from 'react';
import Router from 'next/router';

import { signupFields } from './auth-fields';
import AuthInput from "./auth-input";
import useRequest from '../../hooks/use-request';

const fields = signupFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

const SigninBody = () => {
    //const [signupState, setSignupState] = useState(fieldsState); //generic state 
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {doRequest, errors} = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => Router.push('/')
    });

    const handleEmailChange = (e) => {setEmail(e.target.value);}
    const handlePasswordChange = (e) => {setPassword(e.target.value);}
    let values = [email, password]; 


    const onSubmit = async (event) => {
        event.preventDefault();

        doRequest();
    };



    return(
        <form onSubmit={onSubmit} className="mt-6 space-y-6 md:justify-center mx-20">
            <div className="">

                {errors} 

                <AuthInput
                    handleChange={ handleEmailChange}
                    value={values[0]}
                    labelText='Email Address'
                    isRequired={true}
                    placeholder='Email Address'
                />

                <AuthInput
                    handleChange={handlePasswordChange}
                    value={values[1]}
                    labelText='Password'
                    type= 'password'
                    isRequired={true}
                    placeholder='Password'
                />
            
            </div>
            <button
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10">
                Sign In
            </button>
        </form>

    )
}

export default SigninBody;
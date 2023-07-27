import axios from "axios";
import { useState } from "react";

const useRequest = ({url, method, body, onSuccess}) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async (props = {}) => { //custom hook to handle requests to server and display of any error messages
        try{
            setErrors(null);
            const response = await axios[method](url, { ...body, ...props });

            if(onSuccess){
                onSuccess(response.data);
            }

            return response.data;
        } catch(err){
            setErrors(
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                        <p className='font-bold'>Warning</p>
                        <ul className="my-0">
                            {err.response.data.errors.map(err => (
                                <li key={err.message}>{err.message}</li>
                            ))}
                        </ul>
                </div>
            )
        
        }
    }

    return { doRequest, errors};
};

export default useRequest;
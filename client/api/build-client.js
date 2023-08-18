import axios from "axios";
import { headers } from "next/dist/client/components/headers";

const buildClient = ({req}) => {
    if(typeof window === 'undefined'){

        return axios.create({
            baseURL: "http://www.univenue-app-prod.site/",
            headers: req.headers,
        })
    }else{
        return axios.create({
            baseURL: '/'
        })
    }
};

export default buildClient;
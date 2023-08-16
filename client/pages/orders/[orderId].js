import { useEffect, useState } from "react";
import Router from 'next/router';
import useRequest from "../../hooks/use-request";
import StripeCheckOut from 'react-stripe-checkout';

const OrderDetailsPage = ({ order, currentUser }) => {

    const [timeRemaining, setTimeRemaining] = useState(0);
    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id
        },
        onSuccess: () => Router.push('/orders')
    });

    useEffect(() => {
        const findTimeRemaining = () => {
            const minRemaining = new Date(order.expiresAt) - new Date();
            setTimeRemaining(Math.round(minRemaining / 1000));
        }

        findTimeRemaining();
        const timerId = setInterval(findTimeRemaining, 1000);

        return () => { //Whenever client navigates to a different page, return function is invoked to clear timer or else it will go forever
            clearInterval(timerId);
        };
    }, [order]); 

    if(timeRemaining < 0){
        return(
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 flex justify-center">
                <p className="py-5 font-mono text-2xl">Your order has expired</p>
            </div>
        );
    }

    return (
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 flex justify-center">
            <div className="flex flex-col justify-center">
                <p className="py-5 font-mono text-2xl"> <b className="countdown font-mono text-4xl">{timeRemaining}</b>seconds until order expires. Pay now</p>
                <StripeCheckOut 
                    token={({ id }) => doRequest({ token: id})}
                    stripeKey="pk_test_51LDerwAi7onYMkx1WKL7pdvaBa1tK9kYlTrecFsakiJk5d1RcnaujvdCxR0GJXloSjejyhozyp2Uy2fMso0M2SNx00eKHfYhAw"
                    amount={order.ticket.price * 100}
                    email={currentUser.email}
                />
                {errors}
            </div>
        </div>
                      
        
    );
};

OrderDetailsPage.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);
    
    return { order: data };
};

export default OrderDetailsPage;
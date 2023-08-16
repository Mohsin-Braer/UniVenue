


const OrderIndex = ({ orders }) => {

    const ordersList = orders.map((order) => {

        const legibleArray = (order.expiresAt).substring(0,10).split("-");
        const legibleDate = legibleArray[1] + '/' + legibleArray[2] + '/' + legibleArray[0];
        const statusColor = () =>  {
            if(order.status == 'complete'){
                return(
                    <div className="rounded-full bg-green-100 border border-green-500">
                        <p className="p-2 font-semibold text-xs text-green-500">Order {order.status}</p>
                    </div>
                )
            } else if(order.status === 'created'){
                return(
                    <div className="rounded-full bg-blue-100 border border-blue-500">
                        <p className="p-2 font-semibold text-xs text-blue-500">Order {order.status}</p>
                    </div>
                )
            } else if(order.status === 'awaiting:payment'){
                return(
                    <div className="rounded-full bg-yellow-100 border border-yellow-500">
                        <p className="p-2 font-semibold text-xs text-yellow-500">Order {order.status}</p>
                    </div>
                )
            } else{
                return(
                    <div className="rounded-full bg-red-100 border border-red-500">
                        <p className="p-2 font-semibold text-xs text-red-500">Order {order.status}</p>
                    </div>
                )
            }
        }

        return (

            <div key={order.id} className="border rounded-lg w-full">
                <div className="flex border-b w-full">
                    <div className="flex gap-3 py-2">
                        <div className="p-3 pl-6 lg:min-w-fit">
                            <p className="font-normal text-sm">Order ID</p>
                            <p className="font-thin text-sm text-gray-900">{(order.id)}</p>
                        </div>
                        <div className="p-3 ml-7 lg:min-w-fit">
                            <p className="font-normal text-sm">Date Placed</p>
                            <p className="font-thin text-sm text-gray-900">{legibleDate}</p>
                        </div>
                        <div className="p-3 ml-7 lg:min-w-fit">
                            <p className="font-normal text-sm">Total Amount</p>
                            <p className="font-normal text-sm">${order.ticket.price}</p>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 py-2 w-full">
                        <div className="p-3 mr-6 flex items-center justify-end">
                            {statusColor()}
                        </div>
                    </div>
                </div>


                <div className="p-6 flex w-full">
                    <div className="w-1/6">
                        <img src={order.ticket.location.imgUrl} className="rounded-lg shadow-md"></img>
                    </div>
                    <div className="w-5/6 px-7">
                        <div className="">
                            <div className="flex max-w-fit gap-5 text-md font-medium">
                                <div className="">
                                    <p className="">{order.ticket.title}</p>
                                </div>
                                <p>-</p>
                                <div className="flex justify-end">
                                    <p className="">${order.ticket.price}</p>
                                </div>
                            </div>
                            <div className="text-md font-[350] text-gray-600">
                                <p className="">{order.ticket.location.roomType}</p>
                                <p className="">{order.ticket.location.university}</p>
                                <p className="">{order.ticket.location.city}, {order.ticket.location.state}</p>
                            </div>
                        </div>
                       
                        
                    </div>
                </div>
            </div>
            
        );
    })
 
    

    return (
        <div className="h-screen py-3 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 justify-center bg-white dark:bg-gray-900 space-y-10">
            <div className="mb-20">
                <h2 className="font-semibold text-4xl mb-1">Order History</h2>
                <p className="font-light text-md text-gray-500">Check the status of recent orders</p>
            </div>
            
            {ordersList}
            
        </div>
    )

}

OrderIndex.getInitialProps = async (context, client) => {
    const { data } = await client.get('/api/orders');

    return {orders: data};
}

export default OrderIndex;
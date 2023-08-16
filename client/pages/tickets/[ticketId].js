import useRequest from '../../hooks/use-request';
import Router from 'next/router';


const TicketDetailsPage = ( { ticket } ) => {

    const {doRequest, errors} = useRequest({
        url: "/api/orders",
        method: "post",
        body: {
            ticketId: ticket.id,
        },
        onSuccess: (order) => Router.push("/orders/[orderId]", `/orders/${order.id}`)

    });

        var legibleDateArray = ticket.date.substring(0,10).split("-");
        var legibleDate = legibleDateArray[1] + '/' + legibleDateArray[2] + '/' + legibleDateArray[0]
        const legibleRoomId = () => {
            if(ticket.roomId != 'N/A' || ticket.roomId != 'NA'){
                return + ticket.roomId
            }

            return '';
        }

    return ( 

        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full lg:w-2/3 px-4 mb-8 lg:mb-0">
                        <img className="w-full rounded-lg shadow-lg" src={ticket.location.imgUrl} alt="Room Images"/>
                    </div>
                    <div className="w-full lg:w-1/3 px-4">
                        <h1 className="text-4xl font-bold mb-4">{ticket.title}</h1>
                        <p className="text-lg mb-6"></p>
                        <div className="mb-6">
                            <p className="text-xl font-bold mb-2">Availability Date:</p>
                            <p className="text-lg">{legibleDate}</p>
                        </div>
                        <div className="mb-6">
                            <p className="text-xl font-bold mb-2">Space Details:</p>
                            <p className="text-lg">{ticket.location.roomType} {legibleRoomId}</p>
                            <p className="text-lg">{ticket.location.university}</p>
                            <p className="text-lg">{ticket.location.city}, {ticket.location.state}</p>
                        </div>
                        <div class="mb-6">
                            <p className="text-xl font-bold mb-2">Price:</p>
                            <p className="text-lg">${ticket.price}</p>
                        </div>
                        {errors}
                        <button
                            className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => doRequest()}>
                            Purchase
                        </button>
                    </div>
                </div>
            </div>
        </div>

            
        )
};

TicketDetailsPage.getInitialProps = async (context, client) => {
    const { ticketId } = context.query;
    const { data } = await client.get(`/api/tickets/${ticketId}`);

    return { ticket: data };
};

export default TicketDetailsPage;
import Link from "next/link";
import Image from "next/image";


const TicketGalleryPage = ({ currentUser, tickets }) => {

    // const ticketList = tickets.map(ticket => {
    //     return(

    //         <tr key={ticket.id}>
    //             <td>{ticket.title}</td>  
    //             <td>{ticket.price}</td>  
    //             <td>
    //                 <Link className="flex items-center" href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
    //                     <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">View</span>
    //                 </Link>
    //             </td>
    //         </tr>
    //     ); 
    // })

    return (
        <div>
            {/* <div> */}

                <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
                    <div className="carousel-item">
                        <img src="/images/school-imgs/cherry.jpg" className="rounded-box" />
                    </div>  

                    <div className="carousel-item">
                        <img src="/images/school-imgs/kiwi.jpg" className="rounded-box" />
                    </div> 

                    <div className="carousel-item">
                        <img src="/images/school-imgs/tangerine.jpg" className="rounded-box" />
                    </div> 

                    <div className="carousel-item">
                        <img src="/images/school-imgs/watermelon.jpg" className="rounded-box" />
                    </div> 

                </div>

                {/* <h1>Tickets</h1>
                <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ticketList}
                        </tbody>
                </table>  */}
            {/* </div> */}
        </div>
        
    )
};

TicketGalleryPage.getInitialProps = async (context, client, currentUser) => {

    const { data } = await client.get('/api/tickets'); //de-structure res since data property is where list of tickets is stored
    
    return { tickets: data }; 
};

export default TicketGalleryPage;
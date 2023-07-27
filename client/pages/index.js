import Link from "next/link";

//Intro page to the site explaining the project and the overall architecture and technologies used
const LandingPage = () => {


    <Link className="flex items-center" href="/tickets/show">
        <span className="self-center text-xl font-semibold whitespace-nowrap text-black dark:text-white">Go To Ticket Gallery</span>
    </Link>

}

LandingPage.getInitialProps = async (context, client, currentUser) => {

    const { data } = await client.get('/api/tickets'); //de-structure res since data property is where list of tickets is stored
    
    return { tickets: data }; 
};
    
export default LandingPage;



//**** DEPRECATED */

// // export const TestingSomething = () => {  //Testing feature of adding img or video to background header div as seen on Seat Geek site
// //     return(
// //         <div >
                
// //         </div>
// //     );
// // }


// const LandingPage = ({ currentUser, tickets }) => {

//     const ticketList = tickets.map(ticket => {
//         return(
//             <tr key={ticket.id}>
//                 <td>{ticket.title}</td>  
//                 <td>{ticket.price}</td>  
//                 <td>
//                     <Link className="flex items-center" href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
//                         <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">View</span>
//                     </Link>
//                 </td>
//             </tr>
//         ); 
//     })

//     return (
//         <div>
//            <h1>Tickets</h1>
//            <table>
//                 <thead>
//                     <tr>
//                         <th>Title</th>
//                         <th>Price</th>
//                         <th>Link</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {ticketList}
//                 </tbody>
//            </table> 
//         </div>
//     )
// };

// LandingPage.getInitialProps = async (context, client, currentUser) => {

//     const { data } = await client.get('/api/tickets'); //de-structure res since data property is where list of tickets is stored
    
//     return { tickets: data }; 
// };

// export default LandingPage;


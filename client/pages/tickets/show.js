import Link from "next/link";
import Image from "next/image";
import { CollegeCategorySlider } from "../../components/marketplace-components/category-slider.styles";

const TicketGalleryPage = ({ currentUser, tickets, locations }) => {


    const ticketList = tickets.map((ticket) => {
        var input = ticket.date;
        var readableArray = input.substring(0,10).split("-");
        var readableDate = readableArray[1] + '/' + readableArray[2] + '/' + readableArray[0];
        

        return(

            <tr key={ticket.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {ticket.title}
                </th>
                <td className="px-6 py-4">
                    ${ticket.price}
                </td>
                <td className="px-6 py-4">
                    {readableDate}
                </td>
                <td className="px-6 py-4">
                    {ticket.location.university}
                </td>
                <td className="px-6 py-4">
                    {ticket.location.city}
                </td>
                <td className="px-6 py-4">
                    {ticket.location.state}
                </td>
                <td className="px-6 py-4 text-right">
                    <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</Link>
                </td>
            </tr>

        ); 
    })


    const schoolList = locations.map((location) => {
        return(
             <Link key={location.roomId} href='' className="">
                <div className={`relative py-3 mx-4 bg-cover bg-center shadow-lg rounded-lg my-[30px] flex-auto w-[278px] h-[130px] bg-gray-400 bg-blend-multiply transition duration-400 hover:scale-105`} style={{backgroundImage: `url('${location.imgUrl}')`}}>
                        <div>
                            <h2 className="absolute bottom-0 left-0 p-3 text-2xl font-semibold text-white">{location.university}</h2>
                        </div>
                </div>
            </Link>
    
        );

    });

    return (
        <div>

            <section id="location-indicator" className="bg-white dark:bg-gray-900 border-b">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:pt-16"> 
                    <p className="font-semibold text-md mb-1 text-gray-500">Browse Spaces</p>
                    <h2 className="mb-4 font-bold text-4xl">Boston, MA</h2>
                    <div className="flex gap-4">
                        <button className="inline-block rounded-full border-2 border-gray-200 px-6 pb-[6px] pt-2 text-xs font-medium text-gray-500 hover:border-gray-700">Change Location</button>
                        <button className="inline-block rounded-full border-2 border-gray-200 px-6 pb-[6px] pt-2 text-xs font-medium text-gray-500 hover:border-gray-700">Filter By Date</button>
                    </div>

                </div>
            </section>


            <section id="schools-carousel" className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16"> 
                    <h2 className="font-bold text-2xl">Universities</h2>   
                    <CollegeCategorySlider className="flex overflow-x-auto">
                        {schoolList}
                    </CollegeCategorySlider>
                </div>
            </section>



            <section id="ticket-table" className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:pt-10">
                    <h2 className="mb-3 font-bold text-2xl">All Available Spaces</h2>   
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 my-14">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Venue Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div class="flex items-center">
                                        Price
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div class="flex items-center">
                                        Date
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div class="flex items-center">
                                        University
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div class="flex items-center">
                                        City
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div class="flex items-center">
                                        State
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ticketList}
                        </tbody>
                    </table>   
                </div>
            </section>

                
         
        </div>
        
    )
};

TicketGalleryPage.getInitialProps = async (context, client, currentUser) => {

    const { data } = await client.get('/api/tickets'); //de-structure res since data property is where list of tickets is stored
    
    return { tickets: data.tickets, locations: data.locations }; 
};

export default TicketGalleryPage;
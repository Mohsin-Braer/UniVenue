import Link from "next/link";
import NavBarHeader from "../components/nav-bar";


//Intro page to the site explaining the project, the overall architecture and technologies used
const LandingPage = ({currentUser}) => {


    return (
        <div>
            <section className="h-screen w-full bg-cover bg-center bg-no-repeat bg-[url('/images/landing-page-imgs/uni-space-background.png')] bg-gray-700 bg-blend-multiply">
                <NavBarHeader currentUser={currentUser} confirmPrint={true}/>
                <div className=" h-full grid py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 animate-fadeOne">
                    <div className="place-self-center mr-auto lg:col-span-7">
                        <h1 className="mb-4 max-w-7xl text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl text-gray-200">Revolutionizing campus space utilization globally</h1>
                        <p className="mb-6 max-w-2xl font-light text-gray-400 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">From study rooms to arenas, universities around the world use UniVenue to monetize their unused space.</p>
                        <a href="/auth/signup" className="inline-flex justify-center items-center py-[14px] px-5 mr-3 text-base font-medium text-center rounded-lg overflow-hidden group bg-primary-700 relative hover:bg-gradient-to-r hover:from-primary-700 hover:to-primary-600 text-white hover:ring-2 hover:ring-offset-2 hover:ring-primary-500 transition-all ease-out duration-300 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                            <span className="relative">Get Started</span>
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </a>
                        <a href="/tickets/show" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-lg border border-gray-300 overflow-hidden group relative hover:bg-gradient-to-r hover:from-white hover:to-gray-100 text-white hover:text-gray-900 hover:ring-2 hover:ring-offset-2 hover:ring-gray-500 transition-all ease-out duration-300 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                            <span className="relative">Go to Marketplace</span>
                        </a>
                    </div>
                </div>
            </section>


            <section className="bg-white dark:bg-gray-900 animate-fadeTwo animation-delay-200">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
                    <h2 className="mb-8 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 lg:mb-16 dark:text-white md:text-4xl">Be Apart of an Elite Network</h2>
                    <div className="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 md:grid-cols-3 lg:grid-cols-6 dark:text-gray-400">
                        
                        <a href="https://www.bc.edu/" className="flex justify-center items-center grayscale-[70%] hover:grayscale-0 transition ease-out duration-700">
                            <img src="/icons/school-icons/boston-college-1.svg"></img>
                        </a>

                        <a href="https://www.bu.edu/" className="flex justify-center items-center grayscale-[70%] hover:grayscale-0 transition ease-out duration-700">
                            <img src="/icons/school-icons/boston-university.svg"></img>
                        </a>

                        <a href="https://www.northeastern.edu/" className="flex justify-center items-center grayscale-[70%] hover:grayscale-0 transition ease-out duration-700">
                            <img src="/icons/school-icons/northeastern.svg"></img>
                        </a>

                        <a href="https://www.harvard.edu/" className="flex justify-center items-center grayscale-[70%] hover:grayscale-0 transition ease-out duration-700">
                            <img src="/icons/school-icons/harvard.svg"></img>
                        </a>

                        <a href="https://www.mit.edu/" className="flex justify-center items-center grayscale-[70%] hover:grayscale-0 transition ease-out duration-700">
                            <img src="/icons/school-icons/mit.svg"></img>
                        </a>

                        <a href="https://www.umass.edu/" className="flex justify-center items-center grayscale-[70%] hover:grayscale-0 transition ease-out duration-700">
                            <img src="/icons/school-icons/umass.svg"></img>
                        </a>

                    </div>
                </div>
            </section>



            <section id='features-section' className="bg-gray-50 dark:bg-gray-800 animate-fadeTwo animation-delay-200">
                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                    <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">Designed for students and universities like yours</h2>
                        <p className="mb-4">Empower universities with the ultimate platform tool to enable seamless space leasing opportunities and unlocking new realms of collaboration and revenue generation. <br/><br/>Students and alumni within the network along with other verified organizations can leverage our platform to lease out unused spaces for meetings, workshops, and even stadium-sized events. </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <img className="w-full rounded-lg" src="/images/landing-page-imgs/students-collab.jpeg" alt="students studying" />
                        <img className="mt-4 w-full rounded-lg lg:mt-10" src="/images/landing-page-imgs/concert-arena.jpeg" alt="arena event" />
                    </div>
                </div>
            </section>


            <section className="bg-white dark:bg-gray-900 animate-fadeTwo animation-delay-200">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">How UniVenue works</h2>
                        <p className="mb-4 font-light">Admin accounts associated with each university will have the ability to publish a variety of different spaces (study tables, classrooms, lecture halls, indoor arenas, outdoor stadiums, etc.) for a variety of different occasions (study, meeting, community event, large-scale event, etc.) and for a desired duration. seats and venues are published through the form of tickets. <br/><br/>Students and alumni verified through a university ID or university email will have the ability to reserve an available venue at any of the network institutions for a given duration. Once an order is made for that space, an admin account from the given institution must then make the approval to finalize the order and complete the purchase. Confirmation of a reservation will be sent to the user in the form of a ticket.</p>
                        <p className="mb-4 font-medium">For the purposes of this demo, all accounts will have the ability to utilize all features involved with the application to properly showcase all features of this personal project built utilizing core microservices concepts.</p>
                        <a href="/auth/signup" className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
                            Try it Out
                            <svg className="ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                        </a>
                    </div>
                </div>
            </section>


            <section id='design-section' className="bg-gray-200 dark:bg-gray-800 animate-fadeTwo animation-delay-200">
                <div className="mx-auto my-auto max-w-screen-xl lg:py-4">
                    <h2 className="my-1 text-3xl tracking-tight leading-tight font-semibold text-center text-gray-800 dark:text-white md:text-4xl"> Project Development Details </h2>
                </div>
            </section>

            <section className="bg-white dark:bg-gray-900 animate-fadeTwo animation-delay-500">
                <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                    <div className="mb-8 max-w-screen lg:mb-16">
                        <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">Event-Driven Architecture</h2>
                        <p className="text-gray-500 sm:text-xl dark:text-gray-400">A multi-service approach is considered to be one of the most viable options in developing modern day scalable solutions designed for growth. The following full stack project 'UniVenue' was developed with the following microservices in place for a full-stack application...</p>
                    </div>
                    <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                <svg className="w-[21px] h-[21px] text-primary-600 dark:text-primary-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14"><path d="M18 14H2a2 2 0 0 1-2-2V9.5a1 1 0 0 1 1-1 1.5 1.5 0 0 0 0-3 1 1 0 0 1-1-1V2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2.5a1 1 0 0 1-1 1 1.5 1.5 0 0 0 0 3 1 1 0 0 1 1 1V12a2 2 0 0 1-2 2Z"/></svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">Tickets</h3>
                            <p className="text-gray-500 dark:text-gray-400">This service is in charge of all things reservation tickets made by an admin account.</p>
                            <p className="text-gray-600 dark:text-gray-400 font-semibold mt-3">Responsibilities:</p>
                            <ul className="text-gray-500 dark:text-gray-400 ml-1">
                                <li>1. Fetching all available seats based on venue.</li>
                                <li>2. Ticket creation made by admin with valid inputs.</li>
                                <li>3. Updates to an existing ticket made by admin.</li>
                                <li>4. Publishes event notifying other correlated services.</li>
                            </ul>

                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                <svg className="w-[21px] h-[21px] text-primary-600 dark:text-primary-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21"><path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/></svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">Orders</h3>
                            <p className="text-gray-500 dark:text-gray-400">This service in charging of maintaining all orders made for individual tickets by student users.</p>
                            <p className="text-gray-600 dark:text-gray-400 font-semibold mt-3">Responsibilities:</p>
                            <ol className="text-gray-500 dark:text-gray-400 ml-1">
                                <li>1. Fetching all orders made by the current user.</li>
                                <li>2. Order creation once a user requests a ticket.</li>
                                <li>3. Updates to an existing order based on it's status.</li>
                                <li>4. Publishes event notifying other associated services.</li>
                            </ol>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                <svg className="w-[21px] h-[21px] text-primary-600 dark:text-primary-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20"><path d="M14 7h-1.5V4.5a4.5 4.5 0 1 0-9 0V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-5 8a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Zm1.5-8h-5V4.5a2.5 2.5 0 1 1 5 0V7Z"/></svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">Authentication</h3>
                            <p className="text-gray-500 dark:text-gray-400">This service handles user creation via sign up and log in functionality.</p>
                            <p className="text-gray-600 dark:text-gray-400 font-semibold mt-3">Responsibilities:</p>
                            <ul className="text-gray-500 dark:text-gray-400 ml-1">
                                <li>1. Verifying inputs submitted are valid for sign up.</li>
                                <li>2. Verifying credentials upon log in.</li>
                                <li>3. Updates to an existing order based on it's status.</li>
                                <li>4. Publishes event notifying other associated services.</li>
                            </ul>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path></svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">Payments</h3>
                            <p className="text-gray-500 dark:text-gray-400">This service is in charge of handling all payments performed through the Stripe API.</p>
                            <p className="text-gray-600 dark:text-gray-400 font-semibold mt-3">Responsibilities:</p>
                            <ul className="text-gray-500 dark:text-gray-400 ml-1">
                                <li>1. Processes all payments through the use of the Stripe API.</li>
                                <li>2. Publishes event notifying other associated service of order status.</li>
                            </ul>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                {/* <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg> */}
                                <svg className="w-[21px] h-[21px] text-primary-600 dark:text-primary-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/></svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">Expiration</h3>
                            <p className="text-gray-500 dark:text-gray-400">This service handles maintenance of 15 min timers set once an order has been started by a user.</p>
                            <p className="text-gray-600 dark:text-gray-400 font-semibold mt-2">Responsibilities:</p>
                            <ul className="text-gray-500 dark:text-gray-400 ml-1">
                                <li>1. Management of individual timers is handled utilizing a priority job queue system provided through the Bull NodeJS library</li>
                                <li>2. Publishes event notifying other associated service about timer expiration</li>
                            </ul>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">NATS Streaming Server</h3>
                            <p className="text-gray-500 dark:text-gray-400">This extremely performant, lightweight, and reliable streaming platform is utilized as an event bus for seamless communication of data between different services.</p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                {/* <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg> */}
                                <svg className="w-[21px] h-[21px] text-primary-600 dark:text-primary-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18"><path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-7.5 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM2 16V8h16v8H2Z"/></svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">Client</h3>
                            <p className="text-gray-500 dark:text-gray-400">This services is comprised of all the front-end components handling client interactions with the following application.</p>
                            
                        </div>
                        <div className="col-start-3 inline-flex items-end justify-end">
                            <a href="https://github.com/Mohsin-Braer/UniVenue" className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700 mt-4 animate-hbounce">
                                More Details
                                <svg className="ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                            </a>
                        </div>
                    </div>
                    
                </div>
            </section>





            <section className="bg-gray-50 dark:bg-gray-800 animate-fadeTwo animation-delay-500">
                <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center mb-10">
                        <h2 className="mb-4 text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">System Design Preview</h2>
                        <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">For more, check out our <a href="https://github.com/Mohsin-Braer/UniVenue" className="text-primary-400 hover:text-primary-600">GitHub Repository</a></p>
                    </div>
                    <div className="p-9">
                        <img src='/images/landing-page-imgs/UniVenue-system-design.png' className="h-auto max-w-full border-2 shadow-lg dark:shadow-black/30"></img>
                    </div>
                </div>
            </section>







            <section className="bg-white dark:bg-gray-900 animate-fadeTwo animation-delay-500">

                        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                                <div className="mb-8 max-w- text-center lg:mb-16">
                                    <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">Major Technologies Utilized</h2>
                                    <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">For the full list, check out our <a href="https://github.com/Mohsin-Braer/UniVenue" className="text-primary-400 hover:text-primary-600">GitHub Repository</a></p>
                                </div>
                                <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-12 md:space-y-0">
                                    <div>
                                        <Link href='https://www.typescriptlang.org/'>
                                            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition duration-500 hover:scale-110">
                                                <img className="mx-auto my-8" src="/icons/tech-logos/ts-logo.svg" alt="" />
                                                <div className="p-5 border">
                                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">TypeScript</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    <div>
                                        <Link href='https://react.dev/'>
                                            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition duration-500 hover:scale-110">
                                                <img className="mx-auto my-9" height={138} width={140} src="/icons/tech-logos/react-logo.svg" alt="not working" />
                                                <div className="p-5 border">
                                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">ReactJS</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    <div>
                                        <Link href='https://nextjs.org/'>
                                            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition duration-500 hover:scale-110">
                                                <img className="mx-auto my-9" width={126} height={126} src="/icons/tech-logos/nextjs-logo.svg" alt="" />
                                                <div className="p-5 border">
                                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">NextJS</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    <div>
                                        <Link href='https://nodejs.org/en'>
                                            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition duration-500 hover:scale-110">
                                                <img className="mx-auto my-11" width={180} height={220} src="/icons/tech-logos/nodejs-logo.svg" alt="" />
                                                <div className="p-5 border">
                                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">NodeJS</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    <div>
                                        <Link href='https://expressjs.com/'>
                                            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition duration-500 hover:scale-110">
                                                <img className="mx-auto my-9" width={130} height={130} src="/icons/tech-logos/express-logo.svg" alt="" />
                                                <div className="p-5 border">
                                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Express</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    <div>
                                        <Link href='https://www.docker.com/'>
                                            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition duration-500 hover:scale-110">
                                                <img className="mx-auto my-11" width={160} height={160} src="/icons/tech-logos/docker-logo.svg" alt="" />
                                                <div className="p-5 border">
                                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Docker</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    <div>
                                        <Link href='https://kubernetes.io/'>
                                            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition duration-500 hover:scale-110">
                                                <img className="mx-auto my-9" width={138} height={138} src="/icons/tech-logos/kubernetes-logo.svg" alt="" />
                                                <div className="p-5 border">
                                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Kubernetes</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    <div>
                                        <Link href='https://www.mongodb.com/'>
                                            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition duration-500 hover:scale-110">
                                                <img className="mx-auto my-9" width={135} height={135} src="/icons/tech-logos/mongodb-logo.svg" alt="" />
                                                <div className="p-5 border">
                                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">MongoDB</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    <div>
                                        <Link href='https://redis.io/'>
                                            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition duration-500 hover:scale-110">
                                                <img className="mx-auto my-9" width={135} height={135} src="/icons/tech-logos/redis-logo.svg" alt="" />
                                                <div className="p-5 border">
                                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Redis</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    <div>
                                        <Link href='https://github.com/OptimalBits/bull'>
                                            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition duration-500 hover:scale-110">
                                                <img className="mx-auto my-9" width={178} height={178} src="/icons/tech-logos/bull-logo.png" alt="" />
                                                <div className="p-5 border">
                                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">BullJS</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    <div>
                                        <Link href='https://docs.nginx.com/nginx-ingress-controller/'>
                                            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition duration-500 hover:scale-110">
                                                <img className="mx-auto my-9" width={108} height={108} src="/icons/tech-logos/ingress-nginx-logo.png" alt="" />
                                                <div className="p-5 border">
                                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Ingress-NGINX</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    <div>
                                        <Link href='https://nats.io/'>
                                            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition duration-500 hover:scale-110">
                                                <img className="mx-auto my-8" width={131} height={141} src="/icons/tech-logos/nats-logo.png" alt="" />
                                                <div className="p-5 border">
                                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">NATS.io</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
 

                                </div>
                        </div>


                       
                        <div className="py-5 mx-auto max-w-screen-xl pb-20">
                            <div className="mx-auto text-center"> 
                                <a href="https://github.com/Mohsin-Braer/UniVenue" className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-primary-600 border-2 border-primary-600 rounded-full hover:text-white group hover:bg-gray-50">
                                    <span className="absolute left-0 block w-full h-0 transition-all bg-primary-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                    <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </span>
                                    <span className="relative">Check It Out!</span>
                                 </a>
                            </div>
                        </div>
                        
        
            </section>



            <footer id='contact-section' className="p-4 bg-gray-50 sm:p-6 dark:bg-gray-800">
                <div className="mx-auto max-w-screen-xl">
                    <div className="md:flex md:justify-between">
                        <div className="mb-6 md:mb-0">
                            <a href="/" className="flex items-center">
                                <img src="/images/landing-page-imgs/UniVenue-logo.png" className="mr-3 h-8" alt="UniVenue" />
                                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">UniVenue</span>
                            </a>
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                            <div className="col-start-2">
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Contact</h2>
                                <ul className="text-gray-600 dark:text-gray-400">
                                    <li className="mb-4">
                                        <a href="/" className="hover:underline ">Github</a>
                                    </li>
                                    <li>
                                        <a href="mailto:hbraer@gmail.com" className="hover:underline">Email</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-start-3">
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                                <ul className="text-gray-600 dark:text-gray-400">
                                    <li className="mb-4">
                                        <a href="" className="hover:underline">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="" className="hover:underline">Terms &amp; Conditions</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/" className="hover:underline">UniVenue</a>.
                        </span>
                        <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                            <a href="" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                            </a>
                            <a href="" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                            </a>
                            <a href="" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                            </a>
                            <a href="" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                            </a>
                            <a href="" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>


        </div> 
    )

}

LandingPage.getInitialProps = async (context, client, currentUser) => {

    const { data } = await client.get('/api/tickets'); //de-structure res since data property is where list of tickets is stored
    
    return { tickets: data }; 
};
    
export default LandingPage;



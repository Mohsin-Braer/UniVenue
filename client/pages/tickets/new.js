import { useState } from "react";
import useRequest from '../../hooks/use-request'
import Router from 'next/router';


const NewTicketPage = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState('');
    const [category, setCategory] = useState('');
    const [roomType, setRoomType] = useState('');
    const [roomId, setRoomId] = useState('');
    const [university, setUniversity] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [imgUrl, setImgUrl] = useState('');


    const {doRequest, errors} = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: {
            title,
            price,
            date,
            category,
            roomType,
            roomId, 
            university,
            city,
            state,
            imgUrl,
        },
        onSuccess: () => Router.push('/tickets/show'),
    });

    const onSubmitForm = (event) => {
        event.preventDefault();

        doRequest();
    }

    const onBlur = () => {
        const value = parseFloat(price);

        if(isNaN(value)){
            return;
        }

        setPrice(value.toFixed(2));
    }



    return(
        <div className="h-screen flex">
             <div className="mx-auto items-center justify-center content-center mt-12">
                <h1 className="block uppercase tracking-wide text-gray-700 text-lg text-center font-bold mb-2 mt-2">Create a Ticket</h1>
                {errors}
                <form className="w-full" onSubmit={onSubmitForm}> 
                    
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="form-ticket-title">
                                Title
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="form-ticket-title" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)}
                                type="text" 
                                placeholder="Ticket Name" 
                            />
                            <p className="text-gray-600 text-xs italic">Event being hosted in this space. ex. study space or athletic event</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="form-title-price">
                                Price
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="form-ticket-price"
                                value={price}
                                type="text" 
                                placeholder="Ticket Price" 
                                onBlur={onBlur}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="form-title-date">
                                Date
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="form-ticket-date"
                                value={date}
                                type="date" 
                                onChange={(e) => setDate(e.target.value)}
                            />
                            
                        </div>

                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                Duration
                            </label>
                            <div className="relative">
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                        id="form-ticket-duration"
                                        placeholder=""
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        >
                                    <option value='30 min'>30 min</option>
                                    <option value='1 hr'>1 hr</option>
                                    <option value='1 hr 30 min'>1 hr 30 min</option>
                                    <option value='2 hr'>2 hr</option>
                                    <option value='2 hr 30 min'>2 hr 30 min</option>
                                    <option value='3 hr'>3 hr</option>
                                    <option value='3 hr 30 min'>3 hr 30 min</option>
                                    <option value='4 hr'>4 hr</option>
                                    <option value='4 hr 30 min'>4 hr 30 min</option>
                                    <option value='5 hr'>5 hr</option>
                                    <option value='5 hr 30 min'>5 hr 30 min</option>
                                    <option value='6 hr'>6 hr</option>
                                    <option value='6 hr 30 min'>6 hr 30 min</option>
                                    <option value='7 hr'>7 hr</option>
                                    <option value='7 hr 30 min'>7 hr 30 min</option>
                                    <option value='8 hr'>8 hr</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                            <p className="text-gray-600 text-xs italic">Select duration for up to 8 hrs</p>
                            
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="form-roomType">
                                Building/Venue Name
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="form-roomType" 
                                type="text" 
                                placeholder="ex. Alumni Stadium"
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}/>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="form-roomId">
                                Room ID
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="form-roomId" 
                                type="text" 
                                placeholder="ex. S123"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}/>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="form-category">
                                Event Type
                            </label>
                            <div className="relative">
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                        id="form-category"
                                        placeholder=""
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        defaultValue=''>
                                    <option value='' disabled>Event Type</option>  
                                    <option value='study'>Study</option>
                                    <option value='sports'>Sports</option>
                                    <option value='lecture'>Lecture</option>
                                    <option value='community'>Community</option>
                                    <option value='other'>Other</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>  

                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="form-roomType">
                                University
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="form-roomType" 
                                type="text" 
                                placeholder="ex. Boston College"
                                value={university}
                                onChange={(e) => setUniversity(e.target.value)}/>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="form-roomId">
                                City
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="form-roomId" 
                                type="text" 
                                placeholder="ex. Boston"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}/>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="form-category">
                                State
                            </label>
                            <div className="relative">
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                        id="form-category"
                                        placeholder=""
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}>
                                    <option value='' disabled selected>State</option>     
                                    <option value='AL'>AL</option>  <option value='AK'>AK</option>  <option value='AZ'>AZ</option>
                                    <option value='AR'>AR</option>  <option value='CA'>CA</option>  <option value='CO'>CO</option>
                                    <option value='CT'>CT</option>  <option value='DE'>DE</option>  <option value='DC'>DC</option>
                                    <option value='FL'>FL</option>  <option value='GA'>GA</option>  <option value='HI'>HI</option>
                                    <option value='ID'>ID</option>  <option value='IL'>IL</option>  <option value='IN'>IN</option>
                                    <option value='IA'>IA</option>  <option value='KS'>KS</option>  <option value='KY'>KY</option>
                                    <option value='LA'>LA</option>  <option value='ME'>ME</option>  <option value='MD'>MD</option>
                                    <option value='MA'>MA</option>  <option value='MI'>MI</option>  <option value='MN'>MN</option>
                                    <option value='MS'>MS</option>  <option value='MO'>MO</option>  <option value='MT'>MT</option>
                                    <option value='NE'>NE</option>  <option value='NV'>NV</option>  <option value='NH'>NH</option>
                                    <option value='NJ'>NJ</option>  <option value='NM'>NM</option>  <option value='NY'>NY</option>
                                    <option value='NC'>NC</option>  <option value='ND'>ND</option>  <option value='MP'>MP</option>
                                    <option value='OH'>OH</option>  <option value='OK'>OK</option>  <option value='OR'>OR</option>
                                    <option value='PA'>PA</option>  <option value='PR'>PR</option>  <option value='RI'>RI</option>
                                    <option value='SC'>SC</option>  <option value='SD'>SD</option>  <option value='TN'>TN</option>
                                    <option value='TX'>TX</option>  <option value='UT'>UT</option>  <option value='VT'>VT</option>
                                    <option value='VA'>VA</option>  <option value='WA'>WA</option>  <option value='WV'>WV</option>
                                    <option value='WI'>WI</option>  <option value='WY'>WY</option>   
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                    </div> 

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="form-img-id">
                                Image URL
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="form-ticket-price"
                                value={imgUrl}
                                type="text" 
                                placeholder="Image URL" 
                                onChange={(e) => setImgUrl(e.target.value)}
                            />
                        </div>
                        <p className="text-gray-600 text-xs italic px-3">For demo purposes only</p>

                    
                    </div>                  

            
                
                    <button className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-primary-600 transition duration-300 ease-out border-2 border-primary-500 rounded-full shadow-md group">
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary-500 group-hover:translate-x-0 ease">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-primary-500 transition-all duration-300 transform group-hover:translate-x-full ease">Submit</span>
                        <span className="relative invisible"> Button Text </span>
                    </button>
              

                </form>
            </div>
        </div>
           
            
    
    );
}

export default NewTicketPage;
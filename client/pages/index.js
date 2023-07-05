import buildClient from "../api/build-client";



// export const TestingSomething = () => {  //Testing feature of adding img or video to background header div as seen on Seat Geek site
//     return(
//         <div >
                
//         </div>
//     );
// }


const LandingPage = ({ currentUser }) => {
    return currentUser ? (<h1 className="font-bold flex justify-center text-xl">You are signed in</h1>) : (<h1 className="font-bold flex justify-center text-xl">You are NOT signed in</h1>);
};

LandingPage.getInitialProps = async (context) => {

    const { data } = await buildClient(context).get('/api/users/currentuser');

    return data;
};

export default LandingPage;


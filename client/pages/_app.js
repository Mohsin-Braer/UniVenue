import '../styles/global.css';
import buildClient from '../api/build-client';
import NavBarHeader from '../components/nav-bar';

const MyApp = ({ Component, pageProps, currentUser }) => { //pass in pageProps (getInitialProps to their respective sub components)

    return (
        <div>
            <NavBarHeader currentUser={currentUser} confirmPrint={false}/>
            <div className='h-screen'>
                <Component currentUser={currentUser} {...pageProps} />
            </div> 
        </div>
    );
}; 

MyApp.getInitialProps = async (appContext) => {

    //making call either within server or browser to check if sign in status
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser'); //{req, res} located within ctx obj in appContext
    
    let pageProps = {};
    if(appContext.Component.getInitialProps){ //make sure sub components have a getInitialProps -> else return empty obj
        //attempting to reach for getInitialProps of sub components to get called
        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser); //Landing page getInitialProps does not get called auto, we must call from here
    }
    
    return {
        pageProps,
        ...data
    };
};

export default MyApp;
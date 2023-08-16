import Header from "../../components/auth-components/header";
import SigninBody from "../../components/auth-components/signin-body";

const SignInPage = () => {
    return ( 
        <section className="mx-auto max-w-4xl mt-20 animate-fadeOne">
            <div className="">
                <Header
                    heading = 'Log into your account'
                    paragraph="Don't have an account? "
                    linkName="Sign Up"
                    linkUrl="/auth/signin"
                    imgUrl="/images/profile-imgs/avatar-male.png"
                />

                <SigninBody/> 
            </div> 
        </section>  
       
    )
}

export default SignInPage;

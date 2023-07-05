import Header from "../../components/auth-components/header";
import SignupBody from "../../components/auth-components/signup-body";

const SignInPage = () => {
    return (   
        <div className="mx-14 my-20">
            <Header
                heading = 'Sign into your account'
                paragraph="Don't have an account? "
                linkName="Sign Up"
                linkUrl="/"
            />

            <SignupBody/> 
        </div>    
    )
}

export default SignInPage;

import Header from "../../components/auth-components/header";
import SignupBody from "../../components/auth-components/signup-body";

const SignUpPage = () => {
    return (   
        <div className="my-20">
            <Header
            heading = 'Signup to create an account'
            paragraph="Already have an account? "
            linkName="Login"
            linkUrl="/"
            />

            <SignupBody/> 
        </div>    
    )
}

export default SignUpPage;

import Header from "../../components/auth-components/header";
import SignupBody from "../../components/auth-components/signup-body";

const SignUpPage = () => {
    return ( 
        <section className="mx-auto max-w-4xl mt-20 animate-fadeOne">
            <div className="">
                <Header
                heading = 'Sign up to create an account'
                paragraph="Already have an account?"
                linkName="Login"
                linkUrl="/auth/signup"
                imgUrl="/images/profile-imgs/avatar-female.png"
                />

                <SignupBody/> 
            </div>
        </section>      
    )
}

export default SignUpPage;

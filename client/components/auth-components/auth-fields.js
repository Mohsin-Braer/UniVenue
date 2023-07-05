const loginFields=[
    {
        index: 0,
        labelText:"Email address",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        index: 1,
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    }
]

const signupFields=[
    // {
    //     labelText:"Username",
    //     labelFor:"username",
    //     id:"username",
    //     name:"username",
    //     type:"text",
    //     autoComplete:"username",
    //     isRequired:true,
    //     placeholder:"Username"   
    // },
    {
        labelText:"email",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email Address"   
    },
    {
        labelText:"password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    },
    // {
    //     labelText:"Confirm Password",
    //     labelFor:"confirm-password",
    //     id:"confirm-password",
    //     name:"confirm-password",
    //     type:"password",
    //     autoComplete:"confirm-password",
    //     isRequired:true,
    //     placeholder:"Confirm Password"   
    // }
]

export {loginFields,signupFields}
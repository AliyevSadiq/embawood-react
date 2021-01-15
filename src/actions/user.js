import cookie from 'react-cookies'


const user_error=(data)=>{
    return {
        type:"USER_ERROR",
        payload:data
    }
}
const user_success=()=>{
    return {
        type:"USER_SUCCESS"
    }
}




const user_register=(embawoodApi,data,dispatch)=>{

    embawoodApi.signUp(data)
        .then((result)=>result.json())
        .then((data)=>{
            if(data.error){
                dispatch(user_error(data.messages))
            }else{
                dispatch(user_success())
            }
        });
    return{
        type:'USER_REGISTER'
    }
}



const user_login=(embawoodApi,data,dispatch)=>{
    embawoodApi.signIn(data)
        .then((result)=>result.json())
        .then((data)=>{

            if(data.error){
                dispatch(user_error(data.messages))
            }else{
                dispatch(user_success())
                cookie.save('token', data.token)

            }

        });
    return{
        type:'USER_LOGIN'
    }
}

export{
    user_register,user_login
}

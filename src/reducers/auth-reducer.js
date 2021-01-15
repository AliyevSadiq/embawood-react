
const AuthReducer=(state,action)=>{
    if(state===undefined){
        return{
            user:[],
            loading:true,
            error:null,
            success:false
        }
    }

    switch (action.type) {
        case "USER_ERROR":
            return {
                user:[],
                loading:false,
                error:action.payload,
                success:false
            };
        case "USER_SUCCESS":
            return {
                user:[],
                loading:false,
                error:null,
                success:true
            };
        case "USER_REGISTER":
            return {
                user:[],
                loading:false,
                error:null,
                success:false
            };
        case "USER_LOGIN":
            return {
                user:[],
                loading:false,
                error:null,
                success:false
            };
        default:
            return state.userList;
    }

}

export default AuthReducer;
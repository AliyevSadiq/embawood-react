

const ProductReducer=(state,action)=>{
    if(state===undefined){
        return{
            products:[],
            loading:true,
            error:null,
            success:false
        }
    }

    switch (action.type) {
        case "PRODUCT_ERROR":
            return {
                products:[],
                loading:false,
                error:action.payload,
                success:false
            };
        case "PRODUCT_SUCCESS":
            return {
                products:[],
                loading:false,
                error:null,
                success:true
            };
        case "PRODUCT_LOAD":
            return {
                products:[],
                loading:true,
                error:null,
                success:false
            };
        case "PRODUCT_FETCH_DATA":
            return {
                products:action.payload,
                loading:false,
                error:null,
                success:false
            };
        case "CREATE_PRODUCT":
            return {
                products:[],
                loading:false,
                error:null,
                success:false
            };
        default:
            return state.productList;
    }

}

export default ProductReducer;

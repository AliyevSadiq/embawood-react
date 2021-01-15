import cookie from "react-cookies";

const product_error=(data)=>{
    return {
        type:"PRODUCT_ERROR",
        payload:data
    }
}
const product_success=()=>{
    return {
        type:"PRODUCT_SUCCESS"
    }
}

const product_load=()=>{
    return {
        type:'PRODUCT_LOAD'
    }
}

const getImage=(embawoodApi)=>(image)=>{
   return  embawoodApi.getImage(image)
}



const getProduct=(data)=>{
    return {
        type:'PRODUCT_FETCH_DATA',
        payload:data
    }
}





const fetchProducts=(embawoodApi,dispatch)=>()=>{
    dispatch(product_load());
    embawoodApi.getAllProducts()
        .then(data=>{
            dispatch(getProduct(data))
        })
        .catch(err=>dispatch(product_error(err)));
}

const fetchProduct=(embawoodApi,dispatch,id)=>{
    dispatch(product_load());
    embawoodApi.getProduct(id)
        .then(data=>{
            if(data.error){
                window.location.href='/'
            }
            dispatch(getProduct(data))
        })
        .catch(err=>dispatch(product_error(err)));
}





const createProduct=(embawoodApi,data,dispatch)=>{
    embawoodApi.create(data,cookie.load('token'))
        .then((res)=>res.json())
        .then(data=>{

            if(data.error){
                dispatch(product_error(data.messages));
            }else{
                dispatch(product_success());
            }
        });

    return{
        type:'CREATE_PRODUCT'
    }
}

const updateProduct=(embawoodApi,data,dispatch,id)=>{
    embawoodApi.update(data,cookie.load('token'),id)
        .then((res)=>res.json())
        .then(data=>{
            console.log(data);
            if(data.error){
                cookie.save('errors',data.messages,{maxAge :2});
               window.location.reload();
            }else{
                cookie.remove('errors');
                window.location.href='/';
            }
        });

    return{
        type:'UPDATE_PRODUCT'
    }
}





const deleteProduct=(embawoodApi,id,dispatch)=>{


    embawoodApi.deleteProduct(id,cookie.load('token'))
        .then((res)=>res.json)
        .then(data=>{
            if(data.error){
                dispatch(product_error(data.messages));
            }else{
                window.location.reload();
            }
        });
}



export{
   createProduct,fetchProducts,getImage,deleteProduct,fetchProduct,updateProduct
}

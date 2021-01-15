

const category_load=(data)=>{
    return{
        type:'CATEGORY_LOAD',
        payload:data
    }
}

const fetchCategory=(embawoodApi,dispatch)=>()=>{
    embawoodApi.getCateory()
        .then(data=>dispatch(category_load(data)));
}

export {fetchCategory}

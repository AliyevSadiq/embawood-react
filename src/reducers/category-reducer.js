
const CategoryReducer=(state,action)=>{
    if(state===undefined){
        return{
            categories:[],
        }
    }

    switch (action.type) {
        case "CATEGORY_LOAD":
            return {
                categories:action.payload
            };
        default:
            return state.categoryList;
    }

}

export default CategoryReducer;

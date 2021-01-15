import AuthReducer from "./auth-reducer";
import ProductReducer from "./product-reducer";
import CategoryReducer from "./category-reducer";

const reducer=(state,action)=>{
    return{
        userList:AuthReducer(state,action),
        productList:ProductReducer(state,action),
        categoryList:CategoryReducer(state,action)
    }
}
export default reducer;

import React,{Component} from 'react';
import {deleteProduct, fetchProducts, getImage} from "../../actions/product";
import {connect} from 'react-redux';
import WithEmbawoodService from "../hoc";
import Spinner from "../spinner";
import {ErrorIndicator} from "../error-indicator/error-indicator";
import './styles.css';
import swal from "sweetalert";
import cookie from "react-cookies";

class ProductList extends Component{


    componentDidMount() {
        this.props.fetchProducts();
    }






    onDelete=(id)=>{
        swal({
            title: "Siz əminsiniz?",
            buttons:['Xeyr','Bəli'],
            text: "Məhsulu silmək",
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    this.props.deleteProduct(id);
                    swal("", "Məhsul silindi!", "success");
                }
            });

    }
    render() {
       const {loading,error,products,getImage}=this.props;
        if(error){
            return  <ErrorIndicator/>
        }

       if(loading){
           return  <Spinner/>
       }

       return (
          <>
              {
                  products.length>0 ?

                      <table className="table mt-5">
               <thead className="thead-dark">
               <tr>
                   <th scope="col">#</th>
                   <th scope="col">Məhsul</th>
                   <th scope="col">Kateqoriya</th>
                   <th scope="col">Şəkil</th>
                   {cookie.load('token') ?  <th scope="col">Əməliyyatlar</th> : null}
               </tr>
               </thead>
               <tbody>
               {  products.map((product,index)=>{
                     return (
                         <tr key={product.id}>
                             <th scope="row">{product.id}</th>
                             <td>{product.title}</td>
                             <td>{product.category.title}</td>
                             <td>
                                 <img src={getImage(product.main_image)} alt={product.title} className="img-thumbnail image"/>
                                 </td>
                             { cookie.load('token') ? <td>

                                   <a href={`/edit/${product.id}`}>Redaktə etmək</a> | <a href='#' className={'text-danger'} onClick={()=>this.onDelete(product.id)}>Silmək</a>

                             </td> : null}
                         </tr>
                     )
                 })
               }
               </tbody>
           </table>
                      : <h1 className='text-danger'>MEHSUL YOXDUR</h1>
              }



          </>
       )
    }
}



const mapStateToProps=({productList:{loading,error,products,success}})=>{
    return {loading,error,products,success};
}

const mapDispatchToProps=(dispatch,{embawoodApi})=>{
  return{
      fetchProducts:(page)=>fetchProducts(embawoodApi,dispatch)(page),
      getImage:(image)=>getImage(embawoodApi)(image),
      deleteProduct:(id)=>deleteProduct(embawoodApi,id,dispatch)
  }
}


export default WithEmbawoodService()(connect(mapStateToProps,mapDispatchToProps)(ProductList));

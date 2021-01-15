import React,{Component} from 'react';
import { fetchProduct, getImage, updateProduct} from "../../actions/product";
import WithEmbawoodService from "../hoc";
import {connect} from "react-redux";
import {Spinner} from "../spinner/spinner";
import './styles.css';
import {fetchCategory} from "../../actions/category";
import cookie from "react-cookies";


class ItemDetail extends Component{


    state={
        fields:{
            title:"",
            category_id:"",
            main_image:"",
            description:"",
            galleries:[]
        }
    }




    componentDidMount() {
        this.props.fetchProduct(this.props.id);
        this.props.fetchCategory();

    }


    componentDidUpdate(prevProps){
        if(prevProps.products!==this.props.products){

            const {title,category_id,description}=this.props.products
            this.setState({
                ...this.state.fields,
                fields:{
                    title,
                    category_id,
                    description,
                }
            })

        }
    }



    handleValue=(e)=>{
        let {fields}=this.state;
        fields[e.target.name]=e.target.value;
        this.setState({
            fields
        })
    }

    selectFile=(e)=>{
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                fields:{
                    ...this.state.fields,
                    main_image:file
                }
            });
        }
        reader.readAsDataURL(file)
    }

    selectMultipleFile=(e)=>{
        e.preventDefault();

        this.setState({
            fields:{
                ...this.state.fields,
                galleries:e.target.files
            }
        })
    }

    updateProduct=(e)=>{
        e.preventDefault();

        if(!cookie.load('token')){
            window.location.href='/';
        }

        const {title,category_id,main_image,description,galleries}=this.state.fields;
        const {products}=this.props
        const formData=new FormData();

        formData.append('title',title);
        formData.append('category_id',category_id);
        if(main_image){
            formData.append('main_image',main_image);
        }

        formData.append('description',description);
        if(galleries){
            for(let i=0;i<galleries.length;i++){
                formData.append('galleries[]',galleries[i]);
            }
        }
        this.props.updateProduct(formData,products.id);


        this.setState({
            ...this.state.fields
        })


    }


    render() {
        const {loading,products,getImage,categories}=this.props;
        const {title,category_id,description}=this.state.fields;

        if(loading){
            return <Spinner/>
        }

        let errorMessage='';
        if(cookie.load('errors')){
            errorMessage=<div className={'alert alert-danger'}>
                {
                    cookie.load('errors').map((e,index)=>{
                        return <p key={index}>{e}</p>
                    })
                }
            </div>
        }






        return (

            <div className="col-md-6 mt-5">
                {errorMessage}
                <form encType={'multipart/form-data'} onSubmit={this.updateProduct}>
                    <div className="form-group">
                        <label htmlFor="title">Məhsulun adı</label>
                        <input type="text" className="form-control"
                               value={title}
                               onChange={this.handleValue}
                               id="title"  name="title"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category_id">Category</label>
                        <select className="form-control" id="category_id" name='category_id' value={category_id} onChange={this.handleValue}>
                            <option value="" >Kateqoriya seçin</option>
                            {
                                categories ?    categories.map(cat=>{
                                    return <option key={cat.id}  value={cat.id}>{cat.title}</option>
                                }) : null
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Ətraflı məlumat</label>
                        <textarea className="form-control" name='description' id='description'
                                  value={description}  onChange={this.handleValue}>
                       </textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="main_image">Şəkil</label>
                        <br/>
                        <img src={getImage(products.main_image)} alt={products.title} className='image mb-4'/>
                        <input type='file' name='main_image' id='main_image'
                               onChange={(e)=>this.selectFile(e)}
                               className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="galleries">Qallereya</label>

                        <input type='file' name='galleries' id='galleries'
                               onChange={(e)=>this.selectMultipleFile(e)}
                               className="form-control" multiple/>
                        {
                            products.galleries ?    products.galleries.map((item,index)=>{
                                return <img key={index} alt={products.title}  src={getImage(item.image)} className='image mt-4 mr-3'/>
                            }) : null
                        }
                    </div>
                    <button type="submit" className="btn btn-primary">Redaktə etmək</button>
                </form>
            </div>
        )
    }


}



const mapStateToProps=({productList:{loading,products},categoryList:{categories}})=>{
    return {loading,products,categories};
}

const mapDispatchToProps=(dispatch,{embawoodApi})=>{
    return{
        fetchProduct:(id)=>fetchProduct(embawoodApi,dispatch,id),
        getImage:(image)=>getImage(embawoodApi)(image),
        fetchCategory:fetchCategory(embawoodApi,dispatch),
        updateProduct:(data,id)=>updateProduct(embawoodApi,data,dispatch,id),
    }
}

export default  WithEmbawoodService()(connect(mapStateToProps,mapDispatchToProps)(ItemDetail));

import React,{Component} from 'react';
import WithEmbawoodService from "../hoc";
import {connect} from 'react-redux';
import {createProduct} from "../../actions/product";
import swal from "sweetalert";
import {fetchCategory} from "../../actions/category";
import cookie from "react-cookies";

class CreateProduct extends Component{


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
        this.props.fetchCategory();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        if(prevProps.success!==this.props.success){
            this.setState({
                fields:{
                    title:"",
                    category_id:"",
                    main_image:"",
                    galleries:[],
                    description:""
                }
            });
            swal("", "MƏHSUL ƏLAVƏ OLUNDU!!!", "success");
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



    createProduct=(e)=>{
        e.preventDefault();

        if(!cookie.load('token')){
            window.location.href='/';
        }


        const {title,category_id,main_image,description,galleries}=this.state.fields;
        const formData=new FormData();

        formData.append('title',title);
        formData.append('category_id',category_id);
        formData.append('main_image',main_image);
        formData.append('description',description);
        if(galleries){
            for(let i=0;i<galleries.length;i++){
                formData.append('galleries[]',galleries[i]);
            }
        }
        this.props.createProduct(formData);

    }


    render() {
         const {error,categories}=this.props;



      let errorMessage='';
        if(error){
             errorMessage=<div className={'alert alert-danger'}>
                          {
                              error.map((e,index)=>{
                                  return <p key={index}>{e}</p>
                              })
                          }
                               </div>
        }

        return(
            <div className="col-md-6 mt-5">
                {errorMessage}
                <form encType={'multipart/form-data'} onSubmit={this.createProduct}>
                    <div className="form-group">
                        <label htmlFor="title">Məhsulun adı</label>
                        <input type="text" className="form-control"
                               value={this.state.fields.title}
                               onChange={this.handleValue}
                               id="title"  name="title"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category_id">Kateqoriya</label>
                        <select className="form-control" id="category_id" name='category_id' value={this.state.fields.category_id} onChange={this.handleValue}>
                            <option value="" >Kateqoriya seçin</option>
                            {
                                categories.map(cat=>{
                                    return <option key={cat.id}  value={cat.id}>{cat.title}</option>
                                })
                            }
                        </select>
                    </div>





                    <div className="form-group">
                        <label htmlFor="description">Ətraflı məlumat</label>
                        <textarea className="form-control" name='description' id='description'
                                  value={this.state.fields.description}  onChange={this.handleValue}>
                       </textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="main_image">Şəkil</label>
                        <input type='file' name='main_image' id='main_image'
                               onChange={(e)=>this.selectFile(e)}
                               className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="galleries">Qallereya</label>
                        <input type='file' name='galleries' id='galleries'
                               onChange={(e)=>this.selectMultipleFile(e)}
                               className="form-control" multiple/>
                    </div>
                    <button type="submit" className="btn btn-primary">Əlavə etmək</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps=({productList:{error,success},categoryList:{categories}})=>{
    return {error,success,categories};
}

const mapDispatchToProps=(dispatch,{embawoodApi})=>{
    return {
        createProduct:(data)=>createProduct(embawoodApi,data,dispatch),
        fetchCategory:fetchCategory(embawoodApi,dispatch)
    }
}




export default WithEmbawoodService()(connect(mapStateToProps,mapDispatchToProps)(CreateProduct));

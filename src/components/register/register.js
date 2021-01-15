import React,{Component} from 'react';
import swal from 'sweetalert';
import {user_register} from "../../actions/user";
import {connect} from 'react-redux';
import WithEmbawoodService from "../hoc";
class Register extends Component{

    state={
        fields:{
            username:'',
            email:'',
            password:'',
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {




        if(prevProps.success!==this.props.success){
            this.setState({
                fields:{
                    username:'',
                    email:'',
                    password:""
                }
            })


            swal("Təbriklər!", "SİZ QEYDİYYATDAN KEÇDİNİZ!!!", "success");
        }
        if(prevProps.error!==this.props.error){
            this.setState({
                fields:{
                    ...this.state.fields,
                    password:""
                }
            })
        }
    }


    fieldHandler=(e)=>{
        let {fields}=this.state;
        fields[e.target.name]=e.target.value;
        this.setState({
            fields
        })
    }


    registration=(e)=>{
        e.preventDefault();
           this.props.user_register(this.state.fields);
    }








    render() {

      const {error}=this.props;
        let   message='';




         if(error){
            message=<div className="alert alert-danger">
                                <p>{error.email}</p>
                               <p>{error.username}</p>
                               <p>{error.password}</p>
                            </div>
          }



        const {fields}=this.state;
        return(
            <div className="col-md-6 mt-5">
                {message}
            <form onSubmit={this.registration}>
                <div className="form-group">
                    <label htmlFor="user_name">İstifadəçi adı</label>
                    <input type="text" className="form-control" name="username" id="user_name"
                           onChange={this.fieldHandler} placeholder="İstifadəçi adı"
                    value={fields.username}/>

                </div>
                <div className="form-group">
                    <label htmlFor="email">Elektron poçt</label>
                    <input type="email" className="form-control" name="email" id="email"
                           onChange={this.fieldHandler} placeholder="Elektron poçt"
                    value={fields.email}/>

                </div>
                <div className="form-group">
                    <label htmlFor="password">Parol</label>
                    <input type="password" className="form-control" id="password" name="password"
                           onChange={this.fieldHandler} placeholder="Parol"
                           value={this.state.fields.password}
                    />

                </div>

                <button type="submit" className="btn btn-primary">Qeydiyyatdan keçmək</button>
            </form>
            </div>
        )
    }
}
const mapStateToProps=({userList:{error,success}})=>{
    return {error,success};
}

const mapDispatchToProps=(dispatch,{embawoodApi})=>{
    return {
        user_register:(data)=>user_register(embawoodApi,data,dispatch)
    }
}

export default WithEmbawoodService()(connect(mapStateToProps,mapDispatchToProps)(Register));

import React,{Component} from 'react';
import {user_login} from "../../actions/user";
import WithEmbawoodService from "../hoc";
import {connect} from 'react-redux';




class Login extends Component{

    state={
        fields:{
            email:"",
            password:""
        }
    }




    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.success!==this.props.success){
            window.location.href="/";
        }
        if(prevProps.error!==this.props.error){
            this.setState({
                fields:{
                    password:""
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



    login=(e)=>{
        e.preventDefault();
            this.props.user_login(this.state.fields);
    }

    render() {
        const {error}=this.props;

        let   message='';

        if(error){
            message=<div className="alert alert-danger">
                <p>{error.email}</p>
                <p>{error.password}</p>
                <p>{error.wrong}</p>
            </div>
        }







        return(<div className="col-md-6 mt-5">
            {message}
            <form onSubmit={this.login}>
                <div className="form-group">
                    <label htmlFor="email">Elektron poçt</label>
                    <input type="email" className="form-control"
                           onChange={this.handleValue}
                           value={this.state.fields.email}
                           id="email"  name="email"/>

                </div>
                <div className="form-group">
                    <label htmlFor="password">Parol</label>
                    <input type="password" className="form-control"
                           onChange={this.handleValue}
                           id="password" name="password"
                           value={this.state.fields.password}/>

                </div>
                <button type="submit" className="btn btn-primary">Daxil olmaq</button>
            </form>
        </div>)
    }
}

const mapStateToProps=({userList:{error,success}})=>{
    return {error,success};
}

const mapDispatchToProps=(dispatch,{embawoodApi})=>{
    return {
        user_login:(data)=>user_login(embawoodApi,data,dispatch)
    }
}

export default WithEmbawoodService()(connect(mapStateToProps,mapDispatchToProps)(Login));

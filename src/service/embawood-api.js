


export default class EmbawoodApi {

    _BASE_API_URL='http://laravel-embawood-api/api';

    setResource=async (url,method,data)=>{
        const result = fetch(`${this._BASE_API_URL}${url}`,{
            method,
            body:JSON.stringify(data),
            headers:{
                "Content-type":"application/json; character=UTF-8",
            }
        });
        return await result;
    }

    setData=async (url,method,data,token)=>{
        const result=fetch(`${this._BASE_API_URL}${url}`,{
            method,
            body:data,
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        return await result;
    }




    getResource=async (url)=>{
        const result= await fetch(`${this._BASE_API_URL}${url}`);
        if(!result.ok){
            console.log('error');
        }
        return await result.json();
    }

    getCateory=async ()=>{
        return await this.getResource('/category');
    }

    getAllProducts=async (page=1)=>{
        return await this.getResource(`?page=${page}`);
    }

    getImage=(image)=>{
        return `${this._BASE_API_URL.replace('/api','')}/uploads/${image}`;
    }


    getProduct=async (id)=>{
        return await this.getResource(`/edit/${id}`);
    }


    signUp=async (data)=>{
        return await this.setResource('/register','POST',data);
    }
    signIn=async (data)=>{
        return await this.setResource('/login','POST',data);
    }




    create=async (data,token)=>{
        return await this.setData('/create','POST',data,token);
    }

    update=async (data,token,id)=>{
        return await this.setData(`/update/${id}`,'POST',data,token);
    }

    deleteProduct=async (id,token)=>{
        return await this.setData(`/delete/${id}`,'DELETE',null,token)
    }

}

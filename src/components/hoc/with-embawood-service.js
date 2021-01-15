import React from 'react';
import {EmbawoodServiceConsumer} from "../service-context/service-context";


const WithEmbawoodService=()=>(Wrapped)=>{

    return(props)=>{

        return(

            <EmbawoodServiceConsumer>
                {

                    (embawoodApi)=>{

                        return (<Wrapped {...props} embawoodApi={embawoodApi}/>)
                    }
                }
            </EmbawoodServiceConsumer>

        )
    }
}
export default WithEmbawoodService;

import React from 'react';
import {useParams} from "react-router";
import ItemDetail from "../../item-detail";

export const EditPage=()=>{
    let { id } = useParams();
    return <ItemDetail id={id}/>
}

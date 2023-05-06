import listProduct from "../../Services/Crud";
import  { getProducts } from "../../Services/Crud";
import {useEffect, useState} from "react"
import ProductCard from "./ProductCard";


export default function Products(){
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        getProducts().then(products => {
            setProductList(Object.values(products));
            
        });
        
    }, [])


    return (
        <>
            {productList.map(product => <ProductCard product={product}/>)}
        </>
    )
}
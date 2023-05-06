import  { readProducts } from "../../Services/Crud";
import {useEffect, useState} from "react"
import ProductCard from "./ProductCard";
import { SelectSort } from "./SelectSort";


export default function Products(){
    const [productList, setProductList] = useState([]);
     
    useEffect(() => {
        readProducts().then(products => {
            setProductList(Object.values(products));
            
        });
    }, [])

    return (
        <>
           <SelectSort setProductList={setProductList}/>
            {console.log(productList)}
            {productList.length > 0 && productList.map(product => <ProductCard product={product}/>)}
        </>
    )
}
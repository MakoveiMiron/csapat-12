import { readProducts } from "../../Services/Crud";
import { useEffect, useState } from "react";
import formatData from "../../Utils/formdata";
import AdminPagination from "../Pagination/AdminPagination";

export default function AdminProducts(){

    const [productList, setProductList] = useState([]);

    useEffect(() => {
        readProducts()
        .then(products => setProductList(formatData(products)))
    },[])

    return(
        <>
            <h1>Admin termékek</h1>
            
            <AdminPagination products={productList} pageLimit={9}/>
        </>
    )
}
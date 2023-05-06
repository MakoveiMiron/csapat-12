import { fromAtoZ, fromZtoA } from "../../Utils/ProductSorting";
import { useSearchParams } from "react-router-dom";


export function SelectSort(props){

    let [searchParams, setSearchParams] = useSearchParams();

    function handleChange(e){
        if(e.target.value === "a-z"){
            setSearchParams("novekvo");
            props.setProductList((products) => fromAtoZ(products))
        }
        else if(e.target.value === "z-a"){
            setSearchParams("csokkeno");
            props.setProductList((products) => fromZtoA(products)); 
        }
    }

    return(
        <>
        sort by name:
            <select onChange={(e) => handleChange(e)}>
                <option value="a-z">a-z</option>
                <option value="z-a">z-a</option>
            </select>
        </>
    )
}
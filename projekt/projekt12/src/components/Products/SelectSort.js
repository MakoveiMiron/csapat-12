import "./SelectSort.css"
import { fromAtoZ, fromZtoA } from "../../Utils/ProductSorting";
import { useSearchParams } from "react-router-dom";


export function SelectSort(props){

    let [searchParams, setSearchParams] = useSearchParams();

    function handleChange(e){
        if(e.target.value === "a-z"){
            const query = new URLSearchParams(window.location.search);
			query.set("sortOrientation", "novekvo");
			window.history.pushState(null, "", `?${query.toString()}`);
            props.setProducts((products) => fromAtoZ(products))
        }
        else if(e.target.value === "z-a"){
            const query = new URLSearchParams(window.location.search);
			query.set("sortOrientation", "csokkeno");
			window.history.pushState(null, "", `?${query.toString()}`);
            props.setProducts((products) => fromZtoA(products)); 
        }
    }

    return(
        <>
            <div className="sort-box">
                <p className="sort-text">Szűrés:</p>
                <select onChange={(e) => handleChange(e)} className="select-box">
                    <option value="a-z">a-z</option>
                    <option value="z-a">z-a</option>
                </select>
            </div>
        </>
    )
}
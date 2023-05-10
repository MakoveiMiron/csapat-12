import "./SelectSort.css"
import { fromAtoZ, fromZtoA } from "../../Utils/ProductSorting";
import { useState, useEffect } from "react";


export function SelectSort(props){

    const [sortDirection, setDirection] = useState("increasing");

    useEffect(()=> {
            const query = new URLSearchParams(window.location.search);
			query.set("sortOrientation", sortDirection);
			window.history.pushState(null, "", `?${query.toString()}`);
    },[sortDirection])

    
    function handleChange(e){
        if(e.target.value === "a-z"){
            setDirection("increasing");
            props.setProducts((products) => fromAtoZ(products))
        }
        else if(e.target.value === "z-a"){
            setDirection("decreasing");
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
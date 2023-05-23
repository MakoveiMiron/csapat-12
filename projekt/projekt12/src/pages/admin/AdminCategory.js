import { API_URL } from "../../constans/firebaseConstans";
import { useState } from "react";
import "./AdminCategory.css";
import { createCategory } from "../../services/Crud";



export default function AdminCategory(){

    const [category, setCategory] = useState("");

    const categoryChangeHandle = (event) => {
		setCategory(event.target.value);
	};

    function handleClick(){
        createCategory(category)
    }
  


    return(
        <>
            <div className="wrapper-category">
                <h1>Kategória létrehozása</h1>
                <input
				    className="categoryInput"
				    type="text"
				    placeholder="Kategória neve"
				    value={category}
				    onChange={categoryChangeHandle}
                />
                <button className="searchButtonBack" onClick={handleClick}>
                    Létrehozás
			    </button>
            </div>
        </>
    )
}
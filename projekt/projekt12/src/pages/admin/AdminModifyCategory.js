import { useState, useEffect } from "react";
import {getCategoryList} from "../../services/Crud";
import formatData from "../../utils/formdata";
import { useParams, useNavigate } from "react-router-dom";
export default function AdminModifyCategory(){

    const [newName, setNewName] = useState("");
    const [categoryModify, setCategoryModify] = useState("");
    const { id } = useParams();
    useEffect(() => {
		getCategoryList().then((data) => {
			const categoryToModify = formatData(data).find(
				(category) => category.id === id,
                
			);
			setNewName(categoryToModify.name);
		});
	}, [categoryModify.id,id]);
    
    function handleNameChange(e){
        setNewName(e.target.value)
        console.log(newName)
    }

    return(
        <>
            <h1>Kategória módositása</h1>
            <p><input 
            type="text"
            value={newName}
            onChange={handleNameChange}
            required
            placeholder="Gépeld be az új nevet"
            ></input></p>
            <p><button type="submit">Mentés</button></p>
        </>
    )
}
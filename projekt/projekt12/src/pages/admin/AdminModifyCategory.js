import { useState, useEffect } from "react";
import {getCategoryList} from "../../services/Crud";
import formatData from "../../utils/formdata";
import { useParams, useNavigate } from "react-router-dom";
import { updateCategory } from "../../services/Crud";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function AdminModifyCategory(){

    const [newName, setNewName] = useState("");
    const [categoryModify, setCategoryModify] = useState("");
    const { id } = useParams();
    console.log(id)
    const navigate = useNavigate();
    useEffect(() => {
		getCategoryList().then((data) => {
			const categoryToModify = formatData(data) .find(
				(category) => category.id === id,
			);
             //console.log(id)
			 /*setCategoryModify(categoryToModify);
            console.log(data) */
           
		});
	}, [categoryModify, id]);
    
    function handleNameChange(e){
        setNewName(e.target.value) 
       
    }

    function handleSubmit (e) {
        e.preventDefault();
        updateCategory(id,newName)
        .then(() => {
            navigate("/admin/kategoria");
            toast.success("Kategória sikeresen módosítva!", {
                position: toast.POSITION.TOP_RIGHT,
            });
        })
        .catch((error) => {
            toast.error(`Hiba történt a termék módosítása közben: ${error.message}`, {
                position: toast.POSITION.TOP_RIGHT,
            });
        });


    }



    return(
        
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Új név:</label>
            <p><input 
            type="text"
            value={newName}
            onChange={handleNameChange}
            required
            placeholder="Gépeld be az új nevet"
            ></input></p>
            <p><button type="submit">Mentés</button></p>
        </form>
    )
}
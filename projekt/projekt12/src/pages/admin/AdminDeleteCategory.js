
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCategory, getCategoryList } from "../../services/Crud";
import formatData from "../../utils/formdata";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminDeleteCategory(){
    const [categoryDelete, setCategoryDelete] = useState("")
    const { id } = useParams();
	const navigate = useNavigate();

    useEffect(() => {
		getCategoryList().then((data) => {
			const categoryToDelete = formatData(data).find(
				(category) => category.id === id
			);
			setCategoryDelete(categoryToDelete.name);
		});
	}, [id]);

    function deleteCategoryF (){
        deleteCategory(id)
			.then((json) => {
				navigate("/admin/kategoria");
				toast.success("A kategoria sikeresen törölve lett");
			})
			.catch((err) => {
				console.error(err);
				toast.error("Hiba történt a kategoria törlése során");
			});
    }



    return(
        <>
            <div className="delete-category">
			<h3>
				Biztosan törölni szeretnéd a(/z) <span></span>
				<span className="delete-selectyed-category">{categoryDelete}</span> kategóriát?
			</h3>
			<button className="delete-btn" onClick={deleteCategoryF}>
				Törlés
			</button>
			<button className="cancel-btn" onClick={() => navigate("/admin/kategoria")}>
				Mégse
			</button>
		</div>
        </>
    )
}
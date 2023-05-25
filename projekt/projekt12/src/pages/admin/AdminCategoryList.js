import {useState, useEffect} from "react";
import {getCategoryList} from "../../services/Crud";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"

export default function AdminCategoryList(){
    const navigate = useNavigate()

    function modifyProduct(id) {
		navigate(`${id}/modositas`);
	}

	function deleteProduct(kategoriaID) {
		navigate(`${kategoriaID}/torles`);
	}

   const [categoryList, setCategoryList] = useState([])
    useEffect(() => {
        getCategoryList().then((json) => setCategoryList(Object.values(json)));
    }, []);


    return(
        <>
            <table>
                <tr>
                    <th><h1>Kategória neve</h1></th>
                </tr>
                {categoryList.map(x =>(
                <tr>
                    <td>
                            <h3>{x.name}</h3>
                            <button><Link to={`/admin/kategoria/${x.id}/modositas`}>Szerkesztés</Link></button>
                            <button><Link to={`/admin/kategoria/${x.id}/torles`}>Törlés</Link></button>
                    </td>
                </tr>
            ))}

            </table>
            
        </>
    )
}
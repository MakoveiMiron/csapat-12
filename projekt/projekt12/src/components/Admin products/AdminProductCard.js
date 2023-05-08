import { useNavigate } from "react-router-dom"
import { useState } from "react";
export default function AdminProductCard(props){
    
    const navigate = useNavigate();
    const [id, setId] = useState(props.id);
    function modifyProduct(id){
        navigate(`${id}/modositas`)
    }

    function deleteProduct(id){
        navigate(`${id}/torles`)
    }

    
    return(
        <>
        <div className="product-row">
            <span className="product-title">
                {props.product.title}
            </span>

            <span className="product-price">
                {props.product.price}
            </span>

            <span className="product-description">
                {props.product.description}
            </span>
            <span className="product-modify">
                <button onClick={() => modifyProduct(id)}>Szerkesztés</button>
            </span>

            <span className="product-delete">
                <button onClick={() => deleteProduct(id)}>Törlés</button>
            </span>
        </div>
        </>
    )
}
import {createProduct, deleteProduct} from '../../Services/Crud'
import { useState } from 'react'

export default function CreateProduct(){

    const[title, setTitle] = useState("")
    const[price, setPrice] = useState("")
    const[description, setDescription] = useState("")

    function Titlechange (e){
            setTitle(e.target.value)
    }

    function Pricechange (e) {
        setPrice(e.target.value)
    }

    function Descriptionchange (e){
        setDescription(e.target.value)
    }

    function handleSubmit (e){
        e.preventDefault();
        createProduct(price, title, description)
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor = "Title" >Termék neve:</label>
            <input name ="Title" type= "text" value= {title} onChange ={Titlechange} required />

            <label htmlFor= "Price" >Ár</label>
            <input name = "Price" type= "number" value= {price} onChange ={Pricechange} required />

            <label htmlFor ="Description" >Leírás</label>
            <input name ="Description" type= "text" value= {description} onChange ={Descriptionchange} required />

            <button type='submit'>Create product</button>
        </form>    

        </>
    )
}
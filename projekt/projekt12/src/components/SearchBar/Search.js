import './Searchbar-style.css';
import listProduct from "../../Services/Crud";
import  { getProducts } from "../../Services/Crud";
import {useEffect, useState} from "react"
import ProductCard from "../Products/ProductCard";
import Searchbar from './Searchbar';

function Search(props) {

  
  const [searchedValue, setSearchedValue] = useState("")
  
  const onSearchingg = (searchvalue)=>{
    console.log(searchvalue)
    setSearchedValue(searchvalue)
   
    }

  return (
   <>
        <Searchbar 
        onSearching = {onSearchingg}
        />
       {{searchedValue} && <div></div>}
   </>
  );
}

export default Search;
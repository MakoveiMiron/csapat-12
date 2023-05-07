import './Searchbar-style.css';


import {useEffect, useState} from "react"
import ProductCard from "../Products/ProductCard";
import Searchbar from './Searchbar';

function Search(props) {

  
  const [searchedValue, setSearchedValue] = useState("")
  
  const onSearchingg = (searchvalue)=>{
    
    setSearchedValue(searchvalue)
    console.log(searchedValue)
   
    }

  return (
   <>
        <Searchbar 
        onSearching = {onSearchingg}
        />
       {{searchedValue} && <ProductCard product = {searchedValue}/>}
   </>
  );
}

export default Search;
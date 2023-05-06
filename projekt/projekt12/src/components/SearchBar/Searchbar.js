
import { useState } from 'react';

const Searchbar = (props) => {
    const [value, setValue] = useState("");
    const products = [{title:"kave1"},{title:"kave"}, {title:"kave",}]
    
    const [filteredProduct, setFilteredProduct] = useState()
  
    const onChange = (event) => {
        setValue(event.target.value);
      };
    
    const onSearch = (searchTerm) => {
        setValue(searchTerm)
       //  props.onSearching(searchTerm)
        //console.log("search ", searchTerm);

        const searchedProduct = products.filter((product)=>
        searchTerm === product.title)
              //console.log(searchedProduct)
        setFilteredProduct(searchedProduct)
        props.onSearching(searchedProduct)
      }
      
    return(
        <div className="Filter">
            <input type="text" value={value} onChange={onChange}/>
            <button onClick={(()=>{onSearch(value)})}>Kereses</button>
           
        </div>

    )
}

export default Searchbar
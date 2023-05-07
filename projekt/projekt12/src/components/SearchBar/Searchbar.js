
import { useState } from 'react';

const Searchbar = (props) => {
    const [value, setValue] = useState("");
    const products = [{nev:"kave1",ar :10},{nev:"kave2", ar :10}, {nev:"kave3", ar :10}]
    
    const [filteredProduct, setFilteredProduct] = useState() ///
  
    const onChange = (event) => {
        setValue(event.target.value); /// ez majd extrahoz kell 
      };

      function klick(e) {
        e.preventDefault();
      
        const searchedProduct = products.filter((product)=>
              value === product.nev)

        console.log(searchedProduct)
        setFilteredProduct(searchedProduct) ///
        props.onSearching(searchedProduct)
      }
      
    return(
        <div className="Filter">
            <input type="text" value={value} onChange={onChange}/>
            <button onClick={klick}>Kereses</button>
           
        </div>

    )
}

export default Searchbar
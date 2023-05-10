import './Searchbar-style.css';
import { useState } from 'react';

const Searchbar = (props) => {
    const [value, setValue] = useState("");
    
    
   
    const onChange = (event) => {
        
        let text = event.target.value;
        setValue(text.toLowerCase()); /// ez majd extrahoz kell 
        
      };
  

      function handleClick() {
        
       const filtered = props.productList.filter(product => ((product.title).toLowerCase()).includes(value));
       props.setFilteredProducts(filtered)
      
      }

      function allProducts(){
        props.setFilteredProducts(props.productList)
      }
      
    return(
        <div className="Filter">
            <input type="text" value={value} onChange={onChange}/>
            <button onClick={allProducts}>x</button>
            <button onClick={handleClick}>Kereses</button>
        </div>

    )
}

export default Searchbar
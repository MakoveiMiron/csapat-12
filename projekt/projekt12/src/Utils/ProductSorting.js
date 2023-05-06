

export function fromAtoZ(products){
    let sortedProducts = [...products];
    return sortedProducts.sort((a, b) => {
       
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
      
        // names must be equal
        return 0;
      });
}

 export function fromZtoA(products){
    let sortedProducts = [...products];
    return sortedProducts.sort((a, b) => {
       
        if (a.title > b.title) {
          return -1;
        }
        if (a.title < b.title) {
          return 1;
        }
      
        // names must be equal
        return 0;
      });
   
}
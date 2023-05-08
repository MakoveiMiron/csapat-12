import { API_URL } from "../Constans/firebaseConstans"

export function readProducts(){
    return(
        fetch(`${API_URL}termekek.json`)
        .then(resp => resp.json())
    )
}


export function createProduct(){
    return(
        fetch(`${API_URL}termekek.json`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: "Szuper kávé, vedd meg!", price : 69})
        })
        .then(data => data.json())
        .then(resp => updateProduct(resp.name))
    )
}

export function updateProduct(id){
    return(
        fetch(`${API_URL}termekek/${id}.json`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({id})
        })
    )
}
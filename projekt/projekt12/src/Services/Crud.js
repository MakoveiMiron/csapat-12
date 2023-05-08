import { API_URL } from "../Constans/firebaseConstans"

export function readProducts(){
    return(
        fetch(`${API_URL}termekek.json`)
        .then(resp => resp.json())
    )
}


export function createProduct(price, title, description){
    return(
        fetch(`${API_URL}termekek.json`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, price, description})
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


export function deleteProduct(id){
    return(
        fetch(`${API_URL}termekek/-NUw57F_mVwK4KK7o-WZ.json`,{
            method: 'DELETE'
        })
    )
}
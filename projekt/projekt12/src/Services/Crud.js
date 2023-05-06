import { API_URL } from "../Constans/firebaseConstans"

export default function listProduct(){
    return(
        fetch(`${API_URL}termekek.json`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    })
    .then(resp => resp.json())
    )
}

export const getProducts = () =>
    fetch(`${API_URL}termekek.json`)
        .then(resp => resp.json())

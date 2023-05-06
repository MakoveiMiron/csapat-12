import { API_URL } from "../Constans/firebaseConstans"

export function readProducts(){
    return(
        fetch(`${API_URL}termekek.json`)
        .then(resp => resp.json())
    )
}



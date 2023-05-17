import { API_KEY, API_URL } from "../constans/firebaseConstans";

export async function registrationUser(data){
        return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email : data.email, password : data.password, returnSecureToken: true})
        })
        .then(resp => resp.json())
        .then(respdata => {
            fetch(`${API_URL}vasarlok/${respdata.localId}.json`,{
                method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: data.name, uid: respdata.localId})
            })
        })
        
}
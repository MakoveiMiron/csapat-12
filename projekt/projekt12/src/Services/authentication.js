import { API_KEY, API_URL } from "../Constans/firebaseConstans";

export function registrationUser(data){
        return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email : data.email, password : data.password, returnSecureToken: true})
        })
        .then(resp => resp.json())
        
}
import {useState} from 'react';
import { registrationUser } from '../Services/authentication.js';

export default function Registration(){
    const [registration, setRegistration] = useState(false)
    const [formData, setFormData] = useState({email: '',password: ''})
    function registrationHandler(e){
        e.preventDefault()
        
        registrationUser(formData)
        .then(data => console.log(data))
        
    }

    return(
        <form onSubmit={registrationHandler}>
            <p><input type='email' name='email' value={formData.email} onChange={(e)=> setFormData({...formData, email: e.target.value})} placeholder='E-mail' /></p>
            <p><input type='password' name='password' value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder='jelszó' /></p>
            <p><button type='submit'>Regisztráció</button></p>
        </form>
    )
}
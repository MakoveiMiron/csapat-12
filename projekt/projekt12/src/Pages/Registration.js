import {useState} from 'react';
import { registrationUser } from '../Services/authentication.js';
import { API_URL } from '../Constans/firebaseConstans.js';

export default function Registration(){
    const [registration, setRegistration] = useState(false)
    const [formData, setFormData] = useState({email: '',password: '',name:''})
    function registrationHandler(e){
        e.preventDefault()
        registrationUser(formData)
    }

    return(
        <form onSubmit={registrationHandler}>
            <p><input type='text' name='name' value={formData.name} onChange={(e)=> setFormData({...formData, name: e.target.value})} placeholder='Nevedet ide írd' /></p>
            <p><input type='email' name='email' value={formData.email} onChange={(e)=> setFormData({...formData, email: e.target.value})} placeholder='E-mail' /></p>
            <p><input type='password' name='password' value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder='jelszó' /></p>
            <p><button type='submit'>Regisztráció</button></p>
        </form>
    )
}
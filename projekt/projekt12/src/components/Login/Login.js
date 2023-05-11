import {useState} from 'react'

export default function Login(){
    const [login, setLogin] = useState("")

    function loginHandler(e){
        e.preventDefault()

        const email = e.target.elements.email.value;
        const password = e.target.elements.pw.value;
        const obj={
            email,
            password
        }

        console.log(obj)
    }
    return(
        <form onSubmit={loginHandler}>
            <h3>Email cim</h3>
            <p><input type='email' name='email' placeholder='E-mail cím' /></p>
            <h3>Jelszó</h3>
            <p><input type='password' name='pw' placeholder='jelszó' /></p>
            <button type='submit'>Belépés</button>
        </form>
    )
}
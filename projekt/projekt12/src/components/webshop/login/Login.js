import React, {useState,useContext,useEffect} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../../constans/firebaseConfig';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoggedInUserContext } from '../../../contexts/LoggedInUserContext';
import { API_URL } from '../../../constans/firebaseConstans';
import { toast } from "react-toastify";
import "./login.css";
 
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ user, setUser ] = useContext(LoggedInUserContext);
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            console.log(userCredential)
            toast.success("Sikeres belépés!", {
				            position: toast.POSITION.TOP_RIGHT,
			            });

            fetch(`${API_URL}vasarlok/${userCredential._tokenResponse.localId}.json`)
            .then(data => data.json())
            .then(resp => {
                setUser({name: resp.name, email: userCredential.user.email, uid: userCredential.user.uid});
            })
            navigate("/")
        })
        .catch((error) => {
            toast.error("Helytelen email-cím vagy jelszó!", {
                    position: toast.POSITION.TOP_RIGHT,
                });
        });
       
    }
    useEffect(()=>{
        if(user)navigate("/");
    },[])
    
    return(
        
        <>
            <main className='loginMain' >        
                <section>
                    <div className='wrapper'>                                                                
                                                       
                        <form>                                              
                            <div>
                                <h1 className='login-h1'>Bejelentkezés</h1>
                                <label htmlFor="email-address">
                                </label>
                                <p><input 
                                    className='login-input'
                                    id="email-address"
                                    name="email"
                                    type="email"                                    
                                    required
                                    placeholder='Email cim'                                                                                
                                    onChange={(e)=>setEmail(e.target.value)}
                                /></p>
                            </div>

                            <div>
                                <label htmlFor="password">
                                </label>
                                <p><input
                                    className='login-input'
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required
                                    placeholder='Jelszó'                                                                                
                                    onChange={(e)=>setPassword(e.target.value)}
                                /></p>
                            </div>
                                                
                            <div>
                                <button
                                    className='login-button'                                    
                                    onClick={onLogin}                                        
                                >      
                                    Belépés                                                                  
                                </button>
                            </div>                               
                        </form>
                       
                        <p className="text-sm text-white text-center">
                            Nincs fiókod? {' '}
                            <NavLink to="/regisztracio">
                                Regisztrálok
                            </NavLink>
                        </p>
                                                   
                    </div>
                </section>
            </main>
        </>
        
    )
}
 
export default Login
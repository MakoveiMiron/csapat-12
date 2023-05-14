import React, {useState,useContext,useEffect} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../Constans/firebaseConfig';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoggedInUserContext } from '../../contexts/LoggedInUserContext';
import { API_URL } from '../../Constans/firebaseConstans';
import { toast } from "react-toastify";
 
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
            toast.success("Sikeres belépés!", {
				            position: toast.POSITION.TOP_RIGHT,
			            });

            fetch(`${API_URL}vasarlok/${userCredential._tokenResponse.localId}.json`)
            .then(data => data.json())
            .then(resp => {
                setUser({name: resp.name});
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
            <main >        
                <section>
                    <div>                                            
                        <p> FocusApp </p>                       
                                                       
                        <form>                                              
                            <div>
                                <label htmlFor="email-address">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email address"
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                                                
                            <div>
                                <button                                    
                                    onClick={onLogin}                                        
                                >      
                                    Login                                                                  
                                </button>
                            </div>                               
                        </form>
                       
                        <p className="text-sm text-white text-center">
                            No account yet? {' '}
                            <NavLink to="/">
                                Sign up
                            </NavLink>
                        </p>
                                                   
                    </div>
                </section>
            </main>
        </>
        
    )
}
 
export default Login
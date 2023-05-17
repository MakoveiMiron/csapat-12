import {useState} from 'react';
import { registrationUser } from '../Services/authentication.js';
import { API_URL } from '../Constans/firebaseConstans.js';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../Constans/firebaseConfig.js';
import { toast } from "react-toastify";
import { NavLink, useNavigate } from 'react-router-dom';
import "./registration.css";



const Signup = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password, name)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            fetch(`${API_URL}vasarlok/${userCredential._tokenResponse.localId}.json`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({uid: userCredential._tokenResponse.localId, name})
            })
            .then(data => data.json())
            .then(resp => {
			            toast.success("Sikeres regisztráció!", {
				            position: toast.POSITION.TOP_RIGHT,
			            });
		    });
            navigate("/belepes")
        })
        .catch((error) => {
            toast.error("A regisztráció sikertelen volt!", {
                position: toast.POSITION.TOP_RIGHT,
            });
        });
        
   
    }
    return (
        <main className='regMain' >        
            <section>
                <div className='wrapper-reg'>
                    <div>                  
                        <h1> Regisztráció </h1>                                                                            
                        <form>    
                        <div>
                                <label htmlFor="name">
                                </label>
                                <input
                                    type="text"
                                    label="Full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} 
                                    required                                 
                                    placeholder="Teljes név"              
                                />
                            </div>  

                            <div>
                                <label htmlFor="email-address">
                                </label>
                                <input
                                    type="email"
                                    label="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}  
                                    required                                    
                                    placeholder="Email cim"                                
                                />
                            </div>
    
                            <div>
                                <label htmlFor="password">
                                </label>
                                <input
                                    type="password"
                                    label="Create password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required                                 
                                    placeholder="Jelszó"              
                                />
                            </div>    
                                            
                            
                            <button
                                type="submit" 
                                onClick={onSubmit}                        
                            >  
                                Regisztráció                              
                            </button>
                                                                         
                        </form>
                       
                        <p>
                            Van már fiókod?{' '}
                            <NavLink to="/belepes" >
                                Belépek
                            </NavLink>
                        </p>                   
                    </div>
                </div>
            </section>
        </main>
      )
    }
    
    export default Signup


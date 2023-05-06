import { NavLink } from "react-router-dom";
import "./Footer.css"

export default function Footer(){
    return(
        <>
            <footer className="Footer">
                <div className="Info">
                    <span>Cím: ...</span>
                    <span>E-mail: ...</span>
                    <span>Telefonszám: ...</span>
                </div>
                <div className="ContactMe">
                    <a href="/#">Lépj velünk kapcsolatba!</a>
                </div>
                <div className="Map">
                    térkép
                </div>
            </footer>
        </>
    )
}
import { useState } from "react"
import { Link } from "react-router-dom"
import "./Home.css"

export default function Home(){
const [user, setUser] = useState(false)

    return(
        <>
            <main className="main">
                <div className="about">
                    <p className="intro">Bemutatkozás</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe mollitia laborum quidem sunt accusamus totam, maxime provident reprehenderit enim repudiandae eius corporis voluptatum temporibus non explicabo tenetur rem quo quos? Sint facere voluptates cum totam. Repellat quasi enim cum ex eveniet voluptates, deserunt error quo voluptate, iure molestias dicta voluptatum laudantium atque odio omnis corrupti! Non ratione eius maxime quas molestiae cum nulla et sequi minima. </p>
                </div>
                <div className="top-products">
                    Kiemelt termékek
                </div>
                <div className="news">
                    Hírek
                </div>
                <div className="blog">
                    Blog
                </div>

            </main>
        </>
    )
}
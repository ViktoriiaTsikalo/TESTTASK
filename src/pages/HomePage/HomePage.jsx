import { Header } from "../../components/Header/Header"
import { Hero } from "../../components/Hero/Hero"
import { RegisterForm } from "../../components/RegisterForm/RegisterForm"
import { Users } from "../../components/Users/Users"

export const HomePage = () =>{
    return(
        <>
        <Header/>
        <main>
            <Hero/>
            <Users/>
            <RegisterForm/>
        </main>
       
        </>
    )
}
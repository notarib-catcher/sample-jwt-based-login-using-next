
import { stringify } from 'querystring'
import {URL} from 'url'
import Topbar from "./src/topbar"
export default function loginpage(){
    let logininvaliddebounce = false
    let debounce = false
    let handleLoginFormSubmit = async (submitEvent) => {
       
        
        if(debounce){
            return;
        }
        submitEvent.preventDefault()
        if(submitEvent.target.username.value == "" || submitEvent.target.password.value == ""){
            if(logininvaliddebounce == true){
                return;
            }
            logininvaliddebounce = true
            document.getElementById("submitbutton").innerText = "Invalid details"
            document.getElementById("submitbutton").className = "submit-btn-red-animated"
            setTimeout(() => {
                document.getElementById("submitbutton").innerText = "Go"
                document.getElementById("submitbutton").className = "submit-btn-cyan-animated"
                logininvaliddebounce = false
            }, 1000);
            return;
        }
        let res = await fetch("http://"+window.location.host+"/api/auth",{
            method:'POST',
            body: JSON.stringify({
                "username" : submitEvent.target.username.value,
                "password" : submitEvent.target.password.value
            })
        })

        if(res.status == '200'){
            
            let authtoken = await (await res.text()).toString()
            debounce = true
            document.cookie = 'usr_log_token=' + authtoken 
            logininvaliddebounce = true
            document.getElementById("submitbutton").disabled = true
            document.getElementById("submitbutton").innerText = "Logged in!"
            document.getElementById("submitbutton").className = "submit-btn-green-animated"
            setTimeout(() => {
                
                window.location.replace("http://"+window.location.host);
            }, 1000);
            return;
        }
        else{
            logininvaliddebounce = true
            document.getElementById("submitbutton").innerText = "Unauthorised"
            document.getElementById("submitbutton").className = "submit-btn-red-animated"
            setTimeout(() => {
                document.getElementById("submitbutton").innerText = "Go"
                document.getElementById("submitbutton").className = "submit-btn-cyan-animated"
                logininvaliddebounce = false
            }, 1000);
            return;
        }
        
    }
    return(
        <div className="h-screen w-screen bg-slate-400">
            <Topbar />
            <div className=" h-full w-full flex flex-col justify-center items-center">
                    <form onSubmit={handleLoginFormSubmit} className="flex flex-col px-8 py-6 bg-white shadow-lg rounded-md h-2/5 w-1/5">
                        <div className="text-center font-extrabold border-b-2 py-2 pb-4">Please login.</div>
                        <label className="py-2 font-semibold pt-4">Username</label>
                        <input name="username" type="text" className="hover:bg-slate-100 focus:border-yellow-200 duration-200 rounded-md border-2 outline-none px-2 py-1"></input>
                        <label className="py-2 font-semibold">Password</label>
                        <input name="password" type="password" className="hover:bg-slate-100 focus:border-yellow-200 duration-200 rounded-md border-2 outline-none px-2 py-1"></input>
                        <button id="submitbutton" type="submit" className="submit-btn-cyan-animated">Go</button>
                    </form>
            </div>
        </div>
        
    )
}
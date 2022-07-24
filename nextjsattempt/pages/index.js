
import styles from '../styles/Home.module.css'
import Topbar from './src/topbar'

export default function Home() {
  return (
    <div className="bg-black h-screen w-screen">
      <Topbar />
      <div className="flex flex-col text-white font-light h-full w-full justify-center items-center">
        <div className="h-3/4 w-3/4">
          <div className="text-center">
            <h1 className="text-9xl">Welcome!</h1><br>
            </br><div className="text-4xl">You<span>&#8216;</span>re logged in!</div>
          </div>
        </div>      
      </div>
    </div>
    
  )
}

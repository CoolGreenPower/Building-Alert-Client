import Navbar from "../components/Navbar"
import React from "react"


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full">
        <div className="sticky top-0 h-[70px] z-20">
            <Navbar />
            {/* <button className="bg-primary">SDFSDF</button>
            <p className="text-lg">HOWE:FIJWEPOI:FJ</p> */}
        </div>
      
      <div>
        {children}

      </div>


    </div>
  )
}

export default Layout
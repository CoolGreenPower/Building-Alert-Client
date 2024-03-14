import { Link } from 'react-router-dom';
import { navLinks } from "../constants/index.ts"
import { useState } from 'react';
import logo from "../assets/logo.ico";
import menu from "../assets/hamburger.svg"

const Navbar = () => {
    const [active, setActive] = useState<string>("");
    const [toggle, setToggle] = useState<boolean>(false);

    const logout = async() => {
        const response = await fetch('/api/admin/signout', { method: 'POST' });
        if (!response.ok) { alert("Something went wrong"); return; }
        window.location.href = "/adminlogin";
    }

  return (
    <nav className="px-[1rem] w-full flex items-center py-5 fixed top-0 bg-background-darker">
        <div className="w-full flex justify-between items-center mx-auto">
            <div className="flex flex-row">
                <Link to="/" className='flex items-center gap-2' onClick={() => {
                setActive("");
                }}>
                <img alt="logo" src={logo} className='w-7 h-7 object-contain'/>
                <p className='text-white text-[16px] font-bold cursor-pointer'>Admin</p>
                </Link>
            </div>


        <ul className='list-none hidden md:flex flex-row gap-10'>
            { navLinks.map((nav) => (
                <li key={nav.id} className={`${active === nav.title ? "text-primary" : "text-white"} 
                hover:text-primary text-[16px] font-medium cursor-pointer`} 
                onClick={() => setActive(nav.title)}>
                <Link to={`${nav.url}`}>{nav.title}</Link>
                </li>
            ))}

            <li>
                <button onClick={logout} className="border-lightslate bg-lightslate px-2 hover:bg-transparent border-2 rounded text-[16px] font-poppins font-medium">Logout</button>
            </li>
        </ul>

        <div className='md:hidden flex flex-1 justify-end items-center'>
            <img src={menu} alt="menu" className='w-[30px] h-[30px] object-contain cursor-pointer'
            onClick={() => setToggle(!toggle)} />
            <div className={`${!toggle ? 'hidden' : 'flex'} p-6 bg-slate-500 absolute top-20 
                        right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
                <ul className='list-none flex justify-end items-start flex-col gap-4'>
                    { navLinks.map((nav) => (
                    <li key={nav.id} className={`${active === nav.title ? "text-primary" : "text-white"} 
                        font-poppins font-medium cursor-pointer text-[16px]`} 
                        onClick={() => {setToggle(!toggle); setActive(nav.title);}}>

                        <Link to={`${nav.url}`}>{nav.title}</Link>
                    </li>
                    ))}
                    <li>
                        <button onClick={logout} className="border-lightslate bg-transparent border-2 rounded text-[16px] font-poppins font-medium">Logout</button>
                    </li>
                </ul>
            </div>
        </div>
        </div>
        
    </nav>
  )
}

export default Navbar
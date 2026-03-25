// 'use client'

import Image from "next/image"
import Link from "next/link"
import { BiNotification, BiUser, BiUserCircle } from "react-icons/bi"
import { BsHouse } from "react-icons/bs"
import { FaUserTag } from "react-icons/fa"
import { GiRaspberry } from "react-icons/gi"
import { LuRollerCoaster } from "react-icons/lu"
interface SideBarItem {
    title: string,
    description: string,
    icon: any,
    isOpen: Boolean,
    path: string,
}
export const Sidebar = () => {
    const sideBarItems: SideBarItem[] = [
        {
            title: "Residenciales",
            description: "Listado de residenciales",
            icon: <BsHouse size={35} />,
            isOpen: false,
            path: '/residenciales'
        },
        {
            title: "Raspberrys",
            description: "Reportes de raspberrys",
            icon: <GiRaspberry size={35} />,
            isOpen: false,
            path: '/raspberries'
        },
        {
            title: "Usuarios",
            description: "Listado de usuarios",
            icon: <BiUserCircle size={35} />,
            isOpen: false,
            path: '/usuarios'
        },
        {
            title: "Roles",
            description: "Listado de roles",
            icon: <FaUserTag size={35} />,
            isOpen: false,
            path: '/roles'
        },
        {
            title: "Notificaciones",
            description: "opciones de notificacion",
            icon: <BiNotification size={35} />,
            isOpen: false,
            path: '/notificaciones'
        },
    ]
    return (
        <div className="w-full h-full flex flex-col items-center 
        bg-blue-600 ">
            <button className="w-max-min  min-h-min justify-center items-center bg-white m-4 p-4 rounded-3xl cursor-pointer hover:scale-110" >
                <Image
                    src='https://visitapp.io/images/visitapp_logo.png'
                    alt="visitapp_logo"
                    width={250}
                    height={250}
                    priority
                />
            </button>
            {sideBarItems.map(({ title, description, icon, isOpen, path }, idx) => (
                <Link
                    href={path}
                    key={`${title}${idx}`}
                    className={`w-full flex flex-row rounded-3xl cursor-pointer p-4 hover:scale-110 my-4  hover:bg-white hover:text-blue-600
                     ${isOpen ? "bg-orange-200 text-blue-600" : "bg-blue-600 text-white"}`}>
                    <p className="px-4">{icon}</p>
                    <span className=" px-4 text-xl">{title}
                        {/* <p className="px-4 ">{description}</p> */}
                    </span>
                </Link>
            ))}
        </div>
    )
}

// 'use client'
import { HeartFillIcon } from "@primer/octicons-react"
// import Image from "next/image"
// import { Component } from "react"


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
            icon: <HeartFillIcon />,
            isOpen: false,
            path: '/residentials'
        },
        {
            title: "Raspberrys",
            description: "Reportes de raspberrys",
            icon: <HeartFillIcon />,
            isOpen: false,
            path: '/rasberrys'
        },
        {
            title: "Residenciales2",
            description: "Listado de residenciales",
            icon: <HeartFillIcon />,
            isOpen: false,
            path: '/residentials2'
        },
        {
            title: "Raspberrys2",
            description: "Reportes de raspberrys",
            icon: <HeartFillIcon />,
            isOpen: false,
            path: '/rasberrys2'
        },
    ]



    return (
        <div className="w-full h-full flex flex-col items-center bg-black border-white outline-1 outline-red-500 ">
            
            <p className="text-3xl font-bold text-white ">Residenciales</p>
           
            
            {sideBarItems.map(({ title, description, icon, isOpen, path }, idx) => (
                
                <div key={`${title}${idx}`} className={`w-full h-[100px]  flex flex-col  ${isOpen ? " bg-white text-blue-600" : "bg-blue-600 text-white"}`}>
                    
                    <p className="  text-4xl">{title}</p>
                    
                    <p className="  text-5xl">{description}</p>
                    
                    <p className=" ">{icon}</p>

                    <p className="m-4">{path}</p>

                </div>
            ))}
        </div>

    )
}

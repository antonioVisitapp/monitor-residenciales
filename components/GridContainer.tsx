import React, { ReactNode } from 'react'


type DashboardContainerType = {
    component: ReactNode
}

function GridContainer({ component }: DashboardContainerType) {
    return (

        <div className={`w-full h-full items-center justify-center grid gap-4
                    md:h-screen
                    lg:grid-cols-2
                    xl:grid-cols-3
                    
                    `}>
            {component}
        </div>

    )
}

export default GridContainer
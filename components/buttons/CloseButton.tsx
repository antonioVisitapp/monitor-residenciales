import React from 'react'

type CloseButtonProps = {
    onClick: () => void
}

function CloseButton({ onClick }: CloseButtonProps) {
    return (
        <div className="
        border-solid border-l-pink-800 bg-red-500 
        
        rounded-2xl

        ">

        <button
            onClick={onClick}
            className=" p-2 md:text-3xl text-xl text-black shadow-3xl font-bold cursor-pointer   ">
            X
        </button>
                </div>
    )
}

export default CloseButton
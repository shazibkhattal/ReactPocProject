import React from "react"

const AfterTransaction=(
    setToggle:React.Dispatch<React.SetStateAction<boolean>>,
    setButtonProperty: React.Dispatch<React.SetStateAction<{
        text: string;
    }>>
    )=>{
    //console.log("After Transaction Rendered")
    setToggle(false)
        setTimeout(() => {
            setButtonProperty(prevValues => {
                return { ...prevValues, text: "Make Payment" }
            })
        }, 3000)
}
export default AfterTransaction;
import { useEffect, useState } from "react";

const Cashback=({getInputValue}:{getInputValue:any})=>{
    const [cashbackValue,setCashbackValue]=useState<number>(0)
    useEffect(()=>{
        
    console.log("Cashback Componenet Rendered")
        let value:number=0
        value=parseFloat(getInputValue());
        setCashbackValue(value)
    },[getInputValue])

    console.log(cashbackValue)
    
    return(
        
        <div style={{color:"blue", fontFamily:"cursive",margin:"20px"}}>
          
           {
                Number.isNaN(cashbackValue)?
                null
                :
                <p>Cashback Value: {cashbackValue}</p>
           } 
        </div>
    )
}
export default Cashback;
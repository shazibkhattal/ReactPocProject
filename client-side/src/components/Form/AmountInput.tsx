import { InputAdornment, OutlinedInput } from "@material-ui/core"
import React from "react";

const AmountInput=(
    {inputValue,setInputValue}
    :
    {
    inputValue:string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    }
    )=>{
        
    return(
        <OutlinedInput
        style={{backgroundColor:"white"}}
        className="nextLine"
        id="outlined-adornment-weight"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        aria-describedby="outlined-weight-helper-text"
        inputProps={{
            'aria-label': 'weight',
        }}
        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
    />
    );
}
export default AmountInput;
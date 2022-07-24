import { Button } from "@material-ui/core";

const PaymentButton = ({MemoizeGSTcalculator}:{
    MemoizeGSTcalculator:() => any,
    }) => {
    console.log("GST Calculator  Button Rendered")
    return (
        <Button variant="outlined" color="primary" id="sendMessageButton" onClick={() => {
            MemoizeGSTcalculator()
        }}>Calculate GST</Button>
    );
}
export default PaymentButton;
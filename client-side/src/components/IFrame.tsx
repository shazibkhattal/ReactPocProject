import './IFrame.css'
const IFrame:any =()=>{
return(
<>
    <iframe
        id="pFrame"
        src="http://localhost:3001/IFrameContent"
        width="500"
        height="500"
        className='main'     
    />
</>
)
}
export default IFrame;
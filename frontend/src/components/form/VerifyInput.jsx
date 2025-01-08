import { useState , useRef, useEffect } from "react";


const VerifyInput = ({length, verifyOtp, location}) => {

  const [otp, setotp] = useState(new Array(length).fill(""))
  const inputRef = useRef([])
  // const navigate = useNavigate()

  // const { verifyOtp } = useAuthStore()

  console.log(location);
  
  
  useEffect(() => {
    inputRef.current[0].focus()
  }, [])
  

  const handleChange = async (index,e) => {
    const value = e.target.value;
    if(isNaN(value)) return;

    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length-1);

    setotp(newOtp)

    const finalOtp = newOtp.join("")

    if (finalOtp.length === length) {
      const res = await verifyOtp(finalOtp)
      if (res.success) {
        window.location.href = location
      }
      
    }
    
    if (value && index < length - 1) {
      inputRef.current[index + 1].focus()
    }
  }
  
  const handleClick = (index) => {
    inputRef.current[index].setSelectionRange(1,1)
  }

  const handleKeyDown = (e,index) => {
    if(e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus()
    }
  }
  

  return (
    <div className="flex justify-center gap-2 mt-6">
      {
      otp.map((value, index)=> {
        return <input 
        ref={el => inputRef.current[index] = el}
        key={index} 
        type="text"
        onChange={(e)=>handleChange(index,e)}
        onClick= {()=>handleClick(index)}  
        onKeyDown={(e)=> handleKeyDown(e,index)}
        className="bg-primaryLight max-w-[50px] w-[calc((100%-2.5rem)/6)] aspect-square
        text-[1.5em] text-center"
        value = {value}
        />
      }) 
      }
    </div>
  )
}

export default VerifyInput
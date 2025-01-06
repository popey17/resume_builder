import { useState , useRef, useEffect } from "react";


const VerifyPasswordReset = ({length, setOtp , className}) => {

  const [otp, setotp] = useState(new Array(length).fill(""))
  const inputRef = useRef([])
  
  
  useEffect(() => {
    inputRef.current[0].focus()
  }, [])
  

  const handleChange = (index,e) => {
    const value = e.target.value;
    if(isNaN(value)) return;

    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length-1);

    setotp(newOtp)

    const joinedOtp = newOtp.join("")

    if (joinedOtp.length === length) {
      setOtp(joinedOtp)
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
    <div className={`flex justify-center gap-2 mt-6 ${className}`}>
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

export default VerifyPasswordReset
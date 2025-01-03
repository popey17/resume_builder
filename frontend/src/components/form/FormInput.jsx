import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";



const FormInput = ({ id, type, value, placeholder }) => {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="bg-primaryLight w-full rounded-md overflow-hidden flex items-center has-[input:focus]:bg-primaryLight2">
      <input id={id}
        type={type === 'password' && !showPassword ? 'password' : 'text'}
        value={value}
        className=" bg-primaryLight w-full p-2 text-gray-500 focus:outline-0 focus:bg-primaryLight2"  placeholder={placeholder} 
      />
      
      {type === "password" && 
      <button type="button" className="bg-transparent pr-2" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <IoEyeOffOutline className="text-gray-500 text-[20px]" /> : <IoEyeOutline className="text-gray-500 text-[20px]" />}
      </button>
      }
    </div>
  )
}

export default FormInput
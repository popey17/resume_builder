import { useState } from "react";
import Button from "../components/button/Button"
import FormInput from "../components/form/FormInput"
import FormLabel from "../components/form/FormLabel"
import { useAuthStore } from "../store/AuthStore";
import { ColorRing } from 'react-loader-spinner'


const Register = () => {

  const [newUserCredentials, setNewUserCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { register , isLoading } = useAuthStore();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(newUserCredentials);
    await register(newUserCredentials);
  }


  return (
    <div className="main min-h-screen bg-gradient-to-b from-white from-0% via-white via-70% to-primaryHover to-100%">
      <div className=" justify-center py-[4%]">
        <div className="max-w-[450px] mx-auto px-[20px]">
          <h1 className="text-[35px] font-medium font-homeTitle text-center">Welcome to ResuMate!</h1>
          <p className="mb-10 text-center">Sign up to create stunning resumes,<br/>Your dream job is just a few clicks away!</p>
          <form onSubmit={handleRegister} className="max-w-[310px] mx-auto">
            <div className="mb-6">
              <FormLabel htmlFor="name">Username</FormLabel>
              <FormInput type="name" id="name" placeholder="Enter your username" onChange={(e) => setNewUserCredentials({ ...newUserCredentials, name: e.target.value })} />
            </div>
            <div className="mb-6">
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput type="email" id="email" placeholder="Enter your email" 
              onChange={(e) => setNewUserCredentials({ ...newUserCredentials, email: e.target.value })} />
            </div>
            <div className="mb-6">
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormInput type="password" id="password" placeholder="Enter your password" onChange={(e) => setNewUserCredentials({ ...newUserCredentials, password: e.target.value })} />
            </div>
            <div>
              <FormLabel htmlFor="confirmPassword">Confirm your password</FormLabel>
              <FormInput type="password" id="password" placeholder="Confirm your password" onChange={(e) => setNewUserCredentials({ ...newUserCredentials, confirmPassword: e.target.value })} />
            </div>
            <div className="flex justify-center mt-8">
            <Button className="mx-auto w-full py-2 flex" {...(isLoading && { disabled: true })}>
                {isLoading ?
                <ColorRing
                  visible={true}
                  height="24"
                  width="24"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={['#FEEDE1', '#FEEDE1', '#FEEDE1', '#FEEDE1', '#FEEDE1']}
                /> 
                : "Register"}
              </Button>
            </div>
            <div className="mt-6 text-center">
              <p>Already have an account? <a href="/login" className="text-primary hover:underline">Login</a> now.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
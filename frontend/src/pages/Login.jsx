import { useState } from "react"
import Button from "../components/button/Button"
import FormInput from "../components/form/FormInput"
import FormLabel from "../components/form/FormLabel"
import { useAuthStore } from "../store/AuthStore"
import { ColorRing } from 'react-loader-spinner'



const Login = () => {


  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: ""
  })

  const { signIn, isLoading } = useAuthStore()

  const handleSignIn = async (e) => {
    e.preventDefault()
    await signIn(userCredentials)
  }



  return (
    <div className="main min-h-screen bg-gradient-to-b from-white from-0% via-white via-70% to-primaryHover to-100%">
      <div className=" justify-center py-[4%]">
        <div className="max-w-[350px] mx-auto px-[20px]">
          <h1 className="text-[35px] font-medium font-homeTitle text-center">Welcome Back!</h1>
          <p className="mb-10 text-center">login with your email to view your <br /> created resumes.</p>
          <form onSubmit={handleSignIn}>
            <div className="mb-6">
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput type="email" id="email" placeholder="Enter your email" onChange={(e) => setUserCredentials({ ...userCredentials, email: e.target.value })} />
            </div>
            <div>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormInput type="password" id="password" placeholder="Enter your password" onChange={(e) => setUserCredentials({ ...userCredentials, password: e.target.value })} />
            </div>
            <span>
              <a href="#" className="text-primary text-sm block mt-2 hover:underline">Forgot Password?</a>
            </span>
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
                : "Login"}
              </Button>
            </div>
            <div className="mt-6 text-center">
              <p>Don&apos;t have an account? <a href="/register" className="text-primary hover:underline">Register</a> Here</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
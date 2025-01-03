import FormInput from "../components/form/FormInput"
import FormLabel from "../components/form/FormLabel"

const login = () => {
  return (
    <div className="main h-screen bg-gradient-to-b from-white from-0% via-white via-70% to-primaryHover to-100%">
      <div className=" justify-center pt-[4%]">
        <div className="max-w-[350px] mx-auto px-[20px]">
          <h1 className="text-[35px] font-medium font-homeTitle text-center mb-4">Welcome Back!</h1>
          <p className="mb-4 text-center">login with your email to view your <br/> created resumes.</p>
          <form>
            <div className="mb-4">
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput type="email" id="email" placeholder="Enter your email"/>
            </div>
            <div>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormInput type="password" id="password" placeholder="Enter your password"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default login
import { useEffect, useState } from "react"
import { useAuthStore } from "../store/AuthStore"
import { assets } from "../assets/assets";
import VerifyPasswordReset from "../components/form/VerifyPasswordReset";
import Button from "../components/button/Button";
import { ColorRing } from 'react-loader-spinner'
import FormInput from "../components/form/FormInput";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {

  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { sendResetOtp, isLoading, resetPassword } = useAuthStore()


  const navigate = useNavigate();

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const otpSentCookie = getCookie("otpSent");
    const resetEmailCookie = getCookie("resetEmail");

    if (otpSentCookie === "true" && resetEmailCookie) {
      setOtpSent(true);
      setEmail(resetEmailCookie);
    }

  }, [setOtpSent])

  console.log(otp, email, newPassword, confirmPassword);


  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleSendOtp = async () => {
    const res = await sendResetOtp(email)
    if (res.success) {
      const expires = new Date();
      expires.setTime(expires.getTime() + (2 * 60 * 60 * 1000)); // 2hour
      document.cookie = `otpSent=true; expires=${expires.toUTCString()}; path=/`;
      document.cookie = `resetEmail=${email}; expires=${expires.toUTCString()}; path=/`;
      setOtpSent(true)
    }
  }

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const res = await resetPassword(otp, email, newPassword, confirmPassword);
    if (res.success) {
      document.cookie = "otpSent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "resetEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/login")
    }
  }

  return (
    <div className="main min-h-screen bg-gradient-to-b from-white from-0% via-white via-70% to-primaryHover to-100%">
      {!otpSent ?
        <div className=" justify-center py-[5%]">
          <div className="max-w-[600px] mx-auto px-[20px] text-center">
            <img src={assets.forgetPassword} alt="email verification" className="mx-auto w-full max-w-[350px] mb-6" />
            <h2 className="text-[35px] mb-3 font-medium ">
              Forget your password?
            </h2>
            <p className="mb-8">Enter your email to reset the password.</p>
          </div>
          <FormInput type="email" id="email" className='max-w-[300px] mx-auto' placeholder="Enter your email" onChange={handleEmailChange} />

          <Button type="button" className="mx-auto w-full max-w-[300px]  py-2 flex mt-6" onClick={handleSendOtp} {...(isLoading && { disabled: true })}>
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
              : "Send Password Reset Code"}
          </Button>
        </div>
        :
        <div className=" justify-center py-[10%]">
          <div className="max-w-[600px] mx-auto px-[20px] text-center">
            <h2 className="text-[35px] mb-3 font-medium ">
              Verification Code Sent
            </h2>
            <p>Check your email for <span className="text-primary font-bold">{email && email}</span>. Enter the code to continue to reset the password. The code will be expired in 2 hour. </p>
            <form onSubmit={handlePasswordReset} className="mt-6">
              <VerifyPasswordReset length={6} setOtp={setOtp} className="mb-12" />
              <FormInput type="password" id="password" className='max-w-[300px] mx-auto mb-6' placeholder="Enter your new password" onChange={handlePasswordChange} />
              <FormInput type="password" id="confirmPassword" className='max-w-[300px] mx-auto mb-6' placeholder="Confirm your new password" onChange={handleConfirmPasswordChange} />


              <Button className="mx-auto w-full max-w-[300px]  py-2 flex mt-6" {...(isLoading && { disabled: true })}>
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
                  : "Reset Password"}
              </Button>
            </form>
          </div>
        </div>
      }

    </div>
  )
}

export default ForgetPassword
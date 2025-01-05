import { useEffect, useState } from "react"
import { useAuthStore } from "../store/AuthStore"
import { assets } from "../assets/assets";
import VerifyInput from "../components/form/VerifyInput";
import Button from "../components/button/Button";


const EmailVerification = () => {

  const [otpSent, setOtpSent] = useState(false)

  const { user, sendVerifyOtp } = useAuthStore()

  useEffect(() => {
    if (user && user.verifyOtp && user.verifyOtpExpireAt > new Date().getTime()) {
      setOtpSent(true)
    }
  }, [user, setOtpSent])
  

  const handleSendOtp = async () => {
    const res = await sendVerifyOtp();
    // console.log(res);
    if (res.success) {
      setOtpSent(true)
    }
  }  

  return (
    <div className="main min-h-screen bg-gradient-to-b from-white from-0% via-white via-70% to-primaryHover to-100%">
      {!otpSent ?
        <div className=" justify-center py-[5%]">
          <div className="max-w-[600px] mx-auto px-[20px] text-center">
            <img src={assets.emailVerify} alt="email verification" className="mx-auto w-full max-w-[450px] mb-6" />
            <h2 className="text-[35px] mb-3 font-medium ">
              Verify your email address
            </h2>
            <p>For reducing the data overload we will remove the accounts that are not verify more than 30 days.</p>
          </div>
          <Button type="button" className="mx-auto py-2 flex mt-6" onClick={handleSendOtp}>
            Send Verification Code
          </Button>
        </div>
        :
        <div className=" justify-center py-[20%]">
          <div className="max-w-[600px] mx-auto px-[20px] text-center">
            <h2 className="text-[35px] mb-3 font-medium ">
              Verification Code Sent
            </h2>
            <p>Check your email for <span className="text-primary font-bold">{user?.email}</span>. Enter the code to verify the email. The code will be expired in 2 hour. </p>
            <form className="mt-6">
              <VerifyInput length={6} />
            </form>
          </div>
        </div>
      }

    </div>
  )
}

export default EmailVerification
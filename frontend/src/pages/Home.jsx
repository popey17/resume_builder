import Button from "../components/button/Button"

const home = () => {
  return (
    <div className="main h-screen bg-gradient-to-b from-white from-0% via-white via-70% to-primaryHover to-100%">
      <div className="pt-20 max-w-[840px] mx-auto px-[20px] text-center">
        <h1 className="[font-size:_clamp(2em,4vw,3.5em)] leading-tight font-homeTitle">Design Your Resume <br /> Stand Out from the Crowd!</h1>
        <p className="[font-size:_clamp(1em,2.5vw,1.5em)]  mt-5">
          Create a standout resume in minutes with our easy-to-use templates. Impress employers and land your dream job—it&apos;s fast, simple, and effective!
        </p>
        <Button href='/resume/create' link className='mt-10 py-3 px-7'>Get Started</Button>
      </div>
    </div>
  )
}

export default home
import ImageCarousel from "../components/login/ImageCarousel.jsx"
import "../components/login/ImageCarousel.css"
import NotLogin from "../components/login/NotLogin"

const LoginPage = () => {
  return (
    <div className=" w-full h-screen grid-carousel bg-gradient-to-tl from-begie to-lightBlue flex justify-center items-center  ">
    <div className=" flex  w-4/5 bg-white h-4/5  max-w-[1000px] min-w-[800px] rounded-2xl p-4  shadow-xl ">
      <div className="w-1/2 h-full  bg-inss rounded-2xl ">
        <ImageCarousel />
      </div>
      <div className="w-1/2  h-full p-8 flex justify-center items-center flex-col relative">
        <img src='/image/logo/logo.png' style={{ height: "100px" }} alt="" />
        <NotLogin />
      </div>
    </div>
  </div>
  )

};

export default LoginPage;

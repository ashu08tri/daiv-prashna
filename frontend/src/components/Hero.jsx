import Carousel from "react-multi-carousel";
import { useNavigate } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import lineage from "../assets/images/founder lineage.png";
import mission from "../assets/images/Mission.png";
import sadanand from "../assets/images/Mystic & Sadanand.png";
import yogaLeft from "../assets/images/yoga-left.png";
import lotus from "../assets/images/lotus.png";
import yogaRight from "../assets/images/yoga-right.png";
import { useTranslation } from "react-i18next";

const responsive = {
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function Hero({ onGetPath }) {
  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <>
      <div className="h-[calc(50vh)] md:h-[calc(65vh)] flex flex-col items-center">
        <div className="relative w-[calc(90vw)] hidden md:flex justify-evenly mt-16">
          <div>
            <div
              className="w-72 h-72 rounded-full overflow-hidden flex items-center justify-center"
              onClick={() => {
                onGetPath("lineage");
                navigate("/lineage");
              }}
            >
              <img src={lineage} alt="lineage" className="w-full" />
            </div>
            <p className="text-center text-custom-ivory font-semibold text-3xl py-2">
              {t("hero.mainHeading.lineage", "")}
            </p>
          </div>
          <div>
            <div
              className="w-72 h-72 rounded-full overflow-hidden flex items-center justify-center"
              onClick={() => {
                onGetPath("mission");
                navigate("/mission");
              }}
            >
              <img src={mission} alt="lineage" className="w-full" />
            </div>
            <p className="text-center text-custom-ivory font-semibold text-3xl py-2">
              {t("hero.mainHeading.mission", "Mission")}
            </p>
          </div>
          <div>
            <div
              className="w-72 h-72 rounded-full bg-black overflow-hidden flex items-center justify-center"
              onClick={() => {
                onGetPath("sadanand");
                navigate("/sadanand");
              }}
            >
              <img src={sadanand} alt="lineage" className="w-full" />
            </div>
            <p className="text-center text-custom-ivory font-semibold text-3xl py-2">
              {t(
                "hero.mainHeading.MysticismAndSadanand",
                "Mysticism & Sadanand"
              )}
            </p>
          </div>
        </div>

        <div className="w-[calc(90vw)] md:hidden mt-10 z-30 flex justify-center">
          <div className="w-full">
            <Carousel
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              transitionDuration={500}
              arrows={false}
              draggable={true}
              rtl={true}
            >
              <div>
                <div
                  className="w-72 h-72 mx-auto rounded-full overflow-hidden flex items-center justify-center"
                  onClick={() => {
                    onGetPath("lineage");
                    navigate("/lineage");
                  }}
                >
                  <img src={lineage} alt="lineage" className="w-full" />
                </div>
                <p className="text-center text-custom-ivory font-semibold text-2xl py-2">
                  {t("hero.mainHeading.lineage", "")}
                </p>
              </div>
              <div>
                <div
                  className="w-72 h-72 mx-auto rounded-full overflow-hidden flex items-center justify-center"
                  onClick={() => {
                    onGetPath("mission");
                    navigate("/mission");
                  }}
                >
                  <img src={mission} alt="lineage" className="w-full" />
                </div>
                <p className="text-center text-custom-ivory font-semibold text-2xl py-2">
                  {t("hero.mainHeading.mission", "Mission")}
                </p>
              </div>
              <div>
                <div
                  className="w-72 h-72 mx-auto rounded-full bg-black overflow-hidden flex items-center justify-center"
                  onClick={() => {
                    onGetPath("sadanand");
                    navigate("/sadanand");
                  }}
                >
                  <img src={sadanand} alt="lineage" className="w-full" />
                </div>
                <p className="text-center text-custom-ivory font-semibold text-2xl py-2">
                  {t(
                    "hero.mainHeading.MysticismAndSadanand",
                    "Mysticism & Sadanand"
                  )}
                </p>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-8 md:mb-6 md:mt-0 gap-4">
        <img src={yogaLeft} alt="" className="w-16 h-16" />
        <img src={lotus} alt="" className="w-20 h-20" />
        <img src={yogaRight} alt="" className="w-16 h-16" />
      </div>
    </>
  );
}

export default Hero;

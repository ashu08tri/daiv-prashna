import vastumodification from "../assets/images/vastu modification.png";
import horoscope from "../assets/images/horoscope.png";
import consultancy from "../assets/images/consultancy.png";
import shraddha from "../assets/images/shraddha.png";
import vastu from "../assets/images/vastu.png";
import yoga from "../assets/images/yoga.png";
import pooja from "../assets/images/Vedic  Pooja.png";
import { t } from "i18next";

export const links = [
  {
    title: "navbar.links.astrology.title",
    url: "/astrology",
    additionalData: [
      {
        title: "navbar.links.astrology.additionalData.title1",
        url: "/astrology#newhoroscope",
      },
      {
        title: "navbar.links.astrology.additionalData.title2",
        url: "/astrology#existinghoroscopeanalysis",
      },
      {
        title: "navbar.links.astrology.additionalData.title3",
        url: "/astrology#dieseaserelatedConsultancy",
      },
      {
        title: "navbar.links.astrology.additionalData.title4",
        url: "/astrology#astrologyfortheunderpriveledge",
      },
    ],
    images: [
      {
        img: horoscope,
        alt: "horoscope",
      },
      {
        img: consultancy,
        alt: "consultancy",
      },
    ],
  },
  {
    title: "navbar.links.vastu.title",
    url: "/vastu",
    additionalData: [
      {
        title: "navbar.links.vastu.additionalData.title1",

        url: "/vastu#vastumodifications",
      },
      {
        title: "navbar.links.vastu.additionalData.title2",
        url: "/vastu#newhomevastu",
      },
      {
        title: "navbar.links.vastu.additionalData.title3",
        url: "/vastu#turnkeyprojects",
      },
    ],
    images: [
      {
        img: vastu,
        alt: "vastu",
      },
      {
        img: vastumodification,
        alt: "vastumodification",
      },
    ],
  },
  {
    title: "navbar.links.pooja.title",
    url: "/pooja",
    additionalData: [
      {
        title: "navbar.links.pooja.additionalData.title1",
        url: "/pooja#poojaforgrowth",
      },
      {
        title: "navbar.links.pooja.additionalData.title2",
        url: "/pooja#poojaforovercomingobstacles",
      },
      {
        title: "navbar.links.pooja.additionalData.title3",
        url: "/pooja#poojaforreversingnegativeenergies",
      },
      {
        title: "navbar.links.pooja.additionalData.title4",

        url: "/pooja#poojaformentalpiece&happiness",
      },
      {
        title: "navbar.links.pooja.additionalData.title5",

        url: "/pooja#yearlypoojaforoverallwell-being",
      },
    ],
    images: [
      {
        img: pooja,
        alt: "pooja",
      },
    ],
  },
  {
    title: "navbar.links.yoga.title", 
    url: "/yoga",
    additionalData: [
      {
        title: "navbar.links.yoga.additionalData.title1",
        url: "/yoga#shaktiyoga",
      },
      {
        title: "navbar.links.yoga.additionalData.title2",
        url: "/yoga#astangayoga",
      },
      {
        title:"navbar.links.yoga.additionalData.title3", 
        url: "/yoga#kriyayoga",
      },
      {
        title: "navbar.links.yoga.additionalData.title4",
        url: "/yoga#hathyoga",
      },
      {
        title:
          "navbar.links.yoga.additionalData.title5",
        
        url: "/yoga#basicsofmeditation",
      },
      {
        title: 
          "navbar.links.yoga.additionalData.title6",
         
        url: "/yoga#everydaymeditation",
      },
    ],
    images: [
      {
        img: yoga,
        alt: "yoga",
      },
    ],
  },
  {
    title: "navbar.links.shraddha.title",
    url: "/shraddha",
    additionalData: [
      {
        title: "navbar.links.shraddha.additionalData.title1",
        url: "/Shraddha#yearlyshraddha",
      },
      {
        title: "navbar.links.shraddha.additionalData.title2",
        url: "/Shraddha#quaterlyshraddha",
      },
      {
        title: t(
          "navbar.links.shraddha.additionalData.title3",
          "Shraddha at Bhrama Kapal(Monthly shraddha)"
        ),
        url: "/Shraddha#monthlyshraddha",
      },
    ],
    images: [
      {
        img: shraddha,
        alt: "shraddha",
      },
    ],
  },
];

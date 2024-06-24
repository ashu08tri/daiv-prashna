import vastumodification from '../assets/images/vastu modification.png';
import horoscope from '../assets/images/horoscope.png';
import consultancy from '../assets/images/consultancy.png';
import shraddha from '../assets/images/shraddha.png';
import vastu from '../assets/images/vastu.png';
import yoga from '../assets/images/yoga.png';
import pooja from '../assets/images/Vedic  Pooja.png';

export const links = [
    {
        title: 'Astrology',
        url: '/astrology',
        additionalData: [
            {
                title: 'New Horoscope',
                url: '/astrology#newhoroscope'
            },
            {
                title: 'Existing Horoscope analysis',
                url: '/astrology#existinghoroscopeanalysis'
            },
            {
                title: 'Diesease Related Consultancy',
                url: '/astrology#dieseaserelatedConsultancy'
            },
            {
                title: 'Astrology for the underpriveledge',
                url: '/astrology#astrologyfortheunderpriveledge'
            },
            
        ],
        images: [
            {
                img: horoscope,
                alt: 'horoscope'
            },{
                img: consultancy,
                alt: 'consultancy'
            }
        ]
    },
    {
        title: 'Vastu-Shastra',
        url: '/vastu',
        additionalData: [
            {
                title: 'Vastu Modifications',
                url: '/vastu#vastumodifications'
            },
            {
                title: 'New Home Vastu',
                url: '/vastu#newhomevastu'
            },
            {
                title: 'Turn Key projects',
                url: '/vastu#turnkeyprojects'
            },
        ],
        images: [
            {
                img: vastu,
                alt: 'vastu'
            },
            {
                img: vastumodification,
                alt: 'vastumodification'
            },
            
        ]
    },
    {
        title: 'Vedic Pooja',
        url: '/pooja',
        additionalData: [
            {
                title: 'Pooja For Growth',
                url: '/pooja#poojaforgrowth'
            },
            {
                title: 'Pooja for Overcoming Obstacles',
                url: '/pooja#poojaforovercomingobstacles'
            },
            {
                title: 'Pooja for Reversing Negative Energies',
                url: '/pooja#poojaforreversingnegativeenergies'
            },
            {
                title: 'Pooja for Mental piece & Happiness',
                url: '/pooja#poojaformentalpiece&happiness'
            },
            {
                title: 'Yearly Pooja for overall well-being',
                url: '/pooja#yearlypoojaforoverallwell-being'
            },
        ],
        images: [
            {
                img: pooja,
                alt: 'pooja'
            }
        ]
    },
    {
        title: 'Yoga & Meditation',
        url: '/yoga',
        additionalData: [
            {
                title: 'Shakti Yoga',
                url: '/yoga#shaktiyoga'
            },
            {
                title: 'Astanga Yoga',
                url: '/yoga#astangayoga'
            },
            {
                title: 'Kriya Yoga',
                url: '/yoga#kriyayoga'
            },
            {
                title: 'Hath Yoga',
                url: '/yoga#hathyoga'
            },
            {
                title: 'Basics of Meditation',
                url: '/yoga#basicsofmeditation'
            },
            {
                title: 'Every day Meditation',
                url: '/yoga#everydaymeditation'
            },
            
        ],
        images: [
            {
                img: yoga,
                alt: 'yoga'
            }
        ]
    },
    {
        title: 'Shraddha (Ancestral Rites )',
        url: '/shraddha',
        additionalData: [
            {
                title: 'Yearly Shraddha',
                url: '/Shraddha#yearlyshraddha'
            },
            {
                title: 'Shraddha at Gaya(Quaterly Shraddha)',
                url: '/Shraddha#quaterlyshraddha'
            },
            {
                title: 'Shraddha at Bhrama Kapal(Monthly shraddha)',
                url: '/Shraddha#monthlyshraddha'
            }
            
        ],
        images: [
            {
                img: shraddha,
                alt: 'shraddha'
            }
        ]
    },
]
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const today = new Date().toISOString().split('T')[0]


function FormModal({ title, onClose, state, listClose,
    YogaType, VastuType, AstroType, PoojaType, ShraddhaType }) {
    const [date, setDate] = useState('');
    const [appDate, setAppDate] = useState('');
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [time, setTime] = useState('');
    const [gender, setGender] = useState('');
    const [reason, setReason] = useState('');
    const [nationality, setNationality] = useState('');
    const [country, setCountry] = useState('');
    const [organization, setOrganization] = useState('');
    const [yogaType, setYogaType] = useState(YogaType || "")
    const [vastuType, setVastuType] = useState(VastuType || "")
    const [poojaType, setPoojaType] = useState(PoojaType || "")
    const [astrologyType, setAstrologyType] = useState(AstroType || "")
    const [shraddhaType, setShraddhaType] = useState(ShraddhaType || "")
    const [astroAmount, setAstroAmount] = useState(0)
    const [yogaAmount, setYogaAmount] = useState(0)
    const [vastuAmount, setVastuAmount] = useState(0)
    const [poojaAmount, setPoojaAmount] = useState(0)

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();
    
        const service = [{
            id: Math.floor(Math.random() * 1000),name, place, reason, country, date, appDate,
            time, gender, nationality, organization,
            yogaType, vastuType, poojaType, astrologyType, shraddhaType,
            astroAmount, yogaAmount, vastuAmount, poojaAmount
        }];
    
        localStorage.setItem("userServiceData", JSON.stringify(service));
    
        if (state) {
            listClose(false);
        }
    
        setTimeout(() => {
            navigate("/payment");
        }, 400);
    };
    

    useEffect(() => {
        updateVastuAmount(vastuType);
        updateYogaAmount(yogaType);
        updateAstroAmount(astrologyType);
        updatePoojaAmount(poojaType);
    }, [vastuType, yogaType, astrologyType, poojaType]);

    const updateVastuAmount = (type) => {
        switch (type) {
            case 'Turn Key projects':
                setVastuAmount(25000);
                break;
            case 'Vastu Modifications':
            case 'New Home Vastu':
                setVastuAmount(125000);
                break;
            default:
                setVastuAmount(0);
                break;
        }
    };
    const updateYogaAmount = (type) => {
        switch (type) {
            case 'shakti yoga':
            case 'astanga yoga':
            case 'kriya yoga':
            case 'hath yoga':
            case 'basics of meditation':
            case 'every day meditation':
                setYogaAmount(55000);
                break;
            default:
                setYogaAmount(0);
                break;
        }
    }
    const updateAstroAmount = (type) => {
        switch (type) {
            case 'New Horoscope':
            case 'Existing Horoscope analysis':
            case 'Diesease Related Consultancy':
                setAstroAmount(125000);
                break;
            case 'Astrology for the underpriveledge':
                setAstroAmount(0);
                break;
            default:
                setAstroAmount(0);
                break;
        }
    };
    const updatePoojaAmount = (type) => {
        switch (type) {
            case 'Pooja For Growth':
            case 'Pooja for Overcoming Obstacles':
            case 'Pooja for Reversing Negative Energies':
            case 'Pooja for Mental piece & Happiness':
            case 'Yearly Pooja for overall well-being':
                setPoojaAmount(200);
                break;
            default:
                setPoojaAmount(0);
                break;
        }
    }

    return (
        <div className='w-[calc(90vw)] md:w-[calc(80vw)] bg-transparent flex justify-center items-center'>
            <motion.div initial={{ y: '-100vh' }} animate={{ y: 0 }} exit={{ y: '-130vh' }} className='w-[calc(85vw)] md:w-[calc(35vw)] h-auto text-custom-yellow bg-custom-maroon border-t border-custom-yellow border-b mt-5 py-8 z-50' >
                <div className='flex justify-between items-center'>
                    <h1 className='text-2xl md:text-3xl font-semibold text-center my-2 pl-3 md:pl-8'>{title}</h1>
                    <div className='pr-8'>
                        <button onClick={onClose} className='px-2 md:px-3 py-1 rounded-sm bg-custom-yellow-dark active:scale-95 text-custom-ivory'>X</button>
                        <img src="" alt="" className='hidden' />
                    </div>
                </div>

                <div className='my-3'>
                    <form class="max-w-md mx-auto px-6 md:p-0 text-white" onSubmit={submitHandler}>
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="name" onChange={(e) => setName(e.target.value)} name="name" id="name" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-maroon-500 focus:outline-none focus:ring-0 focus:border-maroon-600 peer" placeholder=" " required />
                            <label for="name" class="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-maroon-600 peer-focus:dark:text-maroon-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                        </div>
                        <div class={`grid ${title === 'Astrology Consultancy' ? 'md:grid-cols-3' : 'md:grid-cols-2'} place-items-center md:gap-6`}>
                            <div class="relative z-0 w-full mb-5 group">
                                <input type="date" name="date" onChange={(e) => setDate(e.target.value)} min={title === 'Astrology Consultancy' ? '' : today} id="date" class="block py-2.5 px-0 w-full text-sm text-white-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-maroon-500 focus:outline-none focus:ring-0 focus:border-maroon-600 peer" placeholder=" " required />
                                <label for="date" class="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-maroon-600 peer-focus:dark:text-maroon-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{title === 'Astrology Consultancy' ? 'D.O.B' : 'Date'}</label>
                            </div>
                            {
                                title === "Astrology Consultancy" && <>
                                    <div class="relative z-0 w-full mb-5 group">
                                        <input type="text" name="astroAmount" className='hidden' value={astroAmount} />
                                        <input type="time" onChange={(e) => setTime(e.target.value)} name="time" id="time" class="block py-2.5 px-0 w-full text-sm text-white-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-maroon-500 focus:outline-none focus:ring-0 focus:border-maroon-600 peer" placeholder=" " required />
                                        <label for="time" class="peer-focus:font-medium absolute text-sm text-w dark:text-w duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-maroon-600 peer-focus:dark:text-maroon-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Time</label>
                                    </div>

                                    <div class="relative z-0 w-full mb-5 group">
                                        <input type="date" name="date" onChange={(e) => setAppDate(e.target.value)} min={today} id="date" class="block py-2.5 px-0 w-full text-sm text-white-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-maroon-500 focus:outline-none focus:ring-0 focus:border-maroon-600 peer" placeholder=" " required />
                                        <label for="date" class="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-maroon-600 peer-focus:dark:text-maroon-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Appointment Date</label>
                                    </div>

                                </>
                            }

                            {
                                title === "Shraddha" &&
                                <div class="relative z-0 w-full mb-5 group">
                                    <input type="time" onChange={(e) => setTime(e.target.value)} name="time" id="time" class="block py-2.5 px-0 w-full text-sm text-white-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-maroon-500 focus:outline-none focus:ring-0 focus:border-maroon-600 peer" placeholder=" " required />
                                    <label for="time" class="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-maroon-600 peer-focus:dark:text-maroon-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Time</label>
                                </div>
                            }

                            {title === 'Shraddha' &&
                                <select name='shraddha' className='md:mb-5 py-1 bg-custom-maroon text-white' onChange={(e) => setShraddhaType(e.target.value)} value={shraddhaType}>
                                    <option value="">Select Shraddha Pooja</option>
                                    <option value="Yearly Shraddha">Yearly Shraddha</option>
                                    <option value="Quaterly Shraddha">Quaterly Shraddha</option>
                                    <option value="Monthly Shraddha">Monthly Shraddha</option>
                                </select>
                            }
                            {
                                title === 'Yoga' &&
                                <div class="relative z-0 w-full mb-5 group">
                                    <input type="number" value={yogaAmount} className='hidden' />
                                    <input type="text" onChange={(e) => setNationality(e.target.value)} name="nationality" id="nationality" class="block py-2.5 px-0 w-full text-sm text-white-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-maroon-500 focus:outline-none focus:ring-0 focus:border-maroon-600 peer" placeholder=" " required />
                                    <label for="nationality" class="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-maroon-600 peer-focus:dark:text-maroon-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nationality</label>
                                </div>
                            }
                            {
                                title === 'Pooja Services' &&
                                <div class="relative z-0 w-full mb-5 group">
                                    <input type="number" value={poojaAmount} className='hidden' />
                                    <input type="text" onChange={(e) => setReason(e.target.value)} name="reason" id="reason" class="block py-2.5 px-0 w-full text-sm text-white-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-maroon-500 focus:outline-none focus:ring-0 focus:border-maroon-600 peer" placeholder=" " required />
                                    <label for="reason" class="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-maroon-600 peer-focus:dark:text-maroon-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Reason for Pooja</label>
                                </div>
                            }
                            {
                                title === 'Corporate Consultancy' &&
                                <div class="relative z-0 w-full mb-5 group">
                                    <input type="number" value={vastuAmount} className='hidden' />
                                    <input type="text" onChange={(e) => setOrganization(e.target.value)} name="organisation" id="organisation" class="block py-2.5 px-0 w-full text-sm text-white-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-maroon-500 focus:outline-none focus:ring-0 focus:border-maroon-600 peer" placeholder=" " required />
                                    <label for="organisation" class="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-maroon-600 peer-focus:dark:text-maroon-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Organisation</label>
                                </div>
                            }

                        </div>
                        {
                            title === 'Yoga' &&
                            <div>
                                <label htmlFor="gender" className='text-white'>Gender</label>
                            </div>
                        }
                        {title === 'Astrology Consultancy' &&
                            <div>
                                <label htmlFor="gender" className='text-white'>Gender</label>
                            </div>
                        }

                        <div class="grid gap-3 md:gap-3">
                            <div class="relative z-10 w-full mb-5 flex gap-3 md:gap-6">
                                {
                                    title === "Yoga" && <>
                                        <div className='flex items-center gap-1 justify-center text-white'>
                                            <div>
                                                <label htmlFor="Male">Male</label>
                                            </div>
                                            <input type="radio" value='Male' name='gender' onChange={(e) => setGender(e.target.value)} />
                                        </div>
                                        <div className='flex items-center gap-1 justify-center text-white'>
                                            <div>
                                                <label htmlFor="Female">Female</label>
                                            </div>
                                            <input type="radio" value='Female' name='gender' onChange={(e) => setGender(e.target.value)} />
                                        </div>
                                        <div className='flex items-center gap-1 justify-center text-white'>
                                            <div>
                                                <label htmlFor="Other">Other</label>
                                            </div>
                                            <input type="radio" value='Other' name='gender' onChange={(e) => setGender(e.target.value)} />
                                        </div>
                                    </>
                                }
                                {
                                    title === 'Astrology Consultancy' && <div className='grid md:grid-cols-2 place-items-center gap-4 md:gap-16'>
                                        <div className='flex gap-1'>
                                            <div className='flex items-center gap-1 justify-center text-white'>
                                                <div>
                                                    <label htmlFor="Male">Male</label>
                                                </div>
                                                <input type="radio" value='Male' name='gender' onChange={(e) => setGender(e.target.value)} />
                                            </div>
                                            <div className='flex items-center gap-1 justify-center text-white'>
                                                <div>
                                                    <label htmlFor="Female">Female</label>
                                                </div>
                                                <input type="radio" value='Female' name='gender' onChange={(e) => setGender(e.target.value)} />
                                            </div>
                                            <div className='flex items-center gap-1 justify-center text-white'>
                                                <div>
                                                    <label htmlFor="Other">Other</label>
                                                </div>
                                                <input type="radio" value='Other' name='gender' onChange={(e) => setGender(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="relative mb-5 group">
                                            <input type="text" onChange={(e) => setPlace(e.target.value)} name="place" id="place" class="block py-2.5 px-0 w-full text-sm text-white-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-maroon-500 focus:outline-none focus:ring-0 focus:border-maroon-600 peer" placeholder=" " required />
                                            <label for="place" class="peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-maroon-600 peer-focus:dark:text-maroon-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Place</label>
                                        </div>
                                    </div>
                                }
                                {title === 'Pooja Services' && <select name='pooja' className='py-1 bg-custom-maroon text-white' onChange={(e) => {setPoojaType(e.target.value)}} value={poojaType}>
                                    <option value="">Select Vedic Pooja</option>
                                    <option value="Pooja For Growth">Pooja For Growth</option>
                                    <option value="Pooja for Overcoming Obstacles">Pooja for Overcoming Obstacles</option>
                                    <option value="Pooja for Reversing Negative Energies">Pooja for Reversing Negative Energies</option>
                                    <option value="Pooja for Mental Piece & Happiness">Pooja for Mental piece & Happiness</option>
                                    <option value="Yearly Pooja for overall well-being">Yearly Pooja for overall well-being</option>
                                </select>
                                }
                            </div>


                            {title === 'Yoga' &&
                                <select name='yoga' className='md:mb-5 py-1 bg-custom-maroon text-white' onChange={(e) => {setYogaType(e.target.value);}} value={yogaType}>
                                    <option value="">Select type of Yoga</option>
                                    <option value="shakti yoga">Shakti Yoga</option>
                                    <option value="astanga yoga">Astanga Yoga</option>
                                    <option value="kriya yoga">Kriya Yoga</option>
                                    <option value="hath yoga">Hath Yoga</option>
                                    <option value="basics of meditation">Basics of Meditation</option>
                                    <option value="every day meditation">Every day Meditation</option>
                                </select>
                            }


                        </div>



                        <div class="relative z-0 mb-5">


                            <div class="grid md:grid-cols-2 md:gap-6">
                                <div class="relative z-0 mb-5 flex flex-col md:flex-row gap-12">

                                    {
                                        title === 'Astrology Consultancy' &&
                                        <select name='consultancy' className='w-64 md:w-48 py-1 bg-custom-maroon text-white' onChange={(e) => {setAstrologyType(e.target.value)}} value={astrologyType}>
                                            <option value="">Astrology</option>
                                            <option value="New Horoscope">New Horoscope</option>
                                            <option value="Existing Horoscope analysis">Existing Horoscope analysis</option>
                                            <option value="Diesease Related Consultancy">Diesease Related Consultancy</option>
                                            <option value="Astrology for the underpriveledge">Astrology for the underpriveledge</option>
                                        </select>
                                    }
                                    {title === 'Astrology Consultancy' &&
                                        <select name='country' className='py-1 w-40 md:w-48 bg-custom-maroon text-white' onChange={(e) => setCountry(e.target.value)}>
                                            <option value="" default>Select Country</option>
                                            <option value="India">India</option>
                                            <option value="United States">United States</option>
                                            <option value="Afghanistan">Afghanistan</option>
                                            <option value="Albania">Albania</option>
                                            <option value="Algeria">Algeria</option>
                                            <option value="American Samoa">American Samoa</option>
                                            <option value="Andorra">Andorra</option>
                                            <option value="Angola">Angola</option>
                                            <option value="Anguilla">Anguilla</option>
                                            <option value="Antartica">Antarctica</option>
                                            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                            <option value="Argentina">Argentina</option>
                                            <option value="Armenia">Armenia</option>
                                            <option value="Aruba">Aruba</option>
                                            <option value="Australia">Australia</option>
                                            <option value="Austria">Austria</option>
                                            <option value="Azerbaijan">Azerbaijan</option>
                                            <option value="Bahamas">Bahamas</option>
                                            <option value="Bahrain">Bahrain</option>
                                            <option value="Bangladesh">Bangladesh</option>
                                            <option value="Barbados">Barbados</option>
                                            <option value="Belarus">Belarus</option>
                                            <option value="Belgium">Belgium</option>
                                            <option value="Belize">Belize</option>
                                            <option value="Benin">Benin</option>
                                            <option value="Bermuda">Bermuda</option>
                                            <option value="Bhutan">Bhutan</option>
                                            <option value="Bolivia">Bolivia</option>
                                            <option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
                                            <option value="Botswana">Botswana</option>
                                            <option value="Bouvet Island">Bouvet Island</option>
                                            <option value="Brazil">Brazil</option>
                                            <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                            <option value="Brunei Darussalam">Brunei Darussalam</option>
                                            <option value="Bulgaria">Bulgaria</option>
                                            <option value="Burkina Faso">Burkina Faso</option>
                                            <option value="Burundi">Burundi</option>
                                            <option value="Cambodia">Cambodia</option>
                                            <option value="Cameroon">Cameroon</option>
                                            <option value="Canada">Canada</option>
                                            <option value="Cape Verde">Cape Verde</option>
                                            <option value="Cayman Islands">Cayman Islands</option>
                                            <option value="Central African Republic">Central African Republic</option>
                                            <option value="Chad">Chad</option>
                                            <option value="Chile">Chile</option>
                                            <option value="China">China</option>
                                            <option value="Christmas Island">Christmas Island</option>
                                            <option value="Cocos Islands">Cocos (Keeling) Islands</option>
                                            <option value="Colombia">Colombia</option>
                                            <option value="Comoros">Comoros</option>
                                            <option value="Congo">Congo</option>
                                            <option value="Congo">Congo, the Democratic Republic of the</option>
                                            <option value="Cook Islands">Cook Islands</option>
                                            <option value="Costa Rica">Costa Rica</option>
                                            <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                                            <option value="Croatia">Croatia (Hrvatska)</option>
                                            <option value="Cuba">Cuba</option>
                                            <option value="Cyprus">Cyprus</option>
                                            <option value="Czech Republic">Czech Republic</option>
                                            <option value="Denmark">Denmark</option>
                                            <option value="Djibouti">Djibouti</option>
                                            <option value="Dominica">Dominica</option>
                                            <option value="Dominican Republic">Dominican Republic</option>
                                            <option value="East Timor">East Timor</option>
                                            <option value="Ecuador">Ecuador</option>
                                            <option value="Egypt">Egypt</option>
                                            <option value="El Salvador">El Salvador</option>
                                            <option value="Equatorial Guinea">Equatorial Guinea</option>
                                            <option value="Eritrea">Eritrea</option>
                                            <option value="Estonia">Estonia</option>
                                            <option value="Ethiopia">Ethiopia</option>
                                            <option value="Falkland Islands">Falkland Islands (Malvinas)</option>
                                            <option value="Faroe Islands">Faroe Islands</option>
                                            <option value="Fiji">Fiji</option>
                                            <option value="Finland">Finland</option>
                                            <option value="France">France</option>
                                            <option value="France Metropolitan">France, Metropolitan</option>
                                            <option value="French Guiana">French Guiana</option>
                                            <option value="French Polynesia">French Polynesia</option>
                                            <option value="French Southern Territories">French Southern Territories</option>
                                            <option value="Gabon">Gabon</option>
                                            <option value="Gambia">Gambia</option>
                                            <option value="Georgia">Georgia</option>
                                            <option value="Germany">Germany</option>
                                            <option value="Ghana">Ghana</option>
                                            <option value="Gibraltar">Gibraltar</option>
                                            <option value="Greece">Greece</option>
                                            <option value="Greenland">Greenland</option>
                                            <option value="Grenada">Grenada</option>
                                            <option value="Guadeloupe">Guadeloupe</option>
                                            <option value="Guam">Guam</option>
                                            <option value="Guatemala">Guatemala</option>
                                            <option value="Guinea">Guinea</option>
                                            <option value="Guinea-Bissau">Guinea-Bissau</option>
                                            <option value="Guyana">Guyana</option>
                                            <option value="Haiti">Haiti</option>
                                            <option value="Heard and McDonald Islands">Heard and Mc Donald Islands</option>
                                            <option value="Holy See">Holy See (Vatican City State)</option>
                                            <option value="Honduras">Honduras</option>
                                            <option value="Hong Kong">Hong Kong</option>
                                            <option value="Hungary">Hungary</option>
                                            <option value="Iceland">Iceland</option>
                                            <option value="Indonesia">Indonesia</option>
                                            <option value="Iran">Iran (Islamic Republic of)</option>
                                            <option value="Iraq">Iraq</option>
                                            <option value="Ireland">Ireland</option>
                                            <option value="Israel">Israel</option>
                                            <option value="Italy">Italy</option>
                                            <option value="Jamaica">Jamaica</option>
                                            <option value="Japan">Japan</option>
                                            <option value="Jordan">Jordan</option>
                                            <option value="Kazakhstan">Kazakhstan</option>
                                            <option value="Kenya">Kenya</option>
                                            <option value="Kiribati">Kiribati</option>
                                            <option value="Democratic People's Republic of Korea">Korea, Democratic People's Republic of</option>
                                            <option value="Korea">Korea, Republic of</option>
                                            <option value="Kuwait">Kuwait</option>
                                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                                            <option value="Lao">Lao People's Democratic Republic</option>
                                            <option value="Latvia">Latvia</option>
                                            <option value="Lebanon">Lebanon</option>
                                            <option value="Lesotho">Lesotho</option>
                                            <option value="Liberia">Liberia</option>
                                            <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                            <option value="Liechtenstein">Liechtenstein</option>
                                            <option value="Lithuania">Lithuania</option>
                                            <option value="Luxembourg">Luxembourg</option>
                                            <option value="Macau">Macau</option>
                                            <option value="Macedonia">Macedonia, The Former Yugoslav Republic of</option>
                                            <option value="Madagascar">Madagascar</option>
                                            <option value="Malawi">Malawi</option>
                                            <option value="Malaysia">Malaysia</option>
                                            <option value="Maldives">Maldives</option>
                                            <option value="Mali">Mali</option>
                                            <option value="Malta">Malta</option>
                                            <option value="Marshall Islands">Marshall Islands</option>
                                            <option value="Martinique">Martinique</option>
                                            <option value="Mauritania">Mauritania</option>
                                            <option value="Mauritius">Mauritius</option>
                                            <option value="Mayotte">Mayotte</option>
                                            <option value="Mexico">Mexico</option>
                                            <option value="Micronesia">Micronesia, Federated States of</option>
                                            <option value="Moldova">Moldova, Republic of</option>
                                            <option value="Monaco">Monaco</option>
                                            <option value="Mongolia">Mongolia</option>
                                            <option value="Montserrat">Montserrat</option>
                                            <option value="Morocco">Morocco</option>
                                            <option value="Mozambique">Mozambique</option>
                                            <option value="Myanmar">Myanmar</option>
                                            <option value="Namibia">Namibia</option>
                                            <option value="Nauru">Nauru</option>
                                            <option value="Nepal">Nepal</option>
                                            <option value="Netherlands">Netherlands</option>
                                            <option value="Netherlands Antilles">Netherlands Antilles</option>
                                            <option value="New Caledonia">New Caledonia</option>
                                            <option value="New Zealand">New Zealand</option>
                                            <option value="Nicaragua">Nicaragua</option>
                                            <option value="Niger">Niger</option>
                                            <option value="Nigeria">Nigeria</option>
                                            <option value="Niue">Niue</option>
                                            <option value="Norfolk Island">Norfolk Island</option>
                                            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                            <option value="Norway">Norway</option>
                                            <option value="Oman">Oman</option>
                                            <option value="Pakistan">Pakistan</option>
                                            <option value="Palau">Palau</option>
                                            <option value="Panama">Panama</option>
                                            <option value="Papua New Guinea">Papua New Guinea</option>
                                            <option value="Paraguay">Paraguay</option>
                                            <option value="Peru">Peru</option>
                                            <option value="Philippines">Philippines</option>
                                            <option value="Pitcairn">Pitcairn</option>
                                            <option value="Poland">Poland</option>
                                            <option value="Portugal">Portugal</option>
                                            <option value="Puerto Rico">Puerto Rico</option>
                                            <option value="Qatar">Qatar</option>
                                            <option value="Reunion">Reunion</option>
                                            <option value="Romania">Romania</option>
                                            <option value="Russia">Russian Federation</option>
                                            <option value="Rwanda">Rwanda</option>
                                            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                            <option value="Saint Lucia">Saint LUCIA</option>
                                            <option value="Saint Vincent">Saint Vincent and the Grenadines</option>
                                            <option value="Samoa">Samoa</option>
                                            <option value="San Marino">San Marino</option>
                                            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                            <option value="Saudi Arabia">Saudi Arabia</option>
                                            <option value="Senegal">Senegal</option>
                                            <option value="Seychelles">Seychelles</option>
                                            <option value="Sierra">Sierra Leone</option>
                                            <option value="Singapore">Singapore</option>
                                            <option value="Slovakia">Slovakia (Slovak Republic)</option>
                                            <option value="Slovenia">Slovenia</option>
                                            <option value="Solomon Islands">Solomon Islands</option>
                                            <option value="Somalia">Somalia</option>
                                            <option value="South Africa">South Africa</option>
                                            <option value="South Georgia">South Georgia and the South Sandwich Islands</option>
                                            <option value="Span">Spain</option>
                                            <option value="Sri Lanka">Sri Lanka</option>
                                            <option value="St. Helena">St. Helena</option>
                                            <option value="St. Pierre and Miguelon">St. Pierre and Miquelon</option>
                                            <option value="Sudan">Sudan</option>
                                            <option value="Suriname">Suriname</option>
                                            <option value="Svalbard">Svalbard and Jan Mayen Islands</option>
                                            <option value="Swaziland">Swaziland</option>
                                            <option value="Sweden">Sweden</option>
                                            <option value="Switzerland">Switzerland</option>
                                            <option value="Syria">Syrian Arab Republic</option>
                                            <option value="Taiwan">Taiwan, Province of China</option>
                                            <option value="Tajikistan">Tajikistan</option>
                                            <option value="Tanzania">Tanzania, United Republic of</option>
                                            <option value="Thailand">Thailand</option>
                                            <option value="Togo">Togo</option>
                                            <option value="Tokelau">Tokelau</option>
                                            <option value="Tonga">Tonga</option>
                                            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                            <option value="Tunisia">Tunisia</option>
                                            <option value="Turkey">Turkey</option>
                                            <option value="Turkmenistan">Turkmenistan</option>
                                            <option value="Turks and Caicos">Turks and Caicos Islands</option>
                                            <option value="Tuvalu">Tuvalu</option>
                                            <option value="Uganda">Uganda</option>
                                            <option value="Ukraine">Ukraine</option>
                                            <option value="United Arab Emirates">United Arab Emirates</option>
                                            <option value="United Kingdom">United Kingdom</option>
                                            <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                            <option value="Uruguay">Uruguay</option>
                                            <option value="Uzbekistan">Uzbekistan</option>
                                            <option value="Vanuatu">Vanuatu</option>
                                            <option value="Venezuela">Venezuela</option>
                                            <option value="Vietnam">Viet Nam</option>
                                            <option value="Virgin Islands (British)">Virgin Islands (British)</option>
                                            <option value="Virgin Islands (U.S)">Virgin Islands (U.S.)</option>
                                            <option value="Wallis and Futana Islands">Wallis and Futuna Islands</option>
                                            <option value="Western Sahara">Western Sahara</option>
                                            <option value="Yemen">Yemen</option>
                                            <option value="Serbia">Serbia</option>
                                            <option value="Zambia">Zambia</option>
                                            <option value="Zimbabwe">Zimbabwe</option>
                                        </select>
                                    }

                                    {
                                        title === 'Corporate Consultancy' &&
                                        <select name='consultancy' className='py-1 bg-custom-maroon text-white w-48' onChange={(e) => {setVastuType(e.target.value)}} value={vastuType}>
                                            <option value="">Select Consultancy</option>
                                            <option value="Vastu Modifications">Vastu Modifications</option>
                                            <option value="New Home Vastu">New Home Vastu</option>
                                            <option value="Turn Key projects">Turn Key Projects</option>
                                        </select>
                                    }

                                    {title === 'Corporate Consultancy' &&
                                        <select name='country' className='py-1 bg-custom-maroon text-white w-40' onChange={(e) => setCountry(e.target.value)}>
                                            <option value="" default>Select Country</option>
                                            <option value="India">India</option>
                                            <option value="United States">United States</option>
                                            <option value="Afghanistan">Afghanistan</option>
                                            <option value="Albania">Albania</option>
                                            <option value="Algeria">Algeria</option>
                                            <option value="American Samoa">American Samoa</option>
                                            <option value="Andorra">Andorra</option>
                                            <option value="Angola">Angola</option>
                                            <option value="Anguilla">Anguilla</option>
                                            <option value="Antartica">Antarctica</option>
                                            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                            <option value="Argentina">Argentina</option>
                                            <option value="Armenia">Armenia</option>
                                            <option value="Aruba">Aruba</option>
                                            <option value="Australia">Australia</option>
                                            <option value="Austria">Austria</option>
                                            <option value="Azerbaijan">Azerbaijan</option>
                                            <option value="Bahamas">Bahamas</option>
                                            <option value="Bahrain">Bahrain</option>
                                            <option value="Bangladesh">Bangladesh</option>
                                            <option value="Barbados">Barbados</option>
                                            <option value="Belarus">Belarus</option>
                                            <option value="Belgium">Belgium</option>
                                            <option value="Belize">Belize</option>
                                            <option value="Benin">Benin</option>
                                            <option value="Bermuda">Bermuda</option>
                                            <option value="Bhutan">Bhutan</option>
                                            <option value="Bolivia">Bolivia</option>
                                            <option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
                                            <option value="Botswana">Botswana</option>
                                            <option value="Bouvet Island">Bouvet Island</option>
                                            <option value="Brazil">Brazil</option>
                                            <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                            <option value="Brunei Darussalam">Brunei Darussalam</option>
                                            <option value="Bulgaria">Bulgaria</option>
                                            <option value="Burkina Faso">Burkina Faso</option>
                                            <option value="Burundi">Burundi</option>
                                            <option value="Cambodia">Cambodia</option>
                                            <option value="Cameroon">Cameroon</option>
                                            <option value="Canada">Canada</option>
                                            <option value="Cape Verde">Cape Verde</option>
                                            <option value="Cayman Islands">Cayman Islands</option>
                                            <option value="Central African Republic">Central African Republic</option>
                                            <option value="Chad">Chad</option>
                                            <option value="Chile">Chile</option>
                                            <option value="China">China</option>
                                            <option value="Christmas Island">Christmas Island</option>
                                            <option value="Cocos Islands">Cocos (Keeling) Islands</option>
                                            <option value="Colombia">Colombia</option>
                                            <option value="Comoros">Comoros</option>
                                            <option value="Congo">Congo</option>
                                            <option value="Congo">Congo, the Democratic Republic of the</option>
                                            <option value="Cook Islands">Cook Islands</option>
                                            <option value="Costa Rica">Costa Rica</option>
                                            <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                                            <option value="Croatia">Croatia (Hrvatska)</option>
                                            <option value="Cuba">Cuba</option>
                                            <option value="Cyprus">Cyprus</option>
                                            <option value="Czech Republic">Czech Republic</option>
                                            <option value="Denmark">Denmark</option>
                                            <option value="Djibouti">Djibouti</option>
                                            <option value="Dominica">Dominica</option>
                                            <option value="Dominican Republic">Dominican Republic</option>
                                            <option value="East Timor">East Timor</option>
                                            <option value="Ecuador">Ecuador</option>
                                            <option value="Egypt">Egypt</option>
                                            <option value="El Salvador">El Salvador</option>
                                            <option value="Equatorial Guinea">Equatorial Guinea</option>
                                            <option value="Eritrea">Eritrea</option>
                                            <option value="Estonia">Estonia</option>
                                            <option value="Ethiopia">Ethiopia</option>
                                            <option value="Falkland Islands">Falkland Islands (Malvinas)</option>
                                            <option value="Faroe Islands">Faroe Islands</option>
                                            <option value="Fiji">Fiji</option>
                                            <option value="Finland">Finland</option>
                                            <option value="France">France</option>
                                            <option value="France Metropolitan">France, Metropolitan</option>
                                            <option value="French Guiana">French Guiana</option>
                                            <option value="French Polynesia">French Polynesia</option>
                                            <option value="French Southern Territories">French Southern Territories</option>
                                            <option value="Gabon">Gabon</option>
                                            <option value="Gambia">Gambia</option>
                                            <option value="Georgia">Georgia</option>
                                            <option value="Germany">Germany</option>
                                            <option value="Ghana">Ghana</option>
                                            <option value="Gibraltar">Gibraltar</option>
                                            <option value="Greece">Greece</option>
                                            <option value="Greenland">Greenland</option>
                                            <option value="Grenada">Grenada</option>
                                            <option value="Guadeloupe">Guadeloupe</option>
                                            <option value="Guam">Guam</option>
                                            <option value="Guatemala">Guatemala</option>
                                            <option value="Guinea">Guinea</option>
                                            <option value="Guinea-Bissau">Guinea-Bissau</option>
                                            <option value="Guyana">Guyana</option>
                                            <option value="Haiti">Haiti</option>
                                            <option value="Heard and McDonald Islands">Heard and Mc Donald Islands</option>
                                            <option value="Holy See">Holy See (Vatican City State)</option>
                                            <option value="Honduras">Honduras</option>
                                            <option value="Hong Kong">Hong Kong</option>
                                            <option value="Hungary">Hungary</option>
                                            <option value="Iceland">Iceland</option>
                                            <option value="Indonesia">Indonesia</option>
                                            <option value="Iran">Iran (Islamic Republic of)</option>
                                            <option value="Iraq">Iraq</option>
                                            <option value="Ireland">Ireland</option>
                                            <option value="Israel">Israel</option>
                                            <option value="Italy">Italy</option>
                                            <option value="Jamaica">Jamaica</option>
                                            <option value="Japan">Japan</option>
                                            <option value="Jordan">Jordan</option>
                                            <option value="Kazakhstan">Kazakhstan</option>
                                            <option value="Kenya">Kenya</option>
                                            <option value="Kiribati">Kiribati</option>
                                            <option value="Democratic People's Republic of Korea">Korea, Democratic People's Republic of</option>
                                            <option value="Korea">Korea, Republic of</option>
                                            <option value="Kuwait">Kuwait</option>
                                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                                            <option value="Lao">Lao People's Democratic Republic</option>
                                            <option value="Latvia">Latvia</option>
                                            <option value="Lebanon">Lebanon</option>
                                            <option value="Lesotho">Lesotho</option>
                                            <option value="Liberia">Liberia</option>
                                            <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                            <option value="Liechtenstein">Liechtenstein</option>
                                            <option value="Lithuania">Lithuania</option>
                                            <option value="Luxembourg">Luxembourg</option>
                                            <option value="Macau">Macau</option>
                                            <option value="Macedonia">Macedonia, The Former Yugoslav Republic of</option>
                                            <option value="Madagascar">Madagascar</option>
                                            <option value="Malawi">Malawi</option>
                                            <option value="Malaysia">Malaysia</option>
                                            <option value="Maldives">Maldives</option>
                                            <option value="Mali">Mali</option>
                                            <option value="Malta">Malta</option>
                                            <option value="Marshall Islands">Marshall Islands</option>
                                            <option value="Martinique">Martinique</option>
                                            <option value="Mauritania">Mauritania</option>
                                            <option value="Mauritius">Mauritius</option>
                                            <option value="Mayotte">Mayotte</option>
                                            <option value="Mexico">Mexico</option>
                                            <option value="Micronesia">Micronesia, Federated States of</option>
                                            <option value="Moldova">Moldova, Republic of</option>
                                            <option value="Monaco">Monaco</option>
                                            <option value="Mongolia">Mongolia</option>
                                            <option value="Montserrat">Montserrat</option>
                                            <option value="Morocco">Morocco</option>
                                            <option value="Mozambique">Mozambique</option>
                                            <option value="Myanmar">Myanmar</option>
                                            <option value="Namibia">Namibia</option>
                                            <option value="Nauru">Nauru</option>
                                            <option value="Nepal">Nepal</option>
                                            <option value="Netherlands">Netherlands</option>
                                            <option value="Netherlands Antilles">Netherlands Antilles</option>
                                            <option value="New Caledonia">New Caledonia</option>
                                            <option value="New Zealand">New Zealand</option>
                                            <option value="Nicaragua">Nicaragua</option>
                                            <option value="Niger">Niger</option>
                                            <option value="Nigeria">Nigeria</option>
                                            <option value="Niue">Niue</option>
                                            <option value="Norfolk Island">Norfolk Island</option>
                                            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                            <option value="Norway">Norway</option>
                                            <option value="Oman">Oman</option>
                                            <option value="Pakistan">Pakistan</option>
                                            <option value="Palau">Palau</option>
                                            <option value="Panama">Panama</option>
                                            <option value="Papua New Guinea">Papua New Guinea</option>
                                            <option value="Paraguay">Paraguay</option>
                                            <option value="Peru">Peru</option>
                                            <option value="Philippines">Philippines</option>
                                            <option value="Pitcairn">Pitcairn</option>
                                            <option value="Poland">Poland</option>
                                            <option value="Portugal">Portugal</option>
                                            <option value="Puerto Rico">Puerto Rico</option>
                                            <option value="Qatar">Qatar</option>
                                            <option value="Reunion">Reunion</option>
                                            <option value="Romania">Romania</option>
                                            <option value="Russia">Russian Federation</option>
                                            <option value="Rwanda">Rwanda</option>
                                            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                            <option value="Saint Lucia">Saint LUCIA</option>
                                            <option value="Saint Vincent">Saint Vincent and the Grenadines</option>
                                            <option value="Samoa">Samoa</option>
                                            <option value="San Marino">San Marino</option>
                                            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                            <option value="Saudi Arabia">Saudi Arabia</option>
                                            <option value="Senegal">Senegal</option>
                                            <option value="Seychelles">Seychelles</option>
                                            <option value="Sierra">Sierra Leone</option>
                                            <option value="Singapore">Singapore</option>
                                            <option value="Slovakia">Slovakia (Slovak Republic)</option>
                                            <option value="Slovenia">Slovenia</option>
                                            <option value="Solomon Islands">Solomon Islands</option>
                                            <option value="Somalia">Somalia</option>
                                            <option value="South Africa">South Africa</option>
                                            <option value="South Georgia">South Georgia and the South Sandwich Islands</option>
                                            <option value="Span">Spain</option>
                                            <option value="Sri Lanka">Sri Lanka</option>
                                            <option value="St. Helena">St. Helena</option>
                                            <option value="St. Pierre and Miguelon">St. Pierre and Miquelon</option>
                                            <option value="Sudan">Sudan</option>
                                            <option value="Suriname">Suriname</option>
                                            <option value="Svalbard">Svalbard and Jan Mayen Islands</option>
                                            <option value="Swaziland">Swaziland</option>
                                            <option value="Sweden">Sweden</option>
                                            <option value="Switzerland">Switzerland</option>
                                            <option value="Syria">Syrian Arab Republic</option>
                                            <option value="Taiwan">Taiwan, Province of China</option>
                                            <option value="Tajikistan">Tajikistan</option>
                                            <option value="Tanzania">Tanzania, United Republic of</option>
                                            <option value="Thailand">Thailand</option>
                                            <option value="Togo">Togo</option>
                                            <option value="Tokelau">Tokelau</option>
                                            <option value="Tonga">Tonga</option>
                                            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                            <option value="Tunisia">Tunisia</option>
                                            <option value="Turkey">Turkey</option>
                                            <option value="Turkmenistan">Turkmenistan</option>
                                            <option value="Turks and Caicos">Turks and Caicos Islands</option>
                                            <option value="Tuvalu">Tuvalu</option>
                                            <option value="Uganda">Uganda</option>
                                            <option value="Ukraine">Ukraine</option>
                                            <option value="United Arab Emirates">United Arab Emirates</option>
                                            <option value="United Kingdom">United Kingdom</option>
                                            <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                            <option value="Uruguay">Uruguay</option>
                                            <option value="Uzbekistan">Uzbekistan</option>
                                            <option value="Vanuatu">Vanuatu</option>
                                            <option value="Venezuela">Venezuela</option>
                                            <option value="Vietnam">Viet Nam</option>
                                            <option value="Virgin Islands (British)">Virgin Islands (British)</option>
                                            <option value="Virgin Islands (U.S)">Virgin Islands (U.S.)</option>
                                            <option value="Wallis and Futana Islands">Wallis and Futuna Islands</option>
                                            <option value="Western Sahara">Western Sahara</option>
                                            <option value="Yemen">Yemen</option>
                                            <option value="Serbia">Serbia</option>
                                            <option value="Zambia">Zambia</option>
                                            <option value="Zimbabwe">Zimbabwe</option>
                                        </select>
                                    }
                                </div>
                            </div>

                        </div>


                        <button type="submit" class="text-white bg-custom-yellow hover:bg-black focus:ring-4 focus:outline-none focus:ring-maroon-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-custom-yellow dark:hover:bg-custom-yellow-dark ">Submit</button>
                    </form>

                </div>
            </motion.div>
        </div>

    )
}

export default FormModal
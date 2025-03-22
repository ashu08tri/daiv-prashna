import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Container from '../components/Container';
import logo from '../assets/images/logo_bottom.png';

function PrivacyPolicy() {
    const location = useLocation();
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);
    return (
        <Container>
            <div className='flex min-h-screen justify-center'>
                <div className='w-[calc(90vw)] bg-custom-ivory pb-4'>
                    <div className='h-80 border-b'>
                        <img src={logo} alt='logo' className='h-96 w-full' />
                    </div>
                    <h1 className='text-center py-4 text-3xl md:text-4xl text-custom-maroon font-semibold'>Privacy Policy</h1>
                    <p className='p-6 text-xl text-custom-yellow break-normal'>
                        This Privacy Policy applies to information collected by Daiv-Prashna through Daiv-Prashna Website (hereinafter referred to as "Organization").

                        Our Organization is a not-for-profit, volunteer-run organization that offers tools for the physical, mental and inner wellbeing of human beings across the world. Everything that we do is guided by these values, including the ways in which we collect, protect and use data. As a part of effectively offering these tools to Users, Daiv-Prashna obtains some of the User's data.

                        Our Organization is committed to ensuring the security and protection of the personal data provided by the Users of our website, and to providing a compliant and consistent approach to data protection. We will only process your personal data in accordance with applicable data protection and privacy laws. The protection afforded by this Policy applies to all Users, irrespective of their nationality, or place of residence, in relation to the processing and profiling of their personal data. It includes the processing of personal data by automated means, as well as manual processing.
                    </p>
                    <p className='p-6 text-xl text-custom-yellow break-normal'>This Privacy Policy will explain what personal data we collect when you use our website and how our Organization uses and stores your personal data. </p>

                    <p className='p-6 text-xl text-custom-yellow break-normal'>The Privacy Policy describes the following:</p>

                    <ol className='pl-10 text-custom-yellow break-normal list-decimal'>
                        <li>What data do we collect?</li>
                        <li>How do we collect your data?</li>
                        <li>How will we use your data?</li>
                        <li>How do we store your data?</li>
                        <li>Marketing</li>
                        <li>What are your data protection rights?</li>
                        <li>International Transfers</li>
                        <li>What are cookies?</li>
                        <li>How do we use cookies?</li>
                        <li>What types of cookies do we use?</li>
                        <li>How to manage your cookies</li>
                        <li>Privacy Policies of other websites</li>
                        <li>Changes to our privacy policy</li>
                        <li>How to contact us</li>
                    </ol>

                    <p className='p-6 text-xl text-custom-yellow'>Section 1: What data do we collect?</p>

                    <ul className='pl-10 text-custom-yellow break-normal list-disc'>
                        <li>Email ID;</li>
                        <li>Name;</li>
                        <li>Country;</li>
                        <li>DOB;</li>
                    </ul>

                    <p className='p-6 text-xl text-custom-yellow'>Section 2: How do we collect your data?</p>
                    <p className='pl-6 pt-4 text-xl text-custom-yellow'>You directly provide our Organization with most of the data we collect. We collect data and process data every time you:</p>
                    <ul className='pl-10 text-custom-yellow break-normal list-disc'>
                        <li>Complete online forms and sign up for any particular program/offering/event that we offer;</li>
                        <li>Contact us offline, for example by telephone, fax, SMS, email or post.</li>
                        <li>Provide us your data through physical media like registration form, donation form, application form, etc.;</li>
                        <li>Use or view our website (via your browser's cookies);</li>
                        <li>Contribute to any of our projects;</li>
                        <li>Choose to support Daiv-Prashna initiatives as a volunteer or donor.</li>
                    </ul>

                    <p className='p-6 text-xl text-custom-yellow'>Section 3: How will we use your data?</p>
                    <p className='pl-6 pt-4 text-xl text-custom-yellow'>Our Organization collects your data so that we can:</p>
                    <ul className='pl-10 text-custom-yellow break-normal list-disc'>
                        <li>Provide you with information regarding programs, events and sadhana support, etc., that you have requested and/ or signed up for;</li>
                        <li>Manage our relationship with you (for example, support activities);</li>
                        <li>Establish contact with you through phone calls, WhatsApp messages, email and other social media platforms that you have consented to, to provide support regarding programs, practices and processes that you have registered for.</li>
                        <li>Monitor, measure, improve and protect our content, website, and services and provide an enhanced and personalized user experience for you;</li>
                        <li>Respond to your queries and resolve complaints;</li>
                        <li>Provide any of your information that we are required to submit in order to comply with our regulatory or legal obligations;</li>
                        <li>Detect, prevent, investigate or provide remedy for criminal, illegal or prohibited activities;</li>
                        <li>Undertake internal testing of our website, systems and services to test and improve their security and performance.  In these circumstances, we would anonymize any information used for such testing purposes;</li>
                        <li>Deliver joint content and services with third parties with whom you have a separate relationship (for example, social media platforms); </li>
                        <li>Provide you with information regarding our various initiatives or updates on project progress; </li>
                        <li>Process your donations and to provide you with the receipt; </li>
                    </ul>

                    <p className='p-6 text-xl text-custom-yellow'>Section 4: How do we store your data?</p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>Our Organization uses various technological and procedural security measures to ensure the security, integrity and privacy of the personal information that we collect. We also have implemented reasonable security measures in an effort to protect against the loss, misuse and alteration of the information under our control. Personal information collected by our Organization is stored in secure operating environments that are not available to the public. </p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>Once we obtain your data, we will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy. Unfortunately, however, no data transmission over the Internet can be guaranteed to be 100% secure. As a result, while we strive to protect your User Information, we cannot guarantee its security. You use the Services and provide us with information at your own initiative and risk. If you have reason to believe that your interaction with us is no longer secure (for example, if you feel that the security of any account you have with us has been compromised), please immediately notify us of the problem by contacting us as specified in Section 6 below.</p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>Our Organization will only retain your personal data following your application for a period of time depending on the category of data and the purposes for which we hold it.  We will only retain your data after this time if we are required to do so to comply with the applicable laws of India.</p>

                    <p className='p-6 text-xl text-custom-yellow'>Section 5: Marketing:</p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>Our Organization does not sell any data to third parties for marketing or any other purpose.</p>

                    <p className='p-6 text-xl text-custom-yellow'>Section 6: What are your data protection rights?</p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>Our Organization would like to make sure you are fully aware of all your data protection rights.  Every user is entitled to the following: </p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>The right to access: You have the right to request our Organization for copies of your personal data. </p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>The right to rectification: You have the right to request that our Organization correct any information you believe is inaccurate.  You also have the right to request our Organization to complete information you believe is incomplete. </p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>The right to remove: You have the right to request our Organization erase/remove your personal data, under certain reasonable conditions. To delete your profile, please email appointment@daiv-prashna.in .</p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>The right to restrict processing: You have the right to request that our Organization restrict the processing of your personal data, under certain reasonable conditions.</p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>The right to object to processing: You have the right to object to our Organization's processing of your personal data, under certain reasonable conditions.</p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>The right to data portability: You have the right to request that our Organization transfer the data that we have collected to another organization, or directly to you, under certain reasonable conditions.</p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>Our Organization makes use of third-party services as well as offers services related to storage of user data, user authentication, user consent and user profile management.</p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>If you would like to exercise any of these rights, please contact us at our email: appointment@daiv-prashna.in .</p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>If you make a request, we have one month to respond to you.</p>

                    <p className='p-6 text-xl text-custom-yellow'>Section 7: International Transfers:</p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>As we operate globally, data we collect may be transferred to, stored and processed in any country where one or more entities associated with Isha Foundation are based or have facilities in. While other countries or territories may not have the same standards of protection as those in your home country, we will continue to protect personal data that we transfer in line with this privacy policy.</p>

                    <p className='p-6 text-xl text-custom-yellow'>Section 8: What are cookies?</p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>Cookies are text files placed on your computer to collect standard internet log information and visitor behavior information.  When you visit our websites, we may collect information from you automatically through cookies or similar technology. </p>

                    <p className='p-6 text-xl text-custom-yellow'>Section 9: How do we use cookies?</p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>Our Organization uses cookies in a range of ways to improve your experience on our website including:</p>
                    <ul className='pl-10 text-custom-yellow break-normal list-disc'>
                        <li>Keeping you signed in;</li>
                        <li>Understanding how you use our website;</li>
                        <li>If you have created a user profile and also consented to the use of cookies, we may link information relating to your browsing patterns (on our website) with your user profile.</li>
                    </ul>

                    <p className='p-6 text-xl text-custom-yellow'>Section 10: What types of cookies do we use?</p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>There are a number of different types of cookies, however, our website uses:</p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>Functionality: Our Organization uses these cookies so that we recognize you on our website and remember your previously selected preferences.  These could include what language you prefer and location you are in.  </p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>Promotion: Our Organization uses these cookies to collect information about your visit to our website, the content you viewed, the links you followed and information about your browser, device and your IP address.</p>

                    <p className='p-6 text-xl text-custom-yellow'>Section 11: How to manage cookies:</p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>You can set your browser to not accept cookies, and opt to remove cookies from your browser. As a result however, in a few cases, some of our website features may not function. </p>

                    <p className='p-6 text-xl text-custom-yellow'>Section 12: Privacy Policies of other websites:</p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>Our Organization’s website contains links to other websites.  Our privacy policy applies only to our website. So, if you click on a link to another website, you should read their privacy policy.</p>

                    <p className='p-6 text-xl text-custom-yellow'>Section 13: Changes to our privacy policy:</p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>Our Organization regularly reviews and makes updates to its privacy policy. This web page reflects the most up-to-date version of the privacy policy. By continuing to use our website, you agree to the terms of the amended Privacy Policy.</p>

                    <p className='p-6 text-xl text-custom-yellow'>Section 14: How to contact us:</p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>If you have any questions about our Organization's privacy policy or the data we have of yours, or if you would like to exercise one of your data protections rights, please do not hesitate to contact us. </p>
                    <p className='px-6 pb-2 text-xl text-custom-yellow'>Email us at: <span className='underline'>appointment@daiv-prashna.in</span></p>

                    <div id='term' className=''>
                        <h1 className='text-center py-4 text-3xl md:text-4xl text-custom-maroon font-semibold'>Terms & Conditions</h1>
                        <p className='p-6 text-xl text-custom-yellow'>Cancellation and Refund Policy for Yoga Programs:</p>
                        <ul className='pl-10 text-custom-yellow break-normal list-disc'>
                            <li>80% refund up-to 3 days before the start date of class. No refunds thereafter. Please contact the in charge of the program within the time window to request for a refund. Certain programs do not allow a refund. See below</li>
                            <li>Refunds made for offline payments like cash will be made only through NEFT. Please allow upto 4 weeks for refund processing</li>
                            <li>No refunds will be made after program start.</li>
                        </ul>

                        <p className='p-6 text-xl text-custom-yellow'>Re-Registration Policy for Yoga Programs:</p>
                        <ul className='pl-10 text-custom-yellow break-normal list-disc'>
                            <li>It may be possible to re-register for the same program at a later date if you are unable to attend the program you are registering for. A 15% re-registration fee is applicable.</li>
                            <li>You can register for the same class/program within 6 months of the originally registered program start date. If the program fee has increased, you will have to pay the difference in fee in addition to the re-registration fee.</li>
                            <li>Re-registration will also not be applicable if the program is not scheduled in the six month period</li>
                        </ul>

                        <p className='p-6 text-xl text-custom-yellow'>REFUND, CANCELLATION, RESCHEDULE & TRANSFER POLICY:</p>
                        <p className='p-6 text-xl text-custom-yellow'>Refund Policy:</p>
                        <ul className='pl-10 text-custom-yellow break-normal list-disc'>
                            <li>Participants who have registered for the Program can apply for a refund only if they have NOT ACCESSED the course and within 30 days from the date of registration and payment. After 30 days from the date of registration and payment, and/or once you start the Inner Engineering Program, there is NO REFUND.</li>
                            <li>If a refund request is received before starting the Inner Engineering Program, and within 30 days from the date of registration and payment, 90% of the program fee will be refunded. In case of any discount applicable on the Program fees, 90% of the discounted fee shall be refunded. You will be able to avail the discount only when the same is announced by Us.</li>
                            <li>The request for refund should come from your registered email id by raising a request for the same on support.ishafoundation.org</li>
                            <li>Participants who have registered for the Program by using a gift coupon are not eligible for a refund.</li>
                        </ul>

                        <p className='p-6 text-xl text-custom-yellow'>Reschedule Policy:</p>
                        <ul className='pl-10 text-custom-yellow break-normal list-disc'>
                            <li>Participants will have either a total of 3 chances to reschedule selected service, or 1 year from the date of registration to complete the program, whichever comes first.</li>
                            <li>Once you reactivate your account by paying a 50% program fee, you will again have 1 year from the date of reactivation or 3 reschedule chances (whichever comes first) to complete the program.</li>
                            <li>You will start the program from the step you were on once the account is reactivated.</li>
                        </ul>

                        <p className='p-6 text-xl text-custom-yellow'>Transfer Policy:</p>
                        <ul className='pl-10 text-custom-yellow break-normal list-disc'>
                            <li>You can transfer to any of the following Daiv-Prashna Service happening at the time, subject to availability of the seats. You shall pay a transfer fee equivalent to 15% of the program fee (15% fee of the Program you are transferring to) and you shall also pay the difference in program fees, if any:
                                <ul className='pl-10 text-custom-yellow break-normal list-disc'>
                                    <li>Astrology</li>
                                    <li>Yoga</li>
                                    <li>Vastu</li>
                                </ul>
                            </li>
                            <li>For all transfers, the program is to be taken within one year from the date of original registration.</li>
                            <li>You can transfer only once.</li>
                            <li>The registration is non transferable to another person.</li>
                            <li>Participants who have registered for the Program using a gift coupon are not eligible for Transfer to another person or any other program.</li>
                            <li>We reserve the right to revise the terms and conditions of this Agreement at any time and at our sole discretion.</li>
                        </ul>

                        <p className='p-6 text-xl text-custom-yellow'>Refund policy for online donations:</p>
                        <ul className='pl-10 text-custom-yellow break-normal list-disc'>
                            <li>Donations and Subscriptions made online will not be refunded under any circumstances whatsoever.</li>
                        </ul>

                        <p className='p-6 text-xl text-custom-yellow'>Refund and Cancellation Policy for Daiv-Prashna Services:</p>
                        <ul className='pl-10 text-custom-yellow break-normal list-disc'>
                            <li>Please note that there will be no refund under any circumstances.</li>
                        </ul>

                        <p className='p-6 text-xl text-custom-yellow'>Cancellation, Refund & Re-Registration Policy for Astrology, Yoga, Vastu, Vedic Pooja:</p>
                        <ul className='pl-10 text-custom-yellow break-normal list-disc'>
                            <li>You are eligible for an 80% refund of the program fee up to 3 days before the start date of the program you registered for. There will be no refund thereafter.</li>
                        </ul>

                        <p className='p-6 text-xl text-custom-yellow'>Email: <a href="mailto:appointment@daiv-prashna.in">appointment@daiv-prashna.in</a></p>

                    </div>
                </div>



            </div>
        </Container>
    )
}

export default PrivacyPolicy
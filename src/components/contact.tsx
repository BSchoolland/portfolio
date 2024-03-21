import React, { useEffect } from "react";
import Image from "next/image";

const ContactSection = () => {
    const contactRef = React.createRef<HTMLDivElement>();
    // if the user scrolls below the contact section, scroll back up to the contact section
    // prevent horizontal scrolling
    // useEffect(() => {
    //     // get how far down the contact section is
    //     const contactSection = contactRef.current;
    //     if (!contactSection) {
    //         return;
    //     }
    //     const contactSectionTop = contactSection.getBoundingClientRect().top;
    //     // get the height of the contact section
    //     const contactSectionHeight = contactSection.getBoundingClientRect().height;
        
    //     const bottomOfPage = contactSectionTop + contactSectionHeight;

    //     window.addEventListener('scroll', function() {
    //         if (window.scrollY + window.innerHeight > bottomOfPage) {
    //             window.scrollTo(0, bottomOfPage - window.innerHeight);
    //         }
    //     })
    // });
    return (
        <section className='contact-section' ref={contactRef}>
            <h1 className="contact-title">Contact Me!</h1>
            <div className='contact-container'>
                <form className="contact-form">
                    <input type="text" id="name" name="name" placeholder="Your Name" className='form-name' required/>
                    <input type="email" id="email" name="email" placeholder="Your Email Address" className="form-email" required/>
                    <textarea id="message" name="message" placeholder="Message" className="form-message"
                     required></textarea>
                    <button type="submit" className="form-submit">Send Message</button>
                </form>
            </div>
        </section>
  );
};

export default ContactSection;

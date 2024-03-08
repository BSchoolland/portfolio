import React from "react";
import Image from "next/image";

const ContactSection = () => {
  
    return (
        <section className='contact-section'>
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

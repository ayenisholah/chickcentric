/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import whatsapp from "../assets/whatsapp.svg";
import twitter from "../assets/twitter.svg";
import mail from "../assets/mail.svg";
import facebook from "../assets/facebook.svg";
import instagram from "../assets/instagram.svg";

function Footer() {
  return (
    <section className="contact" id="footer">
      <ul className="social-links">
        <li>
          <a
            href="https://web.facebook.com/thechickcentric"
            rel="noreferrer"
            target="_blank"
          >
            <img src={facebook} alt="facebook" />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/thechickcentric/"
            rel="noreferrer"
            target="_blank"
          >
            <img src={instagram} alt="instagram" />
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/thechickcentric"
            rel="noreferrer"
            target="_blank"
          >
            <img src={twitter} alt="twitter" />
          </a>
        </li>
        <li>
          <a
            href="https://api.whatsapp.com/send?phone=2348174884034&text=I%20want%20to%20find%20out%20about%20your%20products"
            rel="noreferrer"
            target="_blank"
          >
            <img src={whatsapp} alt="Whatsapp" />
          </a>
        </li>

        <li>
          <a
            href="mailto:amina@thechickcentric.com"
            rel="noreferrer"
            target="_blank"
          >
            <img src={mail} alt="email" />
          </a>
        </li>
      </ul>

      <div className="contact-details">
        <h3>Contact</h3>
        <p>08174884034</p>
        <p>Shop A21 Yahaya Abdullahi Plaza, Mararaba,</p>
        <p>Abuja</p>
      </div>
      <p className="cw">
        Copyright © {new Date().getFullYear()} The Chick Centric. All rights
        reserved.
      </p>
    </section>
  );
}

export default Footer;

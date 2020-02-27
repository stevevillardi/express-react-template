import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
import EmailIcon from "@material-ui/icons/Email";
import "./style.css";

function Footer() {
    return (
        <footer className="font-small fixed-bottom footer-main">
            <div className="text-center py-3 text-white">
                © 2020 Copyright:
                <a href="https://mailmover.com/" className="ml-2 text-white">
                    MailMover.com
                </a>
                <br></br>
                <a
                    href="https://github.com/stevevillardi/"
                    className="footer-links">
                    <GitHubIcon fontSize="large" />
                </a>
                <a
                    href="https://www.linkedin.com/in/stevevillardi/"
                    className="footer-links">
                    <LinkedInIcon fontSize="large" />
                </a>
                <a
                    href="https://www.facebook.com/PurpleParrots"
                    className="footer-links">
                    <FacebookIcon fontSize="large" />
                </a>
                <a href="mailto:steve@villardi.io" className="footer-links">
                    <EmailIcon fontSize="large" />
                </a>
            </div>
        </footer>
    );
}

export default Footer;

import { Link } from 'react-router-dom';
import footerImg from '../../assets/footerImg.png';
import ButtonUI from './UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faXTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer
      className="bg-primary-400 text-white py-16 bg-contain bg-repeat"
      style={{ backgroundImage: `url(${footerImg})` }}
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Column 1 - Brand & Email Input */}
        <div className="lg:col-span-2">
          <h1 className="logo-bold text-4xl">Level Up</h1>
          <p className="text-lg mt-2 max-w-lg">
            Empowering learners and educators with smart, flexible, and accessible online education.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-4">
            <input className="w-full border-2 bg-transparent rounded-md text-white px-3 py-2" type="text" placeholder="Your Email Here" />
            <ButtonUI className="border-2 px-8 rounded-md">Join</ButtonUI>
          </div>
          <p className="mt-2 text-sm max-w-md">
            By subscribing, you consent to our Privacy Policy and agree to receive updates.
          </p>
        </div>

        {/* Column 2 - Resources */}
        <div>
          <h5 className="text-2xl mb-2">Resources</h5>
          <ul className="space-y-2">
            <li><Link to="#" className="hover:text-primary-100">Help Center</Link></li>
            <li><Link to="#" className="hover:text-primary-100">Blog</Link></li>
            <li><Link to="#" className="hover:text-primary-100">Support</Link></li>
            <li><Link to="#" className="hover:text-primary-100">Contact Us</Link></li>
            <li><Link to="#" className="hover:text-primary-100">FAQs</Link></li>
          </ul>
        </div>

        {/* Column 3 - Company Info */}
        <div>
          <h5 className="text-2xl mb-2">Company Info</h5>
          <ul className="space-y-2">
            <li><Link to="#" className="hover:text-primary-100">About Us</Link></li>
            <li><Link to="#" className="hover:text-primary-100">Careers</Link></li>
            <li><Link to="#" className="hover:text-primary-100">Press Releases</Link></li>
            <li><Link to="#" className="hover:text-primary-100">Partnerships</Link></li>
            <li><Link to="#" className="hover:text-primary-100">Investors</Link></li>
          </ul>
        </div>

        {/* Column 4 - Social Icons */}
        <div className="lg:col-span-1">
          <h5 className="text-2xl mb-2">Connect With Us</h5>
          <ul className="space-y-2">
            <li><Link to="#" className="flex items-center gap-2 hover:text-primary-100"><FontAwesomeIcon icon={faFacebook} /> Facebook</Link></li>
            <li><Link to="#" className="flex items-center gap-2 hover:text-primary-100"><FontAwesomeIcon icon={faInstagram} /> Instagram</Link></li>
            <li><Link to="#" className="flex items-center gap-2 hover:text-primary-100"><FontAwesomeIcon icon={faXTwitter} /> Twitter</Link></li>
            <li><Link to="#" className="flex items-center gap-2 hover:text-primary-100"><FontAwesomeIcon icon={faLinkedin} /> LinkedIn</Link></li>
            <li><Link to="#" className="flex items-center gap-2 hover:text-primary-100"><FontAwesomeIcon icon={faYoutube} /> YouTube</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

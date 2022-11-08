import React from 'react';
import './index.css';
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

const SiteHeader = () => {
  return (
    <footer>
      <div className="footer-limiter">
        <div className="footer-right">
          <Link href="#" underline="none">
            <FacebookIcon />
          </Link>
          <Link href="#" underline="none">
            <TwitterIcon />
          </Link>
          <Link href="#" underline="none">
            <InstagramIcon />
          </Link>
          <Link href="#" underline="none">
            <GitHubIcon />
          </Link>
        </div>

        <div className="footer-left">
          <p className="footer-links">iMovie - Find you like</p>
          <p>Copyright Zihan © 2022</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteHeader;

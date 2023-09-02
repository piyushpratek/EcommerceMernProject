import "./aboutSection.css";
import { Typography, Button, Avatar } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const About = () => {
  const visitInstagram = () => {
    window.location.href = "https://www.instagram.com/piyush_prateek/";
  };

  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://media.licdn.com/dms/image/D4D03AQGclMJX89t4LA/profile-displayphoto-shrink_400_400/0/1685178151162?e=1698883200&v=beta&t=2R227Uk9CA0b4_JSs1IIiIwwtsC6dgTzbMVZRNpyvKA"
              alt="Founder"
            />
            <Typography>Piyush Prateek</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @PiyushPrateek. Only with the
              purpose to learn MERN Stack
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.linkedin.com/in/piyush-prateek-9a922912b/"
              target="blank"
            >
              <LinkedInIcon className="linkedinSvgIcon" />
            </a>

            <a href="https://www.instagram.com/piyush_prateek/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

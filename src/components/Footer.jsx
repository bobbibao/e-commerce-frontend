import React from "react";
import { useSelector } from "react-redux";
import { FaSquareXTwitter, FaSquareFacebook, FaSquareInstagram, FaSquareYoutube } from "react-icons/fa6";
import { Grid, Typography } from "@material-ui/core";

const Footer = () => {
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  return (
    <footer className="footer-center p-10 bg-base-200 text-base-content rounded mt-10 max-md:px-0">
            <Grid container spacing={4}>
        <Grid item xs={12} md={6} style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'left',
        }}>
          <Typography variant="h6" component="div" gutterBottom>
            Office Vietnam
          </Typography>
          <Typography variant="body1" component="div">
            Address: 123 Van Kiep, Ward 3, Binh Thanh District, Ho Chi Minh City
          </Typography>
          <Typography variant="body1" component="div">
            Phone: +84 373 498 729
          </Typography>
          <Typography variant="body1" component="div">
            Email: lehoangbao5678@gmail.com
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} style={{ 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
         }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
            <FaSquareXTwitter className="text-4xl text-accent-content" />
            <FaSquareFacebook className="text-4xl text-accent-content" />
            <FaSquareInstagram className="text-4xl text-accent-content" />
            <FaSquareYoutube className="text-4xl text-accent-content" />
          </div>
          <Typography variant="body2" component="div" style={{ marginTop: '8px' }}>
            Idea from Kuzma Clothing & Shoes, <br />
            implemented by BobbiBao © 2024
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;

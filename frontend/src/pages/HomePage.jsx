import { Typography } from "@mui/material";

const HomePage = () => {
  return (
    <>
      <div className="home-div">
        <img src="../src/assets/home-page.png" width={550} alt="Animals" />
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Welcome to Veterinary Management System!
        </Typography>
        <Typography variant="body1">
          Please go to the relevant section according to the service you want to
          do.
        </Typography>
      </div>
    </>
  );
};

export default HomePage;

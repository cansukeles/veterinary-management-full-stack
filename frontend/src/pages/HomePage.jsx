import { Typography } from "@mui/material";

const HomePage = () => {
  return (
    <>
      <div className="home-div">
        <img
          // src="https://drive.google.com/file/d/10SOkRR3Gk5rEeHpaC3zEy5xCNlruWrfs/view?usp=sharing"
          src="https://drive.google.com/thumbnail?id=10SOkRR3Gk5rEeHpaC3zEy5xCNlruWrfs"
          width={550}
          alt="Animals"
        />
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

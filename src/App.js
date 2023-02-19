import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HuskerForm from './HuskerForm';
import IntroForm from './IntroForm';
import FinalScreen from './FinalScreen'
// import Review from './Review';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://unldancemarathon.com/">
        UNL Dance Marathon
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Step 1', 'Step 2', 'Details'];

function getStepContent(activeStep, setActiveStep, isHuskerthon, setisHuskerthon, setUserName, setAmountRaised, setShirtSize, finalScreenStep, setFinalScreenStep, userName, amountRaised, shirtSize, dinnerGroup, setDinnerGroup ) {
  switch (activeStep) {
    case 0:
      console.log(activeStep)
      return <IntroForm activeStep={activeStep} setActiveStep={setActiveStep} setisHuskerthon={setisHuskerthon}/>;
    case 1:
      return <HuskerForm activeStep={activeStep} setActiveStep={setActiveStep} isHuskerthon={isHuskerthon} setUserName={setUserName} setAmountRaised={setAmountRaised} setShirtSize={setShirtSize} finalScreenStep={finalScreenStep} setFinalScreenStep={setFinalScreenStep}  dinnerGroup={dinnerGroup} setDinnerGroup={setDinnerGroup}/>;
    case 2:
      return <FinalScreen activeStep={activeStep} setActiveStep={setActiveStep} finalScreenStep={finalScreenStep} userName={userName} amountRaised={amountRaised} shirtSize={shirtSize} dinnerGroup={dinnerGroup} setDinnerGroup={setDinnerGroup}/>;
    default:
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isHuskerthon, setisHuskerthon] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [amountRaised, setAmountRaised] = React.useState(0);
  const [shirtSize, setShirtSize] = React.useState("");
  const [finalScreenStep, setFinalScreenStep] = React.useState(0);
  const [dinnerGroup, setDinnerGroup] = React.useState("");


  // const handleNext = () => {
  //   setActiveStep(activeStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep(activeStep - 1);
  // };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            UNL Dance Marathon
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            {"HuskerThon 2023 Check-In"}
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
          {
            getStepContent(activeStep, setActiveStep, isHuskerthon, setisHuskerthon, setUserName, setAmountRaised, setShirtSize, finalScreenStep, setFinalScreenStep, userName, amountRaised, shirtSize, dinnerGroup,setDinnerGroup)
          }
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
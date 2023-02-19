import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
const FinalScreen = ({activeStep, setActiveStep, finalScreenStep, userName, amountRaised, shirtSize, dinnerGroup}) => {
    return (
      <div>
      {finalScreenStep === 1?
        (
          <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Welcome {userName}, please see show this screen to a huskerthon representative to get your t-shirt and wrist band!

              </Typography>
              {/* <Typography variant="h5">
                You raised ${amountRaised}
              </Typography> */}
              <Typography variant="h5">
                ------------------------------------------------------------
              </Typography>
              <Typography variant="h5">
                Dinner Group: {dinnerGroup}
              </Typography>
              <Typography variant="h5">
                  Your shirt size is {shirtSize}.
              </Typography>
              <Typography variant="h5">
                ------------------------------------------------------------
              </Typography>
            </React.Fragment>):(<React.Fragment></React.Fragment>)
      }
       {finalScreenStep === 2?
        (<React.Fragment>
        <Typography variant="h6" gutterBottom mt={3}>
          You have successfully signed in. Please see a Huskerthon representative for directions on how to donate admissions fee on Donor Drive.
        </Typography>
        <Typography variant="h5">
                ------------------------------------------------------------
              </Typography>
      </React.Fragment>):(
        <React.Fragment>
      </React.Fragment>
      )
      }
       {finalScreenStep === 3?
        (<React.Fragment>
        <Typography variant="h6" gutterBottom mt={3}>
          Please see a Huskerthon representative. There was an error with your submission.
        </Typography>
      </React.Fragment>):(
        <React.Fragment>
      </React.Fragment>
      )
      }
      {finalScreenStep < 3?
        (<React.Fragment>
          <Button variant="contained" disableElevation  onClick={() => {
          window.location.reload(false);
        }}>
            Next Registrant
        </Button>
          </React.Fragment>):(
        <React.Fragment>
      </React.Fragment>
      )
      }
      </div>
    );
  }
  export default FinalScreen;

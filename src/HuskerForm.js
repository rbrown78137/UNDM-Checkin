import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Link from '@mui/material/Link';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';


function HuskerForm({activeStep, setActiveStep, isHuskerthon, setUserName, setAmountRaised, setShirtSize,finalScreenStep, setFinalScreenStep, dinnerGroup, setDinnerGroup}) {
  const [btnDisabled, setBtnDisabled] = React.useState(false)
  const [date, setDate] = React.useState();
  const [formValues, setFormValues] = React.useState({
    firstName:{
      value:'',
      error:false,
      errorMessage:'You must enter a first name'
    },
    lastName:{
      value:'',
      error:false,
      errorMessage:'You must enter a last name'
    },
    email:{
      value:'',
      error:false,
      errorMessage:'You must enter an email'
    },
    nuid:{
      value:'',
      error:false,
      errorMessage:'You must enter an email'
    },
    dancer:{
      value:false,
      error:false,
      errorMessage:'You must enter your liked tech stacks'
    },
    crime:{
      value:false,
      error:false,
      errorMessage:'You must choose your job title'
    },
    commitedCrime:{
      value:false
    },
    abuse:{
      value:false,
      error:false,
      errorMessage:'You must choose your job title'
    },
    youth:{
      value:false,
      error:false,
      errorMessage:'You must choose your job title'
    }
  })

  async function hitEndpoint() {
    console.log(`https://checkinbackendryanbrown.azurewebsites.net/checkinhuskerthon/${formValues.firstName.value}/${formValues.lastName.value}/${formValues.email.value}/${formValues.email.value}/${formValues.nuid.value}`)
    const response = await fetch(
      `https://checkinbackendryanbrown.azurewebsites.net/checkinhuskerthon/${formValues.firstName.value}/${formValues.lastName.value}/${formValues.email.value}/${formValues.email.value}/${formValues.nuid.value}`
    );
    const json = await response.json();
    setUserName(json.firstName + " " +json.lastName)
    setAmountRaised(json.totalRaised)
    setShirtSize(json.shirtSize)
    setDinnerGroup(json.dinnerGroup)
    console.log(json)
  }

  async function handleHuskerSubmit(){
    // console.log("hi")
    // if (formValues.firstName.value === '')
    const formFields = Object.keys(formValues);
    let newFormValues = {...formValues}

    let flag = false
    let crimeFlag = false
    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = formValues[currentField].value;

      newFormValues = {
        ...newFormValues,
        [currentField]:{
          ...newFormValues[currentField],
          error:false
        }
      }
    }


    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = formValues[currentField].value;
      if (index < 4){
        if(currentValue === ''){
          flag = true
          newFormValues = {
            ...newFormValues,
            [currentField]:{
              ...newFormValues[currentField],
              error:true
            }
          }
        }
      }
      else if (index === 5){
        if(currentValue === false){
          crimeFlag = true
        }
      }
      else if(index == 6){
        if(currentValue === true){
          crimeFlag = true
        }
      }
      else{
        if(currentValue === false){
          flag = true
          newFormValues = {
            ...newFormValues,
            [currentField]:{
              ...newFormValues[currentField],
              error:true
            }
          }
        }
      }

    }

    setFormValues(newFormValues)

    if (flag === false){
      if (crimeFlag === true){
        // alert("Please see someone at the desk")
        setFinalScreenStep(3)
      }
      else{
        if(isHuskerthon === true){
          setFinalScreenStep(1)
        }else{
          setFinalScreenStep(2)
        }
        setBtnDisabled(true)
        await hitEndpoint()
      }
      // // hit endpoint
      // hitEndpoint()
      setActiveStep(activeStep + 1)
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    console.log(e)
    setFormValues({
      ...formValues,
      [name]:{
        ...formValues[name],
        value
      }
    })
  }

  const handleCheck = (e) => {
    const {name, checked} = e.target;
    console.log(name)
    setFormValues({
      ...formValues,
      [name]:{
        ...formValues[name],
        value: checked
      }
    })
  }

  return (
    <React.Fragment>
        <Typography variant="h6" gutterBottom mt={3}>
            Personal Information
        </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={formValues.firstName.value}
            onChange={handleChange}
            error={formValues.firstName.error}
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={formValues.lastName.value}
            onChange={handleChange}
            error={formValues.lastName.error}
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            value={formValues.email.value}
            onChange={handleChange}
            error={formValues.email.error}
            id="email"
            name="email"
            label="Email"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            value={formValues.nuid.value}
            onChange={handleChange}
            error={formValues.nuid.error}
            id="nuid"
            name="nuid"
            label="NUID"
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
        <Typography variant="h6" my={3}>
            Dancer Release Wavier Question
        </Typography>
        <Typography variant="body1" gutterBottom>
            <strong>Releasor</strong> realizes that participation in the <strong>HuskerThon 2023</strong> involves certain risks and danger and is a vigorous activity involving severe respiratory and cardiovascular stress. <strong>Releasor</strong> has hereby been made aware that participation in <strong>HuskerThon 2023</strong> has the following non-exclusive list of certain risks which I accept: death; head, eye, neck, and spinal injury resulting in complete or partial paralysis; brain damage; heart attack; blisters; cuts; lacerations; abrasions; concussions; contusions; strains; sprains; dislocations; fractures; cold and heat injuries; water immersion; drowning; lightning strikes; injury to bones, joints, muscles, internal organs; and environmental conditions.
        </Typography>
        <Typography variant="body1" gutterBottom>
            In consideration of participation in <strong>HuskerThon 2023</strong> <strong>Releasor</strong> hereby <strong>RELEASES</strong> and covenants not-to-sue the <strong>UNIVERSITY</strong> for any and all present and future claims resulting from ordinary negligence on the part of the <strong>UNIVERSITY</strong> for property damage, personal injury, or wrongful death arising as a result of my engaging in, using <strong>University</strong> facilities and equipment, or receiving instruction for <strong>HuskerThon 2023</strong> or activities thereto, wherever, whenever, or however the same may occur. <strong>Releasor hereby voluntarily waives</strong> any and all claims or actions resulting from ordinary negligence, both present and future, that may be made by <strong>Releasor’s family, estate, personal representative, heirs, or assigns.</strong>
        </Typography>
        <FormControlLabel
            control={<Checkbox name="dancer" onChange={handleCheck} />}
            label={<Typography color={formValues.dancer.error ? "#ff0000" : "#000000"}>I accept the terms and conditions</Typography>}
        />

        <Typography variant="h6" gutterBottom my={3}>
            Crime Question
        </Typography>
        <Typography variant="h6" gutterBottom>
            Have you been convicted of any of the following crimes:
        </Typography>
        <FormGroup>
            <FormControlLabel control={<Checkbox />} name="commitedCrime" onChange={handleCheck} label="Felony assault, including domestic violence related incidents" />
            <FormControlLabel control={<Checkbox />} name="commitedCrime" onChange={handleCheck} label="Child abuse, molestation or other crime involving endangerment of a minor" />
            <FormControlLabel control={<Checkbox />} name="commitedCrime" onChange={handleCheck} label="Murder" />
            <FormControlLabel control={<Checkbox />} name="commitedCrime" onChange={handleCheck} label="Kidnapping" />
            <FormControlLabel control={<Checkbox />} name="commitedCrime" onChange={handleCheck} label="Misdemeanor assault" />
            <FormControlLabel control={<Checkbox />} name="commitedCrime" onChange={handleCheck} label="Drug distribution activity" />
            <FormControlLabel control={<Checkbox />} name="commitedCrime" onChange={handleCheck} label="Felony drug possession" />
            <FormControlLabel control={<Checkbox />} name="commitedCrime" onChange={handleCheck} label="Any other felony or crime involving moral turpitude" />
        </FormGroup>
        <FormControlLabel
            required
            control={<Checkbox color="primary" name="crime" onChange={handleCheck} />}
            label={<Typography><strong>I have not been convicted of any of these crimes</strong></Typography>}
        />

        <Typography variant="h6" gutterBottom my={3}>
            Child Abuse and Neglect Including Sexual Assault Reporting Requirements
        </Typography>
        <Typography variant="body1" gutterBottom>
            Nebraska statutes require any person (including you) who becomes aware of any child abuse or neglect, including sexual assault, to report such abuse, neglect, or assault to law enforcement or the Department of Health and Human Services. Law enforcement is likewise required to notify DHHS of any such incidents reported to them. Activity Workers are required to notify the University Police Department at 402-472-2222 immediately when these situations are suspected.
        </Typography>
        <Typography variant="body1" gutterBottom>
            This means that if you suspect any child abuse or neglect, including sexual assault: 1) you must report it, 2) you should give as much information about the circumstances as possible, 3) you are immune from any civil or criminal liability if you have reported the information in good faith, and 4) if you know of child abuse, neglect, or sexual assault but are not reporting it, you are breaking the law. 
        </Typography>
        <Typography variant="body1" gutterBottom>
            Reference: Nebraska Statutes 28-710; 28-711; 28-716; 28-717:
        </Typography>
        <FormControlLabel
            required
            control={<Checkbox color="primary" name="abuse" onChange={handleCheck} />}
            label={<Typography color={formValues.abuse.error ? "#ff0000" : "#000000"}>I understand & agree to follow the Child Abuse, Neglect, & Sexual Assault Reporting Requirements Above</Typography>}
        />

        <Typography variant="h6" gutterBottom my={3}>
            Youth Safety Guidelines
        </Typography>
        <Typography variant="body1" gutterBottom>
            I have read, understand, and agree to abide by the policies and requirements stated in the <Link rel="noopener noreferrer" color="inherit" href="https://drive.google.com/file/d/19eotJC0dj97569lBFOEAOvFPS0d1tE3u/view?usp=sharing" target="_blank">Youth Safety Guidelines</Link>:
        </Typography>
        <FormControlLabel
            required
            control={<Checkbox color="primary" name="youth" onChange={handleCheck} />}
            label={<Typography color={formValues.youth.error ? "#ff0000" : "#000000"}>Yes</Typography>}
        />

        <Box mt={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Date"
                    value={date}
                    onChange={(newValue) => {
                    setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
            variant="contained"
            disabled={btnDisabled}
            onClick={() => handleHuskerSubmit(isHuskerthon)}
            sx={{ mt: 3, ml: 1 }}
            text="Next"
            >
            Submit
            </Button>
        </Box>

    </React.Fragment>
  );
}

export default HuskerForm;
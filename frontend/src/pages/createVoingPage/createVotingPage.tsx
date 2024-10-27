import styles from "./createVotingPage.module.css";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function CreateVotingPage() {
  return (
    <div className={styles.createVotingPage}>
      <CreateProjectForm />
    </div>
  );
}

const CreateProjectForm = () => {
  return (
    <form className={styles.projectForm}>
      <h2>Create Voting</h2>
      <TextField
        id="outlined-basic"
        label="Project Name"
        variant="outlined"
        sx={{ width: "60%" }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker sx={{ width: "60%" }} />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker sx={{ width: "60%" }} />
      </LocalizationProvider>

      <TextField
        id="outlined-multiline-flexible"
        label="Project Description"
        multiline
        maxRows={4}
        sx={{ width: "60%" }}
      />

      <FormControl>
        <FormLabel
          id="demo-radio-buttons-group-label"
          sx={{ display: "flex", alignItems: "left", fontWeight: "bold" }}
        >
          Scale
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel value="1-5" control={<Radio />} label="1-5" />
          <FormControlLabel value="0-5" control={<Radio />} label="0-5" />
          <FormControlLabel value="0-10" control={<Radio />} label="0-10" />
        </RadioGroup>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        sx={{ width: "40%", height: "50px" }}
      >
        Confirm
      </Button>
    </form>
  );
};

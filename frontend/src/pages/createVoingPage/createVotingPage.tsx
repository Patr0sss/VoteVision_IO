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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";

interface Poll {
  title: string;
  description: string;
  scale: string;
  opensAt: string;
  expiresAt: string;
}

export default function CreateVotingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userRole") !== JSON.stringify("admin")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className={styles.createVotingPage}>
      <CreateProjectForm />
    </div>
  );
}

const CreateProjectForm = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [scale, setScale] = useState<string>("1-5");
  const [opensAt, setOpensAt] = useState<Dayjs | null>(dayjs());
  const [expiresAt, setExpiresAt] = useState<Dayjs | null>(dayjs());

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const pollData: Poll = {
      title,
      description,
      scale,
      opensAt: opensAt ? opensAt.toISOString() : "",
      expiresAt: expiresAt ? expiresAt.toISOString() : "",
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/polls",
        pollData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Poll created successfully:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error creating poll:", error);
    }
  };

  return (
    <form className={styles.projectForm} onSubmit={handleSubmit}>
      <h2>Create Voting</h2>
      <TextField
        id="outlined-basic"
        label="Project Name"
        variant="outlined"
        sx={{ width: "60%" }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Opens At"
          value={opensAt}
          onChange={(newValue) => setOpensAt(newValue)}
          sx={{ width: "60%" }}
        />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Expires At"
          value={expiresAt}
          onChange={(newValue) => setExpiresAt(newValue)}
          sx={{ width: "60%" }}
        />
      </LocalizationProvider>

      <TextField
        id="outlined-multiline-flexible"
        label="Project Description"
        multiline
        maxRows={4}
        sx={{ width: "60%" }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <FormControl>
        <FormLabel
          id="scale-label"
          sx={{ display: "flex", alignItems: "left", fontWeight: "bold" }}
        >
          Scale
        </FormLabel>
        <RadioGroup
          aria-labelledby="scale-label"
          value={scale}
          onChange={(e) => setScale(e.target.value)}
          name="scale-group"
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

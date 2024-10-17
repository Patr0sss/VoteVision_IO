import styles from "./navbar.module.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className={styles.navbar}>
      <h2 className={styles.brandname}>VoteVision</h2>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={() => navigate("/auth")}>
          Login
        </Button>
        <div className={styles.registerButton}>
          <Button variant="contained" onClick={() => navigate("/auth")}>
            Register
          </Button>
        </div>
      </Stack>
    </nav>
  );
}

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./authPage.module.css";
import { Button, Stack, TextField } from "@mui/material";
import BackArrow from "../../assets/backArrow";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type authModeType = "login" | "register";

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<authModeType>("login");

  useEffect(() => {
    if (
      localStorage.getItem("authMode") === "login" ||
      localStorage.getItem("authMode") === "register"
    ) {
      setAuthMode(localStorage.getItem("authMode") as authModeType);
    }

    if (localStorage.getItem("username")) {
      window.location.href = "/";
    }
  }, []);

  const mode = {
    login: <Login authMode={authMode} setAuthMode={setAuthMode} />,
    register: <Register authMode={authMode} setAuthMode={setAuthMode} />,
  };

  return (
    <div className={styles.authPage}>
      <ReturnArrow />
      {mode[authMode]}
    </div>
  );
}

const Login = ({
  authMode,
  setAuthMode,
}: {
  authMode: authModeType;
  setAuthMode: Dispatch<SetStateAction<authModeType>>;
}) => {
  const [user, setUser] = useState({ username: "", password: "" });

  const navigate = useNavigate();
  const loginUser = async () => {
    if (user.password.length > 1 && user.username !== "") {
      try {
        const res = await axios.get("http://127.0.0.1:3000/login", {
          params: {
            username: user.username,
          },
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (res.status === 200) {
          console.log(res.data);
          localStorage.setItem("username", JSON.stringify(res.data.username));
          localStorage.setItem("userID", JSON.stringify(res.data.id));
          localStorage.setItem("userEmail", JSON.stringify(res.data.email));
          localStorage.setItem("userRole", JSON.stringify(res.data.role));
          window.location.reload();
          navigate("/");
          window.location.href = "/";
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Invalid Form");
    }
  };
  return (
    <section className={styles.authBox}>
      <h2>VoteVision</h2>

      <Stack
        spacing={2}
        direction="column"
        sx={{ width: "100%", alignItems: "center" }}
      >
        <TextField
          sx={{ width: "50%" }}
          id="outlined-basic"
          label="Username"
          variant="outlined"
          onChange={(e) =>
            setUser((user) => ({
              ...user,
              username: e.target.value,
            }))
          }
        />
        <TextField
          sx={{ width: "50%" }}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) =>
            setUser((user) => ({
              ...user,
              password: e.target.value,
            }))
          }
        />
      </Stack>
      <form onSubmit={loginUser} style={{ width: "100%" }}>
        <Button
          type="submit"
          variant="contained"
          sx={{ fontWeight: "bold", width: "40%", padding: "10px" }}
        >
          Login
        </Button>
      </form>

      <ChangeAuthMode authMode={authMode} setAuthMode={setAuthMode} />
    </section>
  );
};

const Register = ({
  authMode,
  setAuthMode,
}: {
  authMode: authModeType;
  setAuthMode: Dispatch<SetStateAction<authModeType>>;
}) => {
  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  const registerUser = async () => {
    if (
      newUser.password === newUser.repeatPassword &&
      newUser.password.length > 1 &&
      newUser.email !== "" &&
      newUser.username !== ""
    ) {
      try {
        const res = await axios.post(
          "http://127.0.0.1:3000/users",
          {
            email: newUser.email,
            username: newUser.username,
            password: newUser.password,
            role: "user",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (res.status === 201) {
          setAuthMode("login");
          // localStorage.setItem("authMode", "login");
          // window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Invalid Form");
    }
  };

  return (
    <div className={styles.authBox}>
      <h2>VoteVision</h2>

      <Stack
        spacing={2}
        direction="column"
        sx={{ width: "100%", alignItems: "center" }}
      >
        <TextField
          sx={{ width: "50%" }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={(e) =>
            setNewUser((newUser) => ({
              ...newUser,
              email: e.target.value,
            }))
          }
        />
        <TextField
          sx={{ width: "50%" }}
          id="outlined-basic"
          label="Username"
          variant="outlined"
          onChange={(e) =>
            setNewUser((newUser) => ({
              ...newUser,
              username: e.target.value,
            }))
          }
        />
        <TextField
          sx={{ width: "50%" }}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) =>
            setNewUser((newUser) => ({
              ...newUser,
              password: e.target.value,
            }))
          }
        />
        <TextField
          sx={{ width: "50%" }}
          color={
            newUser.password === newUser.repeatPassword &&
            newUser.repeatPassword.length > 1
              ? "success"
              : "primary"
          }
          id="outlined-basic"
          label={
            newUser.password !== newUser.repeatPassword &&
            newUser.repeatPassword.length > 0
              ? "Passwords Don't Match"
              : "Repeat Password"
          }
          variant="outlined"
          type="password"
          error={
            newUser.password !== newUser.repeatPassword &&
            newUser.repeatPassword.length > 0
          }
          onChange={(e) =>
            setNewUser((newUser) => ({
              ...newUser,
              repeatPassword: e.target.value,
            }))
          }
        />
      </Stack>

      <Button
        variant="contained"
        sx={{
          fontWeight: "bold",
          width: "40%",
          padding: "10px",
          marginTop: "20px",
        }}
        onClick={() => registerUser()}
      >
        Register
      </Button>
      <ChangeAuthMode authMode={authMode} setAuthMode={setAuthMode} />
    </div>
  );
};

const ChangeAuthMode = ({
  authMode,
  setAuthMode,
}: {
  authMode: authModeType;
  setAuthMode: Dispatch<SetStateAction<authModeType>>;
}) => {
  const changeAuthMode = () => {
    if (authMode === "login") {
      setAuthMode("register");
    } else {
      setAuthMode("login");
    }
  };

  return (
    <h4
      onClick={() => changeAuthMode()}
      style={{ color: "#1976d2", cursor: "pointer" }}
    >
      {authMode === "login" ? "Create An Account" : "Login Into Your Account"}
    </h4>
  );
};

const ReturnArrow = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.backArrow} onClick={() => navigate("/")}>
      <BackArrow width="50px" />
    </div>
  );
};

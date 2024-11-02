import { Box, Drawer } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import styles from "./navbar.module.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Dispatch, SetStateAction, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import RaportGraph from "../lineGraph/raportGraph";
import RaportTable from "../raportTable/raportTable";
import { v4 as uuidv4 } from "uuid";

export default function Navbar({ user }: { user: string }) {
  const navigate = useNavigate();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <h2 className={styles.brandname}>VoteVision</h2>
      </Link>

      {!user ? (
        <Stack spacing={2} direction="row">
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/auth");
              localStorage.setItem("authMode", "login");
            }}
          >
            Login
          </Button>
          <div className={styles.registerButton}>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/auth");
                localStorage.setItem("authMode", "register");
              }}
            >
              Register
            </Button>
          </div>
        </Stack>
      ) : (
        <h3
          style={{ cursor: "pointer" }}
          onClick={() => setIsSideMenuOpen((prev) => !prev)}
        >
          {JSON.parse(user)}
        </h3>
      )}
      <SideBar open={isSideMenuOpen} setOpen={setIsSideMenuOpen} user={user} />
    </nav>
  );
}

const SideBar = ({
  open,
  setOpen,
  user,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: string;
}) => {
  const { toPDF, targetRef } = usePDF({ filename: `Raport_${uuidv4()}.pdf` });

  user = user.replace(/"/g, "");
  const DrawerList = (
    <Box
      sx={{
        width: 280,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        "& .MuiTreeItem-label": { fontWeight: "bold !important" },
      }}
      role="presentation"
    >
      <h3
        className={styles.usernameSide}
        style={{
          color: "#1976d2",
        }}
      >
        {user}
      </h3>

      <form
        onSubmit={() => {
          setOpen(false);
          localStorage.removeItem("username");
          localStorage.removeItem("userRole");
          localStorage.removeItem("userID");
          localStorage.removeItem("userEmail");
        }}
      >
        <Box
          sx={{
            minHeight: "85vh",
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            // "& .MuiTreeItem-label": { fontWeight: "bold" },
          }}
        >
          <SimpleTreeView
            className={styles.xD}
            sx={{
              minWidth: "280px",
              "& .MuiTreeItem-label": { fontWeight: "bold" },
            }}
          >
            <TreeItem
              itemId="grid"
              label="Projects"
              sx={{
                "& .MuiTreeItem-label": { fontWeight: "bold" },
              }}
            >
              <TreeItem itemId="grid-community" label="Rocket Launcher" />
              <TreeItem itemId="grid-pro" label="Edible Rocks" />
              <TreeItem
                itemId="grid-premium"
                label="Trip To The Sun At Night"
              />
            </TreeItem>
            <TreeItem
              itemId="pickers"
              label="Community"
              sx={{
                "& .MuiTreeItem-label": { fontWeight: "bold" },
              }}
            >
              <TreeItem itemId="pickers-community" label="Facebok" />
              <TreeItem itemId="pickers-pro" label="Instagram" />
            </TreeItem>
            <TreeItem
              itemId="votingData"
              label="Voting Data"
              sx={{
                "& .MuiTreeItem-label": { fontWeight: "bold" },
              }}
            >
              <TreeItem itemId="charts-community" label="Voting Charts" />
              <Link to="/createVoting">
                <TreeItem
                  itemId="Create Voting"
                  label="createVoting"
                  onClick={() => setOpen(false)}
                />
              </Link>

              <TreeItem
                itemId="generateRaport"
                label="Generate Raport"
                onClick={() => toPDF()}
              />
            </TreeItem>
            <TreeItem
              itemId="tree-view"
              label="Contact Info"
              sx={{
                "& .MuiTreeItem-label": { fontWeight: "bold" },
              }}
            >
              <TreeItem itemId="tree-view-community" label="+48 123 456 789" />
            </TreeItem>
          </SimpleTreeView>
        </Box>
        <Button
          variant="contained"
          type="submit"
          color="error"
          sx={{ width: "50%", marginLeft: "25%", marginBottom: "20px" }}
        >
          Logout
        </Button>
      </form>
    </Box>
  );
  return (
    <>
      <div className={styles.PDFsection} ref={targetRef}>
        <PDF_RaportContent />
      </div>
      <Drawer open={open} onClose={() => setOpen(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
};

const PDF_RaportContent = () => {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;
  return (
    <div>
      <h1 className={styles.raportHeader}>RAPORT {formattedDate}</h1>
      <RaportGraph />
      <RaportTable />
    </div>
  );
};

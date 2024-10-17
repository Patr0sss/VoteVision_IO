import { Button, Rating } from "@mui/material";
import styles from "./votingCard.module.css";
import { useState } from "react";

export default function VotingCard() {
  const [projectRating, setProjectRating] = useState<number | null>(0);
  return (
    <div className={styles.votingCard}>
      <div className={styles.cardImg}></div>
      <h3 className={styles.projectName}>VoteVision</h3>
      <h5>
        This is a short description of the project to show if the layout works
        properly
      </h5>
      <div className={styles.ratingConatiner}>
        <Rating
          name="simple-controlled"
          value={projectRating}
          onChange={(_, newRating) => {
            setProjectRating(newRating);
          }}
        />
      </div>

      <Button sx={{ fontWeight: "bold", width: "80%" }} variant="contained">
        Vote
      </Button>
    </div>
  );
}

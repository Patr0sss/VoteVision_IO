import { Button, Rating } from "@mui/material";
import styles from "./votingCard.module.css";
import { useState } from "react";
import axios from "axios";

interface VoteData {
  pollId: number;
  userId: number;
  voteValue: number;
}

export default function VotingCard({
  name = "Vote Vision",
  description = "This is a short description of the project to show if the layout works properly",
  id,
}: {
  name: string;
  description: string;
  id: number;
}) {
  const [projectRating, setProjectRating] = useState<number>(0);

  const userID = localStorage.getItem("userID");

  const submitVote = async () => {
    try {
      const voteData: VoteData = {
        pollId: id,
        userId: parseInt(userID as string),
        voteValue: projectRating,
      };

      const response = await axios.post(
        "http://127.0.0.1:3000/votes",
        voteData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        console.log("Głos został pomyślnie dodany.");
        localStorage.setItem(JSON.stringify(id), JSON.stringify(id));
        window.location.reload();
      }
    } catch (error) {
      console.error("Błąd przy dodawaniu głosu:", error);
    }
  };

  return (
    <>
      {localStorage.getItem(`${id}`) ? null : (
        <div className={styles.votingCard}>
          <div className={styles.cardImg}></div>
          <h3 className={styles.projectName}>{name}</h3>
          <h5>{description}</h5>
          <div className={styles.ratingContainer}>
            <Rating
              name="simple-controlled"
              value={projectRating}
              onChange={(_, newRating) => {
                setProjectRating(newRating as number);
              }}
            />
          </div>
          <Button
            sx={{ fontWeight: "bold", width: "80%", marginLeft: "10%" }}
            variant="contained"
            onClick={submitVote}
          >
            Vote
          </Button>
        </div>
      )}
    </>
  );
}

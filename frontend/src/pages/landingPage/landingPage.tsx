import { useEffect, useState } from "react";
import VotingCard from "../../components/votingCard/votingCard";
import styles from "./landingPage.module.css";
import axios from "axios";

interface Poll {
  id: number;
  title: string;
  description: string;
  scale: string;
  opensAt: string;
  expiresAt: string;
}

export default function LandingPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  useEffect(() => {
    if (!localStorage.getItem("username")) {
      window.location.href = "/auth";
    }
  }, []);
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/polls/active", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setPolls(response.data);
      } catch (err) {
        console.error("Error fetching polls:", err);
      }
    };

    fetchPolls();
  }, []);
  return (
    <div className={styles.landingPage}>
      <HeaderMessage />

      <div className={styles.votingSection}>
        {polls.map((poll) => (
          <VotingCard
            key={poll.id}
            description={poll.description}
            name={poll.title}
            id={poll.id}
          />
        ))}
      </div>
    </div>
  );
}

const HeaderMessage = () => {
  return (
    <section className={styles.headerMessage}>
      <h2> Welcome to VoteVision! </h2>
      <h4>
        Share your ideas and vote on the best projects. The top-voted concepts
        get the chance to come to life. Join us and help shape the future
        <h3>Your Vote Counts!</h3>
      </h4>
    </section>
  );
};

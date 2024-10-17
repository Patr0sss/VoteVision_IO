import VotingCard from "../../components/votingCard/votingCard";
import styles from "./landingPage.module.css";

export default function LandingPage() {
  const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <div className={styles.landingPage}>
      <HeaderMessage />
      <div className={styles.votingSection}>
        {test.map((_, index) => (
          <VotingCard key={index} />
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
        get the chance to come to life. Join us and help shape the future—your
        vote counts!
      </h4>
    </section>
  );
};

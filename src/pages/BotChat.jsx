import { useState } from "react";
import styles from "./BotChat.module.css";
import JSheader from "../components/JSheader";
import { useLocation } from "react-router-dom";

function BotChat() {
  const loccation = useLocation();
  const { job } = loccation.state || {};

  const [messages, setMessages] = useState([
    {
      text: "How do you prioritize and respond to security incidents in a high-pressure environment?",
      sender: "bot",
    },
    {
      text: "I prioritize incidents based on their severity and potential impact on the network. I use established protocols to quickly assess the situation, contain the threat, and implement corrective measures while maintaining clear communication with the team and stakeholders.",
      sender: "user",
    },
    {
      text: "Can you describe a time when you identified a critical vulnerability? How did you address it?",
      sender: "bot",
    },
    {
      text: "I once identified a critical vulnerability in our network that could have led to a data breach. I immediately reported it to the team, and we conducted a thorough risk assessment. I then helped implement a patch and strengthened our monitoring to prevent future occurrences.",
      sender: "user",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      const botMessage = { text: data.reply, sender: "bot" };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    }

    setInput("");
  };

  return (
    <div className={styles.componentContainer}>
      <JSheader />
      <div className={styles.JobInformation}>
        <h3>Job Interview</h3>
        <div className={styles.JobName}>
          <h4>{job.jobName}</h4>
          <p>{job.companyName}</p>
        </div>
        <div className={styles.titleDescription}>
          <p>Job Description</p>
          <p>{job.jobDescription}</p>
        </div>
        <div className={styles.titleDescription}>
          <p>Required Qualifications</p>
          <ul>
            {job.requiredQualifications.map((qualification, index) => (
              <li key={index}>{qualification}</li>
            ))}
          </ul>
        </div>
        <div className={styles.titleDescription}>
          <p>Location</p>
          <p>{job.location}</p>
        </div>
        <div className={styles.titleDescription}>
          <p>Employment Type</p>
          <p>{job.employmentType}</p>
        </div>
        <div className={styles.titleDescription}>
          <p>Work Hours</p>
          <p>{job.workHours}</p>
        </div>
        <div className={styles.titleDescription}>
          <p>Company Overview</p>
          <p>{job.companyOverview}</p>
        </div>
      </div>
      <div className={styles.chatbotContainer}>
        <div className={styles.chatHead}>
          <img src="/src/assets/images/Logo.png" alt="Logo"></img>
          <div>
            <h3>HR Bot</h3>
            <p>{job.companyName}</p>
          </div>
        </div>
        <div className={styles.chatWindow}>
          <div className={styles.welcome}>
            <div className={styles.welcomeText}>
              <img src="/src/assets/images/Logo.png" alt="Logo"></img>
              <h3>Welcome to HR Bot</h3>
            </div>
            <p>
              Get ready for a quick and efficient interview experience. HR Bot
              will guide you through the process, asking questions just like a
              human interviewer. Answer at your own pace, and let HR Bot handle
              the rest!
            </p>
          </div>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                message.sender === "bot" ? styles.bot : styles.user
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className={styles.inputBtnContainer}>
          <img src="/src/assets/images/UserProfile.png"></img>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className={styles.input}
          />
          <button onClick={handleSendMessage} className={styles.button}>
            <img
              src="/src/assets/images/Send2.png"
              className={styles.send}
            ></img>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BotChat;

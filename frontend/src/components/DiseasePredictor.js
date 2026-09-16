import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const DiseasePredictor = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const token = localStorage.getItem("token") || false;

  const handleSend = async () => {
    if (!input.trim()) return;

    // USER MESSAGE
    const userMsg = {
      type: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/v1/prescripto/predict",
        {
          text: input,
        },
        {
          headers: { token },
        }
      );

      const apiData = res.data.data;

      let botMsg = {};

      // CASE 1 -> NORMAL CHAT MESSAGE
      if (typeof apiData === "string") {
        botMsg = {
          type: "bot",
          messageType: "text",
          text: apiData,
        };
      }

      // CASE 2 -> PREDICTION RESPONSE
      else if (
        apiData &&
        apiData.type === "prediction" &&
        Array.isArray(apiData.results)
      ) {
        botMsg = {
          type: "bot",
          messageType: "prediction",
          results: apiData.results,
        };
      }

      // CASE 3 -> UNKNOWN RESPONSE
      else {
        botMsg = {
          type: "bot",
          messageType: "text",
          text: "Unexpected response from server",
        };
      }

      setMessages((prev) => [...prev, botMsg]);

    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          messageType: "text",
          text: "Something went wrong",
        },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  // AUTO SCROLL
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const getGradient = (value) => {
    if (value >= 80) return "linear-gradient(90deg, #16a34a, #4ade80)";
    if (value >= 50) return "linear-gradient(90deg, #f59e0b, #fcd34d)";
    return "linear-gradient(90deg, #dc2626, #f87171)";
  };

  const normalizeConfidence = (value) => {
    if (!value) return 0;

    // Case 1: already 0–1 probability
    if (value > 0 && value <= 1) {
      return value * 100;
    }

    // Case 2: already 0–10 scale
    if (value > 1 && value <= 10) {
      return (value / 10) * 100;
    }

    // Case 3: broken large values
    if (value > 10) {
      return Math.min(value / 1000, 100);
    }

    return 0;
  };

  return (
    <div className="wa-container">

      {/* HEADER */}
      <div className="wa-header">
        🤖 Your Own AI Symptom Checker
      </div>

      {/* CHAT AREA */}
      <div className="wa-chat">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`wa-message ${msg.type}`}
          >

            {/* USER MESSAGE */}
            {msg.type === "user" && (
              <div className="bubble user-bubble">
                {msg.text}
              </div>
            )}

            {/* BOT MESSAGE */}
            {msg.type === "bot" && (
              <div className="bubble bot-bubble">

                {/* TEXT RESPONSE */}
                {msg.messageType === "text" && (
                  <div>{msg.text}</div>
                )}

                {/* PREDICTION RESPONSE */}
                {msg.messageType === "prediction" && (() => {

                  // ONLY SHOW DISEASES >= 20%
                  const filteredResults = msg.results.filter(
                    (item) =>
                      normalizeConfidence(item.confidence) >= 20
                  );

                  return (
                    <div className="prediction-wrapper">

                      <div className="prediction-heading">
                        🩺 Possible Diseases that you may have:
                      </div>

                      {/* IF NO DISEASE ABOVE 20 */}
                      {filteredResults.length === 0 ? (

                        <div className="no-prediction-card">
                          No strong prediction found.
                          <br />
                          Please describe symptoms in more detail.
                        </div>

                      ) : (

                        filteredResults.map((item, i) => (

                          <div
                            key={i}
                            className="prediction-card"
                          >

                            {/* TOP */}
                            <div className="prediction-top">

                              <div className="disease-name">
                                {item.disease}
                              </div>

                              <div className="confidence-percent">
                                {Math.round(
                                  normalizeConfidence(item.confidence)
                                )}%
                              </div>

                            </div>

                            {/* PROGRESS BAR */}
                            <div className="progress-container">

                              <div
                                className="progress-bar"
                                style={{
                                  width: `${normalizeConfidence(
                                    item.confidence
                                  )}%`,
                                  background: getGradient(
                                    normalizeConfidence(item.confidence)
                                  )
                                }}
                              ></div>

                            </div>

                            {/* CONFIDENCE TEXT */}
                            {normalizeConfidence(item.confidence) >= 80
                              ? <span className="high">"High confidence"</span>
                              : normalizeConfidence(item.confidence) >= 50
                              ? <span className="moderate">"Moderate confidence"</span>
                              : <span className="low">"Low confidence"</span>}

                          </div>

                        ))
                      )}

                    </div>
                  );
                })()}

              </div>
            )}

          </div>
        ))}

        {/* LOADING */}
        {loading && (
          <div className="bubble bot-bubble typing">
            Typing...
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* INPUT */}
      <div className="wa-input">

        <input
          type="text"
          placeholder="Type your symptoms..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && handleSend()
          }
        />

        <button onClick={handleSend}>
          ➤
        </button>

      </div>

    </div>
  );
};

export default DiseasePredictor;
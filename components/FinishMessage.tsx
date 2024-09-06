import { useState } from "react";

interface FinishMessageProps {
  arrivalLeaving: "arrival" | "leaving";
}

export const FinishMessage: React.FC<FinishMessageProps> = ({
  arrivalLeaving,
}) => {
  const [name, setName] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleRegister = async () => {
    const data = {
      name: name,
      date: new Date().toISOString(), // 送信時刻
      "arrival-leaving": arrivalLeaving, // 引数から受け取った arrival or leaving
    };

    try {
      const response = await fetch("/api/post-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Success:", await response.json());
      } else {
        console.error("Error posting data");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unknown error occurred");
      }
    }
  };

  return (
    <>
      <div className="finish-message">
        <h1>完了！</h1>
        <p>
          最後に今回の代表者の名前を
          <br />
          記録して、おしまいです！
        </p>
        <input
          type="text"
          className="input"
          value={name}
          onChange={handleInputChange}
        />
        <button className="record-button" onClick={handleRegister}>
          記録する
        </button>
      </div>
      <style jsx>{`
        .finish-message {
          width: 40vw;
          margin: 0 auto;
          text-align: center;
          h1 {
            font-size: 1.5rem;
            margin: 6rem 0 4rem;
          }
          p {
            font-weight: 600;
            margin-bottom: 2rem;
          }
        }

        .input {
          border: none;
          height: 2.4rem;
          border-radius: 5px;
          display: block;
          width: 60%;
          margin: 0 auto;
          margin-bottom: 20px;
        }

        .record-button {
          background: none;
          border: 2px solid var(--primary);
          height: 2.4rem;
          font-size: 1rem;
          font-weight: 600;
          line-height: 2.4rem;
          width: 60%;
          padding: 0 2rem;
          border-radius: 1.5rem;
          color: var(--primary);
        }

        @media screen and (max-width: 600px) {
          .finish-message {
            width: 90vw;
            text-align: center;
            h1 {
              font-size: 1.5rem;
              margin: 6rem 0 4rem;
            }
            p {
              font-weight: 600;
              margin-bottom: 2rem;
            }
          }

          .input {
            width: 100%;
          }

          .record-button {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

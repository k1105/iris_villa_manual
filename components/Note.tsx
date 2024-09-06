import { useState } from "react";
import { CheckIcon } from "./icons/CheckIcon";
import { QuestionIcon } from "./icons/QuestionIcon";
import { SkipIcon } from "./icons/SkipIcon";
import { CloseIcon } from "./icons/CloseIcon";

export const Note = () => {
  const [closed, setClosed] = useState<boolean>(true);

  return (
    <>
      <div className={`container ${closed ? "closed" : ""}`}>
        <div className="icon-container">
          {closed ? (
            <QuestionIcon
              style={{
                width: "2rem",
                height: "2rem",
                margin: "0.5rem",
                textAlign: "center",
                color: "white",
              }}
              onClick={() => {
                setClosed(false);
              }}
            />
          ) : (
            <CloseIcon
              style={{
                width: "2rem",
                height: "2rem",
                margin: "0.5rem",
                textAlign: "center",
                color: "white",
              }}
              onClick={() => {
                setClosed(true);
              }}
            />
          )}
        </div>

        {!closed && (
          <div className="note">
            <CheckIcon
              style={{
                width: "1.5rem",
                height: "1.5rem",
                marginTop: "0.75rem",
              }}
            />
            <p style={{ marginRight: "1rem" }}>：完了</p>
            <SkipIcon
              style={{
                width: "1.5rem",
                height: "1.5rem",
                marginTop: "0.75rem",
              }}
            />
            <p>：あとでにする</p>
          </div>
        )}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          color: black;
          position: fixed;
          bottom: 1rem;
          left: 5vw;
          height: 3rem;
          width: 20rem;
          background: #bbb;
          border-radius: 1.5rem;
          transition: all 0.5s ease;
        }

        .icon-container {
          width: 2rem;
          margin-right: 2.5rem;
        }

        .note {
          margin-right: 1rem;
          line-height: 3rem;
          color: black;
          display: flex;
        }

        .closed {
          background: gray;
          width: 3rem;
        }
      `}</style>
    </>
  );
};

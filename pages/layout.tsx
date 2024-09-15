import Link from "next/link";
import { Zen_Kaku_Gothic_New } from "next/font/google";

const zenKakuBold = Zen_Kaku_Gothic_New({ weight: "700", subsets: ["latin"] });

export default function Layout({
  header,
  children,
}: {
  header: string;
  children: React.ReactNode;
}) {
  return (
    <div className={zenKakuBold.className}>
      <div>
        <Link href={"/"}>
          <p className="header">IRIS VILLA</p>
        </Link>
      </div>
      <h1 className="headline">{header}</h1>
      {children}
      <h2 className="footer">iris villa ver.beta</h2>
      <style jsx>{`
        .header {
          position: absolute;
          top: 30px;
          color: var(--secondary);
          font-weight: 600;
          font-size: 1.5rem;
          left: 5vw;
        }

        .headline {
          margin: 6rem auto 4rem;
          text-align: center;
        }

        .footer {
          text-align: center;
          margin: 5rem 0 2rem;
          font-size: 0.8rem;
          color: rgb(0 0 0 /0.3);
        }

        @media screen and (max-width: 600px) {
          .header {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
}

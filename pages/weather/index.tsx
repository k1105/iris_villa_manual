import Layout from "../layout";

const Weather = () => {
  return (
    <>
      <Layout header="現地の天気">
        <div className="main">
          <p>Comming soon...</p>
        </div>
      </Layout>
      <style jsx>{`
        .main {
          width: 90vw;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
};

export default Weather;

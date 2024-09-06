import Layout from "../layout";

const Contact = () => {
  return (
    <>
      <Layout header="連絡先一覧">
        <div className="main">
          <ul>
            <li>管理事務所</li>
            <li>オーナー</li>
            <li>近くの病院</li>
            <li>
              アイリスヴィラの住所: 501-5303 岐阜県郡上市高鷲町大鷲3330-282,
              416, 310 アイリスヴィラ
            </li>
          </ul>
        </div>
      </Layout>
      <style jsx>{`
        .main {
          width: 90vw;
          margin: 0 auto;
          height: 60vh;
        }
      `}</style>
    </>
  );
};

export default Contact;

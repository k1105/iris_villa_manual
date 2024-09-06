export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, date, arrivalLeaving } = req.body;

    try {
      const response = await fetch(
        "https://iris-villa.microcms.io/api/v1/user-log",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY, // 環境変数でAPIキーを管理
          },
          body: JSON.stringify({
            name: name,
            date: date,
            "arrival-leaving": arrivalLeaving,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        res.status(200).json(data);
      } else {
        res.status(response.status).json({ message: "Error posting data" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

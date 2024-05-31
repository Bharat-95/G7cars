import { verifychecksum } from "../../utils/checksum";
import PaytmConfig from "../../paytmConfig";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const post_data = req.body;

    const checksumhash = post_data.CHECKSUMHASH;
    const result = verifychecksum(post_data, PaytmConfig.KEY, checksumhash);

    if (result) {
      res.status(200).json({ status: "Payment successful" });
    } else {
      res.status(400).json({ status: "Checksum mismatched" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

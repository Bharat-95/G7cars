import { genchecksum } from "../../utils/checksum";
import PaytmConfig from "../../paytmConfig";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { amount, customerId, email, phone } = req.body;

    let params = {
      MID: PaytmConfig.MID,
      WEBSITE: PaytmConfig.WEBSITE,
      INDUSTRY_TYPE_ID: PaytmConfig.INDUSTRY_TYPE_ID,
      CHANNEL_ID: PaytmConfig.CHANNEL_ID,
      ORDER_ID: "ORDER_" + new Date().getTime(),
      CUST_ID: customerId,
      TXN_AMOUNT: amount,
      CALLBACK_URL: PaytmConfig.CALLBACK_URL,
      EMAIL: email,
      MOBILE_NO: phone,
    };

    genchecksum(params, PaytmConfig.KEY, (err, checksum) => {
      if (err) {
        return res.status(500).json({ error: "Checksum generation failed" });
      }
      params["CHECKSUMHASH"] = checksum;

      res.status(200).json({
        params: params,
        txnUrl: PaytmConfig.TXN_URL,
      });
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

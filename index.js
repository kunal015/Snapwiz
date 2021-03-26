const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/data", async (req, res) => {
  const { params } = req.query;

  let filteredResponse = [];

  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        params: {
          start: 1,
          limit: 10,
          convert: "USD",
        },
        headers: {
          "Access-Control-Allow-Origin": "true",
          "X-CMC_PRO_API_KEY": "29366e8f-d165-48fb-94c2-e36c5b79d456",
        },
      }
    );

    if (!params) {
      res.status(200).send({
        status: "success",
        data: response.data.data,
      });
      return;
    }

    const queriedSymbols = params.split(",");

    queriedSymbols.forEach((query) => {
      const someArray = response.data.data.filter(
        (data) => data.symbol === query
      );

      filteredResponse = [...filteredResponse, ...someArray];
    });

    if (filteredResponse <= 0) {
      res.status(404).send({
        status: "falied",
        message: "no content found",
      });
      return;
    }

    res.status(200).send({
      status: "successful",
      data: filteredResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`app running in port :${PORT}`));

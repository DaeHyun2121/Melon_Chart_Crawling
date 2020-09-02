const express = require("express");
const cors = require("cors");
const cheerio = require("cheerio");
const axios = require("axios");
const PORT = 4000;
const app = express();

app.use(cors());

const getHtml = async () => {
  try {
    return await axios.get("http://www.melon.com/chart/");
    // 해당 사이트 html 태그 가져오기
  } catch (error) {
    console.error(error);
  }
};

app.get("/melon", (req, res) => {
  getHtml()
    .then((html) => {
      const $ = cheerio.load(html.data);
      let parentTag = $("tbody > tr"); //크롤링 태그

      let resultArr = [];
      parentTag.each( (index, element) => {
        let itemObj = {
          rank : index + 1,
          image: $(element).find(".wrap img").attr('src'),
          title: $(element).find(".ellipsis.rank01 a").text(),
          artist: $(element).find(".ellipsis.rank02 a").text(),
        };
        resultArr.push(itemObj);
      });

      resultArr.forEach((element) => {
        console.log(`${element.rank}등 : ${element.title}  : ${element.artist}`);
      });
      return resultArr;
    })
    .then((data) => res.send(data));
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
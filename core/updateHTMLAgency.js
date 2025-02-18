const utils = require("./utils");
const fs = require("fs");
const path = require("path");
const https = require("https");
const bossConfig = utils.getConfig();
const proxy = bossConfig.proxy;
const request = require("request");
const hostname = bossConfig.proxy
  .replace("http://", "")
  .replace("https://", "");

function getCookie() {
  const options = {
    hostname,
    path: "/login?jstime=1714728664050",
    method: "POST",
    headers: {
      Accept: "application/json, text/javascript, */*; q=0.01",
      "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Cookie:
        "sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%223973275997%22%2C%22first_id%22%3A%2218eea476a1b3f7-036ae519c68c9b6-1b525637-3686400-18eea476a1c98%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMThlZWE0NzZhMWIzZjctMDM2YWU1MTljNjhjOWI2LTFiNTI1NjM3LTM2ODY0MDAtMThlZWE0NzZhMWM5OCIsIiRpZGVudGl0eV9sb2dpbl9pZCI6IjM5NzMyNzU5OTcifQ%3D%3D%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%24identity_login_id%22%2C%22value%22%3A%223973275997%22%7D%2C%22%24device_id%22%3A%2218eea476a1b3f7-036ae519c68c9b6-1b525637-3686400-18eea476a1c98%22%7D; _gid=GA1.2.312608530.1714351972; _ga_7SFPNQ0LHL=GS1.1.1714564429.7.1.1714566704.0.0.0; WEEX_TOKEN_COOKIE_STAGING={%22bt_ccToken%22:%22%22%2C%22bt_ccToken_expire%22:%22%22%2C%22bt_rToken%22:%22%22%2C%22refresh_token%22:%22%22%2C%22refresh_token_expire%22:%22%22}; _ga_VJ1TZQ4HKS=GS1.1.1714637089.1.1.1714638155.60.0.0; WEEX_LOCAL_COOKIE={%22weex_lang%22:%22en%22%2C%22weex_unit%22:%22CNY%22%2C%22weeex_showasset%22:true%2C%22weex_theme%22:%22dark%22%2C%22weex_layout%22:%22right%22%2C%22weex_valuationunit%22:1%2C%22weex_login%22:false%2C%22global_theme%22:%22white%22%2C%22global_theme_new%22:%22white%22}; _ga=GA1.2.722631729.1713327529; _ga_H684FDKJ2X=GS1.1.1714706253.69.1.1714706254.59.0.0; Authorization=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzE0NzQwMDUxLCJ1c2VySWQiOjEsImlhdCI6MTcxNDcyMjA1MSwiYWNjb3VudCI6ImFkbWluIiwidXNlcktleSI6Inh4eHgifQ.KtwMclM7xxtwMxj0sVaRInP3REZS6SeYFVjet9lmaBrzG3AEppm7TirtHXDf7-BLUddtGTmoDj-tDoFR_eEg1g",
      Origin: proxy,
      Referer: proxy,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "X-Requested-With": "XMLHttpRequest",
      "sec-ch-ua":
        '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
    },
  };
  return new Promise((resolve, reject) => {
    const req = https.request(options, function (res) {
      const chunks = [];
      const cookies = res.headers["set-cookie"];
      // console.log('cookies', cookies)
      resolve(cookies);

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        // const body = Buffer.concat(chunks);
        // console.log();
        // const data =
      });
    });

    req.write(
      new URLSearchParams({
        username: "admin",
        password: "111111",
      }).toString()
    );
    req.end();
  });
}

function getCookieAgency() {

  var headers = {
    accept: "application/json, text/plain, */*",
    "accept-language": "en,zh;q=0.9,en-GB;q=0.8,en-US;q=0.7",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded",
    cookie:
      "WEEX_TOKEN_COOKIE_TEST3={%22bt_uid%22:%22%22%2C%22bt_ccToken%22:%22%22%2C%22bt_ccToken_expire%22:%22%22%2C%22bt_rToken%22:%22%22%2C%22refresh_token%22:%22%22%2C%22refresh_token_expire%22:%22%22}; _c_WBKFRo=7AsOP8jynOAtmVlpTxi3aN2osKcVYVYEQURzed00; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%228100421307%22%2C%22first_id%22%3A%22193963d5cd5109d-046634f4b144c2-1e525636-2073600-193963d5cd62a5d%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMTkzOTYzZDVjZDUxMDlkLTA0NjYzNGY0YjE0NGMyLTFlNTI1NjM2LTIwNzM2MDAtMTkzOTYzZDVjZDYyYTVkIiwiJGlkZW50aXR5X2xvZ2luX2lkIjoiODEwMDQyMTMwNyJ9%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%24identity_login_id%22%2C%22value%22%3A%228100421307%22%7D%2C%22%24device_id%22%3A%22193963d5cd5109d-046634f4b144c2-1e525636-2073600-193963d5cd62a5d%22%7D; _ga_7SFPNQ0LHL=GS1.1.1733790107.1.0.1733790112.0.0.0; WEEX_TOKEN_COOKIE_CANARY={%22bt_uid%22:%22%22%2C%22bt_ccToken%22:%22%22%2C%22bt_ccToken_expire%22:%22%22%2C%22bt_rToken%22:%22%22%2C%22refresh_token%22:%22%22%2C%22refresh_token_expire%22:%22%22}; WEEX_TOKEN_COOKIE_RC={%22bt_uid%22:%22%22%2C%22bt_ccToken%22:%22%22%2C%22bt_ccToken_expire%22:%22%22%2C%22bt_rToken%22:%22%22%2C%22refresh_token%22:%22%22%2C%22refresh_token_expire%22:%22%22}; _gid=GA1.2.1982771985.1733893984; WEEX_TOKEN_COOKIE_STAGING={%22bt_uid%22:%228100421307%22%2C%22bt_ccToken%22:%22%22%2C%22bt_ccToken_expire%22:%22%22%2C%22bt_rToken%22:%22%22%2C%22refresh_token%22:%22%22%2C%22refresh_token_expire%22:%22%22}; _ga=GA1.1.134426951.1733392427; _ga_H684FDKJ2X=GS1.1.1733988816.14.1.1733989429.60.0.0; i18n_lang=zh_CN; rebateAccountingHistoryDataTable=0; financeMgmrRebateAccountingHistoryDataTable=0; SESSION=NjBiMzg1MTAtYzJmZS00MWY4LTlhZTQtZGFiOTkzMTk3N2Ji; WEEX_LOCAL_COOKIE={%22weex_lang%22:%22en%22%2C%22weex_unit%22:%22USD%22%2C%22weeex_showasset%22:false%2C%22weex_theme%22:%22dark%22%2C%22weex_layout%22:%22right%22%2C%22weex_valuationunit%22:1%2C%22weex_login%22:false%2C%22global_theme%22:%22black%22%2C%22global_theme_new%22:%22black%22}; _ga_VJ1TZQ4HKS=GS1.1.1733994934.5.0.1733994934.60.0.0; _ga_2F2WP2GGEV=GS1.1.1733994443.5.1.1733996546.0.0.0",
    origin: "https://stg-agency.weex.tech",
    pragma: "no-cache",
    priority: "u=1, i",
    referer: "https://stg-agency.weex.tech/login",
    "sec-ch-ua":
      '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    vs: "64C80R4800u4Pr14902p2T6t74vyi6NJ",
  };

  var dataString = "token=b2f2bb2f-365e-4c73-875c-bc58596fae24";

  var options = {
    url: "https://stg-agency.weex.tech/v1/agency/login",
    method: "POST",
    headers: headers,
    body: dataString,
  };

  function callback(error, response, body) {
    console.log(body, error, response);
    // if (!error && response.statusCode == 200) {
    // }
  }

  request(options, callback);
}

async function getHTML() {
  const cookies = await getCookie();

  return new Promise((resolve, reject) => {
    const options = {
      hostname,
      path: "/",
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        "Cache-Control": "max-age=0",
        Connection: "keep-alive",
        Cookie: cookies[0],
        Referer: proxy,
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "sec-ch-ua":
          '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
      },
    };

    const req = https.get(options, function (res) {
      const chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        const body = Buffer.concat(chunks);
        //   console.log(body.toString());
        resolve(body.toString());
      });
    });
  });
}

async function getHTMLAgency() {
  const cookies = getCookieAgency();
}

function writeToHtmlFile(clipboardContent) {
  // 获取当前工作目录
  // 拼接文件路径
  const filePath = path.join(__dirname, "../index.html");

  fs.writeFile(filePath, clipboardContent, (error) => {
    if (error) {
      console.error("写入文件出错:", error);
    } else {
      //   console.log('内容已成功写入文件');
      utils.printGreen("菜单更新成功");
    }
  });
}

async function updateHTMLAgency(data) {
  const htmlStr = await getHTMLAgency();
  writeToHtmlFile(htmlStr);
}

module.exports = updateHTMLAgency

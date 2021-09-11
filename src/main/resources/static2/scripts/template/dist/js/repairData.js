var repair = {
  "tw":
    [
      {
        "long": "25.046748",
        "la": "121.467643",
        "no": "",
        "reservation": "2019/05/12"
      },
      {
        "long": "24.258965",
        "la": "120.622075",
        "no": "",
        "reservation": "2019/05/12"
      },
      {
        "long": "23.703493",
        "la": "120.430066",
        "no": "",
        "reservation": "2019/05/12"
      }
    ],
  "cn":
    [
      {
        "long": "39.916909",
        "la": "116.397292",
        "no": "",
        "reservation": "2019/05/12"
      },
      {
        "long": "31.229177",
        "la": "121.475547",
        "no": "",
        "reservation": "2019/05/12"
      },
      {
        "long": "24.476691",
        "la": "118.118536",
        "no": "",
        "reservation": "2019/05/12"
      },
    ],
  "jp":
    [
      {
        "long": "34.655791",
        "la": "135.222573",
        "no": "",
        "reservation": "2019/05/12"
      },
      {
        "long": "35.706269",
        "la": "139.723573",
        "no": "",
        "reservation": "2019/05/12"
      },
      {
        "long": "43.071565",
        "la": "141.368931",
        "no": "",
        "reservation": "2019/05/12"
      },
    ],
  "kr":
    [
      {
        "long": "37.564393",
        "la": "126.989910",
        "no": "",
        "reservation": "2019/05/12"
      },
      {
        "long": "35.826415",
        "la": "127.116132",
        "no": "",
        "reservation": "2019/05/12"
      },
      {
        "long": "37.516782",
        "la": "128.537117",
        "no": "",
        "reservation": "2019/05/12"
      },
    ],
  "th":
    [
      {
        "long": "13.733964",
        "la": "100.345584",
        "no": "",
        "reservation": "2019/05/12"
      },
      {
        "long": "13.039834",
        "la": "100.925043",
        "no": "",
        "reservation": "2019/05/12"
      },
      {
        "long": "13.986372",
        "la": "100.575639",
        "no": "",
        "reservation": "2019/05/12"
      },
    ],
  "my":
    [
      {
        "long": "2.297224",
        "la": "111.850652",
        "no": "",
        "reservation": "2019/05/12"
      },
      {
        "long": "4.035040",
        "la": "100.971776",
        "no": "3431",
        "reservation": "2019/05/12"
      },
      {
        "long": "1.531844",
        "la": "103.645348",
        "no": "",
        "reservation": "2019/05/12"
      },
    ],
  "yn":
    [
      {
        "long": "10.925910",
        "la": "106.760912",
        "no": "",
        "reservation": "2019/05/12"
      },
      {
        "long": "19.812019",
        "la": "105.773230",
        "no": "",
        "reservation": "2019/05/12"
      },
      {
        "long": "12.736522",
        "la": "109.158430",
        "no": "",
        "reservation": "2019/05/12"
      },
    ],
  "id":
    [
      {
        "long": "-6.211782",
        "la": "106.869255",
        "no": "",
        "reservation": "2019/05/12"
      },
      {
        "long": "-8.321386",
        "la": "115.087934",
        "no": "",
        "reservation": "2019/05/12"
      },
      {
        "long": "-4.152237",
        "la": "120.046653",
        "no": "",
        "reservation": "2019/05/12"
      },
    ],
  "ph":
    [
      {
        "long": "14.598486",
        "la": "120.981792",
        "no": "",
        "reservation": "2019/05/12"
      },
      {
        "long": "7.186565",
        "la": "125.447620",
        "no": "",
        "reservation": "2019/05/12"
      },
      {
        "long": "15.975059",
        "la": "120.566197",
        "no": "",
        "reservation": "2019/05/12"
      },
    ]
}
var serialNo = new Object();
;
for (j in repair) {
  for (k in repair[j]) {
    repair[j][k]["no"] = randomNo();
    serialNo[repair[j][k]["no"]] = repair[j][k];
  }
}

function randomNo() {
  var no = "";
  for (i = 0; i < 5; i++) {
    no += Math.floor(Math.random() * 10);
  }
  return no;
}

function lastCenterCheck(lastCenter, ipCenter, ipCenter2) {
  if (lastCenter["lat"] === undefined || lastCenter["lng"] === undefined) {
    lastCenter["lat"] = ipCenter["lat"];
    lastCenter["lng"] = ipCenter["lng"];
  }
  if (lastCenter["lat"] === undefined || lastCenter["lng"] === undefined) {
    lastCenter["lat"] = ipCenter2["lat"];
    lastCenter["lng"] = ipCenter2["lng"];
  }
  return lastCenter;
}


function getCurrentPosition() {
  //  獲得現在位置
  $.ajax({
    url: "http://ip-api.com/json",
    method: 'GET',
    async: false,
    success: function (api) {
      ipCenter["nation"] = api["country"];
      ipCenter["countryCode"] = api["countryCode"];
      ipCenter2["lat"] = api["lat"];
      ipCenter2["lng"] = api["lon"];
    }
  });
  navigator.geolocation.watchPosition((position) => {
    ipCenter["lat"] = Math.round(position.coords.latitude * 10000) / 10000;
    ipCenter["lng"] = Math.round(position.coords.longitude * 10000) / 10000;
  });
  return [ipCenter, ipCenter2];
}

function getNationDataSource(center) {
  let nationDataSource = new kendo.data.DataSource({
    transport: {
      read: {
        type: "GET",
        dataType: "json",
        url: "https://rawgit.com/ryankane/d40364df707e9e600fcaa0bb645c762f/raw/95c865f7258e61e254a5b405d867e35de7530e61/countries.json",
      }
    },
    schema: {
      data: function (data) {
        let nationArray = [];
        $.each(data, function (index, value) {
          nationArray.push({code: value.code, name: `${value.name} (${value.code})`});
          if (value.code === center["countryCode"]) {
            center["nation"] = `${value.name} (${value.code})`;
          }
        });
        return nationArray;
      }
    }
  });
  return [nationDataSource, center];
}

function undefined2null(value) {
  return value = (value === undefined) ? "" : value;
}

async function systemGenerate(nearInputId) {
  let response = await fetch(`/member/generate/${nearInputId}`);
  return await response.text();
}

'use strict';

let stompClient;

$(function () {
  connect();

  $("#send").on("click", sendMessage);
  $("#close").on("click", close);
});

/**
 * 連線
 * @param event
 * @returns
 */
function connect() {
  if (infoStream) {
    console.log("開始連線");
    let subscribeHeader = infoStream;
    subscribeHeader.dateTime = new Date();

    let socket = new SockJS('/api/info/stream/chat/room');
    stompClient = Stomp.over(socket);
    // 停止 console log 的 debug 訊息
    stompClient.debug = null;
    stompClient.connect({}, onConnected, onError);
  }
}

function close() {
  if (infoStream) {
    console.log("連線關閉");
    if (stompClient) {
      let chatMessage = {
        name: infoStream.name,
        type: infoStream.type,
        uuid: infoStream.uuid,
        token: infoStream.token,
        message: "close",
        dateTime: new Date()
      };

      stompClient.send(`/api/info/stream/server/send/${infoStream.type}/${infoStream.uuid}`, {}, JSON.stringify(chatMessage));
      $("#message").val('');
    }
  }
}

/**
 * 連線建立後要處理的邏輯
 * @returns
 */
async function onConnected() {
  console.log("完成連線");
  console.log("開始訂閱");
  let token = infoStream.token ? infoStream.token : null;

  let subscribeHeader = infoStream;
  subscribeHeader.dateTime = new Date();

  // 訂閱 topic
  // 當有人傳送訊息至同樣 topic ，後端接收後會發送給所有訂閱者，執行 onMessageReceived()
  let messageTopic = `/api/info/stream/topic/${infoStream.type}/${infoStream.uuid}`;
  console.log(messageTopic);

  let errorTopic = `/api/info/stream/topic/${infoStream.type}/${infoStream.uuid}/${infoStream.name}/error`;
  console.log(errorTopic);

  let isSubscribed = false;

  stompClient.subscribe(errorTopic, function (response) {
    console.log("----------收到錯誤---------");
    console.log(JSON.parse(response.body));
    console.log("----------錯誤結束---------");

    if (!isSubscribed) {
      isSubscribed = true;

      stompClient.subscribe(messageTopic, function (response) {
        console.log("----------收到訊息---------");
        console.log(JSON.parse(response.body));
        console.log("----------訊息結束---------");
      }, subscribeHeader);
    }
  }, subscribeHeader);

  // 取得聊天記錄 (使用 server paging)
  let guestDataSource = new kendo.data.DataSource({
    transport: {
      read: {
        type: "GET",
        dataType: "json",
        // url: `/api/info/stream/guest/${infoStream.type}/template/${infoStream.token}`,
        url: `/api/${infoStream.type}/guest/chat/history/${infoStream.token}`
      },
      parameterMap: function (data) {
        // Pagination
        return {
          // pagination
          size: data.pageSize,
          page: data.page -= 1
        };
      }
    },
    serverPaging: true,
    serverFiltering: true,
    schema: {
      total: function (data) {
        return data.response.totalElements;
      },
      data: function (data) {
        console.log(data);
        return data.response.content;
      },
      model: {
        id: "uuid"
      }
    },
    sort: {field: "date", dir: "asc"},
    pageSize: 10,
  });

  guestDataSource.fetch(function () {
    console.log("沒有登入的聊天記錄");
  });

  let dataSource = new kendo.data.DataSource({
    transport: {
      read: {
        type: "GET",
        dataType: "json",
        url: `/api/${infoStream.type}/${infoStream.uuid}`,
      },
      parameterMap: function (data) {
        // Pagination
        return {
          // pagination
          size: data.pageSize,
          page: data.page -= 1
        };
      }
    },
    serverPaging: true,
    serverFiltering: true,
    schema: {
      total: function (data) {
        return data.response.totalElements;
      },
      data: function (data) {
        // data 中有更多其他屬性
        console.log(data);
        return data.response.content;
      },
      model: {
        id: "uuid"
      }
    },
    sort: {field: "date", dir: "asc"},
    pageSize: 10,
  });

  dataSource.fetch(function () {
    console.log("有登入的聊天記錄");
  });
}

function onError(error) {
  console.log("error");
  console.log(error);
}

/**
 * 發送訊息
 * @param event 發送訊息事件
 * @returns
 */
function sendMessage(event) {
  let messageContent = $("#message").val().trim();

  if (messageContent && stompClient) {
    let chatMessage = {
      name: infoStream.name,
      type: infoStream.type,
      uuid: infoStream.uuid,
      token: infoStream.token,
      message: messageContent,
      dateTime: new Date()
    };

    stompClient.send(`/api/info/stream/server/send/${infoStream.type}/${infoStream.uuid}`, {}, JSON.stringify(chatMessage));
    $("#message").val('');
  }

  event.preventDefault();
}

/**
 * 從後端接受訊息後要進行的處理
 * @param payload 後端送來的訊息
 * @returns
 */
function onMessageReceived(payload) {
  console.log("收到訊息");
  console.log(payload);
}

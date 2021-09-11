/* chatroom 1.5 */
var stompClient, chatContainer, chatDetail, chatNoti, chatData, dialogueData, isSender = 0;
var header = {};
var chatEvent = {
  "CLOSE": "caseClosed",
  "UPDATE": "//",
  "MESSAGE": "speechBubble"
}
var chatroomTemplate = `
<div class="row">
<div class="col-md-12">
    <div class="box box-success" style="padding-bottom:70px">
      <nav class="toBottom"><i class="fa fa-arrow-down"></i></nav>
      <div class="dialogue direct-chat-messages scrollbar">
      </div><!--direct-chat-messages-->
      <div class="message_sendbox">
        <input type="text" class="form-control inline sendbox_form" name="text">
        <a class ="sendMsg sendbox_btn" href="javascript:void(0)"><i class="fa fa-paper-plane-o"></i></a>
      </div><!--message_sendbox-->
      </div><!--box-->
  </div><!--col-->
</div><!--row-->
`;
var bubbleTemplate = `
<section id="bubbleTemplate" style="display:none;">
  <div class="direct-chat-msg">
      <span class="chatter"></span>
      <div class="direct-chat-text">
      <span class="content"></span>
        <div class="direct-chat-info clearfix">
          <span class="direct-chat-timestamp pull-right datetime"></span>
        </div><!--direct-chat-info-->
      </div><!--direct-chat-text-->
  </div><!--direct-chat-msg-->
</section>`
  ;
var chatCheck = `
<svg width="80px" height="80px" class="checkMrak">
<g transform="translate(10,70) scale(0.033,-0.03)" fill="none">
  <path d="M995 1305 c-62 -16 -96 -52 -189 -202 -85 -136 -244 -458 -287 -581
  -17 -51 -33 -91 -34 -90 -2 2 -23 33 -47 69 -69 103 -138 177 -175 190 -64 21
  -183 -28 -183 -75 0 -8 39 -58 86 -113 47 -54 117 -146 157 -205 81 -121 103
  -135 190 -125 78 10 89 22 142 159 102 263 249 542 422 801 51 77 93 146 93
  154 0 32 -88 42 -175 18z" fill="white"/>
</g>
<path d="M15 48 l9 11 q 2 5, 6 -3 l16 -27" class="drawCheck" stroke="\\#71ade9" stroke-width="10" fill="none"/>
</svg>`
function setChatNotiPosition() {
  var left = ($(window).width() - $(".k-notification").parent().width()) / 2;
  $(".k-notification").parent().css({ "top": "250px", "left": left + "px" })
}
$(function () {
  $("body").append("<span id='chatNoti'></span>");
  chatNoti = $("#chatNoti").kendoNotification({
    templates: [{
      type: "caseClosed",
      template: "<div class='saveOrInsert zoominTrans'>已結案</span>" + chatCheck + "</div>"
    }
    ],
    autoHideAfter: 1500
  }).data("kendoNotification");

  $.fn.chatroom = function (options) {
    chatContainer = this;
    var serialNum = createChatId(10);
    var settings = $.extend({
      dataUrl: "",
      chatEvent: []
    }, options);
    chatContainer.html(chatroomTemplate);
    chatContainer.attr("data-chat", serialNum);
    $("body").append(bubbleTemplate);
    for (i in settings.eventOverride) {
      chatEvent[serialNum + "-" + i] = (settings.eventOverride[i]) ? settings.eventOverride[i] : "//";
    }
    $(".sendMsg").click(function (e) {
      chatContainer = $(this).closest(".row").parent();
      sendMessage(e);
    });

    $("body").keydown(function (e) {
      var key = e.which || e.keyCode;
      if (key == 13) {
        $("[name='text']:focus + a").trigger("click");
      }
    })
    $(".toBottom").click(function () {
      var btn = $(this);
      var scrollHeight = btn.next(".dialogue").prop("scrollHeight");
      btn.next(".dialogue").animate({
        scrollTop: scrollHeight
      }, 500);
      setTimeout(function () { btn.fadeOut(); }, 400);
    });//.toBottom click

    $(".dialogue").scroll(function () {
      if ($(this).prop("scrollTop") < 10) {
        loadPreviousData($(this), settings.dataUrl);
      }
      if ($(this).prop("scrollTop") > ($(this).prop("scrollHeight") - $(this).prop("clientHeight") - 10)) {
        $(this).prev(".toBottom").fadeOut();
      } else {
        $(this).prev(".toBottom").fadeIn();
      }
    });//chatContainer scroll

    header.token = infoStream.token;
    header.name = infoStream.name;
    header.uuid = infoStream.uuid;
    header.type = infoStream.type;
    connect();
    chatData = new kendo.data.DataSource({
      transport: {
        read: {
          type: "GET",
          dataType: "json",
          url: settings.dataUrl
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
          chatDetail = data.response;
          return data.response.contents;
        },
        model: {
          id: "uuid"
        }
      },
      sort: { field: "date", dir: "asc" },
      pageSize: 10,
    });
    chatData.fetch(function () {
      for (i of chatDetail.contents.reverse()) {
        dialogueData = {
          "dateTime": i.time,
          "name": i.name,
          "content": i.content,
        }
        if (i.name == infoStream.name) {
          isSender = 1;
        }
        speechBubble();
      }
      // console.log("有登入的聊天記錄");
    });//chatData.fetch

  }//end of main chatroom
})//$function

function connect() {
  if (infoStream) {
    // console.log("開始連線");
    let subscribeHeader = infoStream;
    subscribeHeader.dateTime = new Date();

    let socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);
    // 停止 console log 的 debug 訊息
    // stompClient.debug = null;
    stompClient.connect(header, onConnected, onError);
  }
}
/**
 * 連線建立後要處理的邏輯
 * @returns
 */
async function onConnected() {
  // console.log("完成連線");
  // console.log("開始訂閱");
  let token = infoStream.token ? infoStream.token : null;

  let subscribeHeader = infoStream;
  subscribeHeader.dateTime = new Date();

  // 訂閱 topic
  // 當有人傳送訊息至同樣 topic ，後端接收後會發送給所有訂閱者，執行 onMessageReceived()
  let messageTopic = `/topic/${infoStream.type}/${infoStream.uuid}`;
  // console.log(messageTopic);

  let isSubscribed = false;

  if (!isSubscribed) {
    isSubscribed = true;

    stompClient.subscribe(messageTopic, function (response) {
      // console.log("----------收到訊息---------");
      dialogueData = JSON.parse(response.body);
      if (chatEvent[chatContainer.attr("data-chat") + "-" + dialogueData.responseType] != undefined) {
        eval(chatEvent[chatContainer.attr("data-chat") + "-" + dialogueData.responseType] + "();");
      } else if (chatEvent[dialogueData.responseType] != undefined) {
        eval(chatEvent[dialogueData.responseType] + "();");
      }
      
      // console.log(JSON.parse(response.body));
      // console.log("----------訊息結束---------");
    }, header);
  }

  // 取得聊天記錄 (使用 server paging)
  // let guestDataSource = new kendo.data.DataSource({
  //   transport: {
  //     read: {
  //       type: "GET",
  //       dataType: "json",
  //       // url: `/api/info/stream/guest/${infoStream.type}/template/${infoStream.token}`,
  //       url: `/api/${infoStream.type}/guest/chat/history/${infoStream.token}`
  //     },
  //     parameterMap: function (data) {
  //       // Pagination
  //       return {
  //         // pagination
  //         size: data.pageSize,
  //         page: data.page -= 1
  //       };
  //     }
  //   },
  //   serverPaging: true,
  //   serverFiltering: true,
  //   schema: {
  //     total: function (data) {
  //       return data.response.totalElements;
  //     },
  //     data: function (data) {
  //       // console.log(data);
  //       return data.response.content;
  //     },
  //     model: {
  //       id: "uuid"
  //     }
  //   },
  //   sort: { field: "date", dir: "asc" },
  //   pageSize: 10,
  // });

  // guestDataSource.fetch(function () {
  //   // console.log("沒有登入的聊天記錄");
  // });

  //   let dataSource = new kendo.data.DataSource({
  //     transport: {
  //       read: {
  //         type: "GET",
  //         dataType: "json",
  //         url: `/api/${infoStream.type}/${infoStream.uuid}`,
  //       },
  //       parameterMap: function (data) {
  //         // Pagination
  //         return {
  //           // pagination
  //           size: data.pageSize,
  //           page: data.page -= 1
  //         };
  //       }
  //     },
  //     serverPaging: true,
  //     serverFiltering: true,
  //     schema: {
  //       total: function (data) {
  //         return data.response.totalElements;
  //       },
  //       data: function (data) {
  //         // data 中有更多其他屬性
  //         // console.log(data);
  //         return data.response.content;
  //       },
  //       model: {
  //         id: "uuid"
  //       }
  //     },
  //     sort: { field: "date", dir: "asc" },
  //     pageSize: 10,
  //   });

  //   dataSource.fetch(function () {
  //     // console.log("有登入的聊天記錄");
  //   });

}//onConnected
function onError(error) {
  // console.log("error");
  // console.log(error);
}

/**
 * 發送訊息
 * @param event 發送訊息事件
 * @returns
 */

function sendMessage(event) {
  isSender = 1;
  let messageContent = chatContainer.find("[name='text']").val().trim();

  if (messageContent && stompClient) {
    stompClient.send(`/send/${infoStream.type}/${infoStream.uuid}`, header, messageContent);
    chatContainer.find("[name='text']").val("");
  }

  event.preventDefault();
}

/**
 * 從後端接受訊息後要進行的處理
 * @param payload 後端送來的訊息
 * @returns
 */
function onMessageReceived(payload) {
  // console.log("收到訊息");
  // console.log(payload);
}
function createChatId(n) {
  var id = [];
  id.push(Math.floor(Math.random() * 9) + 1);
  for (i = 1; i < n; i++) {
    id.push(Math.floor(Math.random() * 10));
  }
  return id.join("");
}
function caseClosed() {
  chatNoti.show({}, "caseClosed");
  setChatNotiPosition(); setTimeout(function () {
    $(".drawCheck").hide().delay(600).queue(function () {
      location.reload()
      $(this).dequeue();
    });
  }, 1000);
}
function speechBubble() {
  var data = dialogueData;
  $("#bubbleTemplate").find(".content").text(data.content);
  $("#bubbleTemplate").find(".datetime").text(data.dateTime);
  chatContainer.find(".dialogue").append($("#bubbleTemplate").html());
  if (isSender) {
    chatContainer.find(".dialogue > .direct-chat-msg:last").addClass("right");
  } else {
    chatContainer.find(".dialogue > .direct-chat-msg:last .chatter").text(data.name);
  }
  isSender = 0;
  chatContainer.find(".dialogue").scrollTop(chatContainer.find(".dialogue").prop("scrollHeight") - chatContainer.find(".dialogue").prop("clientHeight"));
}//speechBubble

function loadPreviousData(chatbox, url) {
  if ((chatDetail.currentPage + 1) >= chatDetail.totalPages) {
    return false;
  }
  $.ajax({
    url: `${url}?size=${chatDetail.size}&page=${chatDetail.currentPage + 1}`,
    method: 'GET',
    success: function (data) {
      if (!data.status) {
        return false;
      }
      chatDetail = data.response;
      for (i of chatDetail.contents.reverse()) {
        $("#bubbleTemplate").find(".content").text(i.message);
        $("#bubbleTemplate").find(".datetime").text(i.dateTime);
        chatbox.prepend($("#bubbleTemplate").html());
        if (i.responseName == infoStream.name) {
          chatbox.find(".direct-chat-msg:first").addClass("right");
        } else {
          chatbox.find(".direct-chat-msg:first .chatter").text(i.name);
        }
      }//loop
      chatbox.scrollTop(chatbox.find(".direct-chat-msg").eq(chatDetail.numberOfElements).position().top);
    }//end of success
  });//end of ajax
}//loadPreviousData

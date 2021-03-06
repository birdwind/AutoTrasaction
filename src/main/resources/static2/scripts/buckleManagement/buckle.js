// var columnTemplate = {
//     "buckleCoreNo": function (d) {
//         return "<a class='number_a' href='/page/buckleManagement/buckle/form/" + d.buckleCoreUuid + "'>" + d.buckleCoreNo + "</a>";
//     }
// }
// var dataSource = new kendo.data.DataSource({
//     transport: {
//         read: {
//             url: "/scripts/buckleManagement/gridJson/gridJson.json",
//             dataType: "json",
//             // type: "POST",
//             processData: false,
//             contentType: false
//         }, parameterMap: function (data) {
//             let postData = new FormData();
//             let dataFilter = data.filter;
//             if (dataFilter) {
//                 $.each(dataFilter.filters, function (element, value) {
//                     switch (value.field) {
//                         default:
//                             break;
//                     }
//                 })
//             }
//             postData.append("filter", new Blob([JSON.stringify({
//                 size: data.pageSize,
//                 page: data.page -= 1,
//                 filter: dataFilter,
//                 sort: data.sort
//             })], {
//                 type: "application/json"
//             }));
//             return postData;
//         }
//     },
//     // serverPaging: true,
//     // serverFiltering: true,
//     // serverSorting: true,
//     schema: {
//         total: function (data) {
//             return data.response.totalElements
//         },
//         data: function (data) {
//             titles = data.response.header;
//             columnItem = [];
//             for (i in titles) {
//                 switch (i) {
//                     case "buckleCoreUuid":
//                         continue;
//                         break;
//                     case "buckleCoreNo":
//                         var temp = {
//                             field: i,
//                             title: titles[i].title,
//                             filterable: {
//                                 cell: {
//                                     operator: "contains",
//                                     suggestionOperator: "contains"
//                                 }
//                             }
//                         }
//                         break;
//                     case "status":
//                         var temp = {
//                             field: i,
//                             title: titles[i].title,
//                             filterable: {
//                                 cell: {
//                                     operator: "contains",
//                                     suggestionOperator: "contains"
//                                 }
//                             }
//                         }
//                         break;
//                     default:
//                         var temp = {
//                             field: i,
//                             title: titles[i].title,
//                             filterable: {
//                                 cell: {
//                                     operator: "contains",
//                                     suggestionOperator: "contains"
//                                 }
//                             }
//                         }
//                         break;
//                 }
//                 if (columnTemplate[i]) {
//                     temp.template = columnTemplate[i];
//                 }
//                 columnItem.push(temp);
//             }//loop
//             return data.response.contents;
//         },
//         model: {
//             fields: {
//                 "buckleCoreNo": { type: "string" },
//                 "currentLocation": { type: "string" },
//                 "buckleSpec": { type: "string" },
//                 "manufactureOrderCoreNo": { type: "string" },
//                 "batchNo": { type: "string" },
//                 "status": { type: "string" }
//             }
//         }
//     },
//     pageSize: 10,
//     page: (sessionStorage.getItem("bucklePage") == null) ? 1 : sessionStorage.getItem("bucklePage")
// });

$(async function () {
  let grid = new Grid("/buckle/management/", "", "buckleCore", "buckleCore");
  await grid.initDataSource();
  let filterable = {
    mode: "row",
    messages: {
      info: ""
    },
    operators: {
      string: {
        eq: "????????????",
        contains: "??????",
      },
      number: {
        lte: "????????????",
        eq: "??????",
        gte: "????????????",
      },
      date: {
        gte: "??????",
        lte: "??????",
        eq: "??????",
        between: "????????????"
      }
    }
  };
  await grid.creatKendGrid("#buckle", filterable);

});

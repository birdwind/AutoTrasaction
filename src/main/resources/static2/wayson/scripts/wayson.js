$(function () {
  $("#grid").kendoGrid({
    dataSource: {
      transport: {
        read: {
          type: "GET",
          dataType: "json",
          url: "/api/info/stream/yarnInquiryCore/template/f44ac1ad-1fe2-4d9b-ab16-dc23c29d1b6a",
        }, parameterMap: function (data) {
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
      sort: { field: "date", dir: "asc" },
      pageSize: 10,
    },
    sortable: true,
    persistSelection: true,
    pageable: {
      input: true,
      numeric: true
    },
    columns: [
      {
        field: "uuid",
        width: "30%"
      },
      {
        field: "content",
        width: "20%"
      },
      {
        field: "responseName",
        width: "15%"
      },
      {
        field: "date",
        width: "15%"
      },
    ]
  });
});

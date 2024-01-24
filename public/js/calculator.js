console.log("From Calculator");

$(function () {
  //this function will be executed after page load
  $("#calculatorPostFormAjax").on("submit", handleFormSubmit);
  //   $("#calculationResultsTbl .btn-warning").on("click", deleteBtnClicked); // default binding
  $(document).on(
    "click",
    "#calculationResultsTbl .btn-warning",
    deleteBtnClicked
  ); // event delegation countered
  $("#deleteAllBtn").on("click", function (e) {
    e.preventDefault();
    $.ajax({
      url: "/api/calculator/delete-all",
      method: "post",
      success: function () {
        $("#calculationResultsTbl tbody").empty();
      },
    });
  });
});

function handleFormSubmit(e) {
  console.log(e);
  e.preventDefault(); //stop form submission
  let data = {
    operand1: $("#operand1").val(),
    operand2: $("#operand2").val(),
    operation: $("#operation").val(),
  };

  //   initiate ajax call
  $.ajax({
    url: "/api/calculator",
    method: "post",
    data,
    success: function (res) {
      //function to be executed after successful ajax call
      console.log(res);
      $("#calculationResultsTbl tbody").append(`<tr>
      <td><a class="btn btn-sm btn-warning" data-id="${res._id}" href="/calculator/delete/${res._id}">Del</a></td>
      <td>${res.operand1}</td>
      <td>${res.operation}</td>
      <td>${res.operand2}</td>
      <td>${res.result}</td>
      <td>${res.description}</td>
      <td>${res.virtual_result}</td>
   </tr>`);
      //   $("#calculationResultsTbl .btn-warning").on("click", deleteBtnClicked);
      // above line is required as new table rows are not binded by default
      // this is not a good way to do that
    },
    error: function (err) {
      //function to be executed after ajax call failure
      console.log(err);
    },
  });
  console.log(data);
}

function deleteBtnClicked(e) {
  //   alert("del btn clicked");
  let id = $(this).attr("data-id");
  let tr = $(this).closest("tr");
  $.ajax({
    url: `/api/calculator/${id}`,
    method: "delete",
    success: function (res) {
      tr.remove();
    },
    error: function (err) {
      //function to be executed after ajax call failure
      console.log(err);
    },
  });

  e.preventDefault();
}

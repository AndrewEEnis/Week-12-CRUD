const bikes_url = "https://64449128b80f57f581a774f1.mockapi.io/bikes";

$.get(bikes_url).then((data) => {
  data.map((bike) => {
    $("tbody").append(
      $(`
      <tr>
        <td>${bike.id}</td>
          <td>${bike.model}</td>
          <td>${bike.category}</td>
          <td>${bike.manufacturer}</td>
          <td>
          <button onclick="deleteBike(${bike.id})">Delete Bike</button>
          </td>
       </tr>             
      `)
    );
  });
});

$("#submitBike").on("click", () => {
  $.post(bikes_url, {
    bikeModel: $("#bikeModel").val(),
    bikeCategory: $("#bikeCategory").val(),
    bikeManufacturer: $("#bikeManufacturer").val(),
  });
});

function deleteBike(id) {
  $.ajax(`${bikes_url}/${id}`, {
    method: "DELETE",
  });
}

function updateBike(e) {
  e.preventDefault();
  let id = $("#updateID").val();

  fetch(`${bikes_url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bikeModel: $("#updateModel").val(),
      bikeCategory: $("#updateCategory").val(),
      bikeManufacturer: $("#updateManufacturer").val(),
    }),
  });
}

$("#updateBike").on("click", updateBike);

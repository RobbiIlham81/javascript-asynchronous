// Define the URL from which to fetch data
const apiUrl = "https://jsonplaceholder.typicode.com/users";

// Function to fetch data from the URL
function fetchData(url, callback) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Function to create and populate the table
function createAndPopulateTable(data) {
  const tableContainer = document.getElementById("app");

  // Create the table element
  const table = document.createElement("table");
  table.classList.add("table", "table-striped");

  // Create the table header
  const tableHeader = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `
        <th>ID</th>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
        <th>Address</th>
        <th>Company</th>
    `;
  tableHeader.appendChild(headerRow);

  // Create the table body and populate it with data
  const tableBody = document.createElement("tbody");
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.username}</td>
            <td>${item.email}</td>
            <td>${item.address?.street}, ${item.address?.suite}, ${item.address?.city}</td>
            <td>${item.company?.name}</td>
        `;
    tableBody.appendChild(row);
  });

  // Append the header and body to the table
  table.appendChild(tableHeader);
  table.appendChild(tableBody);

  // Append the table to the container
  tableContainer.appendChild(table);
}

// Fetch data and create/populate the table
fetchData(apiUrl, function (data) {
  createAndPopulateTable(data);
});

export default fetchData;

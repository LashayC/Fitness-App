function editAccountInfo(id, currentFirstName, currentLastName, currentEmail) {
    alert('profile values', id, currentEmail, currentFirstName, currentLastName)
  let newFirstName = document.querySelector("#newFirstName").value;
  let newLastName = document.querySelector("#newLastName").value;
  let newEmail = document.querySelector("#newEmail").value;


  let accountBody = {};
  accountBody._id = id;
  accountBody.firstName = currentFirstName || newFirstName;
  accountBody.lastName = currentLastName || newLastName;
  accountBody.email = currentEmail || newEmail;

  fetch("/profileAccountUpdate", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(accountBody),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      window.location.reload(true);
    });
}

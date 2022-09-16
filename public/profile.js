function editAccountInfo(id, currentFirstName, currentLastName, currentEmail, currentUser) {

    // alert('profile values' + id + currentEmail + currentFirstName +  currentLastName)


  let newFirstName = document.querySelector("#firstName").value;
  let newLastName = document.querySelector("#lastName").value;
  let newEmail = document.querySelector("#email").value;
  let newUser = document.querySelector("#newUserName").value;

//   alert('profile values the new' + newFirstName + newLastName + newEmail)

  let accountBody = {};
  accountBody._id = id;
  accountBody.firstName = newFirstName || currentFirstName;
  accountBody.lastName = newLastName || currentLastName;
  accountBody.email = newEmail || currentEmail;
  accountBody.username = newUser || currentUser;

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
        alert('Changes to profile will show after signout. Use updated username on next signin.')
      window.location.reload(true);
    });
}

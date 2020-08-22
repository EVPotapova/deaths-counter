function saveToFirebase(nickName) {
  var value = document.getElementById(nickName).value;
  commonSave(nickName, value);
}

function ValueUp(nickName) {
  var value = Number.parseInt(document.getElementById(nickName).value) + 1;
  commonSave(nickName, value);
}
function ValueDown(nickName) {
  var value = Number.parseInt(document.getElementById(nickName).value) - 1;
  commonSave(nickName, value);
}

function commonSave(nickName, value) {
  var counterObject = {
    nickName: nickName,
    number: value,
  };
  var dbRef = firebase.database().ref("deaths-count");

  dbRef.once("value").then(
    function (snap) {
      var snVal = snap.val();
      var userKey = Object.keys(snVal).find(
        (key) => snVal[key].nickName === nickName
      );
      var userRef = firebase.database().ref("deaths-count/" + userKey);

      userRef.set(counterObject).then(
        function (snapshot) {
          pushLog(nickName, value);
          getAllFromFirebase();
        },
        function (error) {
          alert(
            "Oops, something goes wrong. Call Samara IMMEDIATELY!!!" + error
          );
        }
      );
    },
    function (error) {
      alert("Oops, something goes wrong. Call Samara IMMEDIATELY!!!" + error);
    }
  );
}

function pushLog(nickName, value) {
  var logRef = firebase.database().ref("log-changes");

  var logMessage = {
    date: new Date().toUTCString(),
    message:
      nickName.replace("_Value", "") +
      "'s counter has been changed to " +
      value,
  };

  logRef
    .push()
    .set(logMessage)
    .then(
      function (snapshot) {},
      function (error) {
        alert("Oops, something goes wrong. Call Samara IMMEDIATELY!!!" + error);
      }
    );
}

function getAllFromFirebase() {
  var dbRef = firebase.database().ref("deaths-count");

  dbRef.once("value").then(
    function (snap) {
      var array = Object.values(snap.val());

      array.forEach((element) => {
        document.getElementById(element.nickName).value = element.number;
      });
    },
    function (error) {
      alert("Oops, something goes wrong. Call Samara IMMEDIATELY!!!" + error);
    }
  );

  var ulLog = document.getElementById("log_container");
  var logRef = firebase.database().ref("log-changes");

  logRef.once("value").then(
    function (snap) {
      if (snap.val()) {
        ulLog.innerHTML = "";
        var array = Object.values(snap.val());

        array.forEach((element) => {
          ulLog.innerHTML +=
            "<li><strong>" +
            element.date +
            " - </strong>" +
            element.message +
            "</li>";
        });
      }
    },
    function (error) {
      alert("Oops, something goes wrong. Call Samara IMMEDIATELY!!!" + error);
    }
  );
}

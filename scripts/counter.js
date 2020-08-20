function saveToFirebase(nickName) {
  var value = document.getElementById(nickName).value;
  commonSave(nickName, value);
}

function ValueUp(nickName){
    
  var value = Number.parseInt(document.getElementById(nickName).value)+1;
  commonSave(nickName, value);
}
function ValueDown(nickName){
    
  var value = Number.parseInt(document.getElementById(nickName).value)-1;
  commonSave(nickName, value);
}

function commonSave(nickName, value){    
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
            getAllFromFirebase();
        },
        function (error) {
          alert("Oops, something goes wrong. Call Samara IMMEDIATELY!!!" + error);
        }
      );
    },
    function (error) {
      alert("Oops, something goes wrong. Call Samara IMMEDIATELY!!!" + error);
    }
  );
}

function getKeyByNickname(nickName) {}

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
}

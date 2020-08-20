function saveToFirebase(nickName) {

    var value = document.getElementById(nickName).value;

  var counterObject = {
    nickName: nickName,
    number: value,
  };

  var dbRef = firebase
    .database()
    .ref("deaths-count");
    
    dbRef.push()
    .set(counterObject)
    .then(
      function (snapshot) {
        alert("Changed Succesfully!");
      },
      function (error) {
        alert("Oops, something goes wrong. Call Samara IMMEDIATELY!!!");
      }
    );

    getAllFromFirebase();
}


function getAllFromFirebase() {
    var dbRef = firebase.database().ref("deaths-count");
  
    dbRef.once('value').then(function(snap) {
        console.log(snap.val());    
    });
  }
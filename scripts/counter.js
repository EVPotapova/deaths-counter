function saveToFirebase(nickName) {

    var value = document.getElementById(nickName).value;

  var counterObject = {
    nickName: nickName,
    number: value,
  };

  var userKey = getKeyByNickname(nickName);

  var dbRef = firebase
    .database()
    .ref("deaths-count/"+userKey);
    
    dbRef
    .set(counterObject)
    .then(
      function (snapshot) {
        console.log("Changed Succesfully!");
      },
      function (error) {
        alert("Oops, something goes wrong. Call Samara IMMEDIATELY!!!");
      }
    );

    getAllFromFirebase();
}


function getKeyByNickname(nickName){
    var dbRef = firebase.database().ref("deaths-count");
    dbRef.orderByChild("nickName").equalsTo(nickName).on("value", snap => {
        return snap.key;
       });
}

function getAllFromFirebase() {
    var dbRef = firebase.database().ref("deaths-count");
  
    dbRef.once('value').then(function(snap) {
        var array =Object.keys(snap.val()) ;   
        
        array.forEach((element) => {
            console.log(element);
            document.getElementById(element.nickName).value = element.number);
          });
        
    });
  }
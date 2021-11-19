var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var bookmark = document.getElementsByClassName("fa-bookmark");
let button = document.querySelector('#submit')
console.log(thumbUp)





  // <!-- Set autocomplete address input -->
  let gpaInput = document.getElementById("enterLocation")
  
  let autocomplete = new google.maps.places.Autocomplete(gpaInput);



  // <!-- SEARCH BUTTON EVENT LISTENER-->
  button.addEventListener("click", event => {
      event.preventDefault();
      let caption =  document.getElementById("caption").value
      let photo =  document.getElementById("photo").value
      let array = photo.split(`fakepath`)
      photo = array[1].substring(1)
      // <!-- FETCH USER COORDINATES -->
      let userAddress = gpaInput.value;
      console.log(userAddress)
      console.log(caption)
      console.log(photo)
      let queryAddress = userAddress.split(' ').join('+')
      fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${queryAddress}&key=AIzaSyB0vrbaqfRBzXOFbEGmsNORTWRdG3zNFBI`
          )
          
          .then(res => res.json())
          .then(function (result) {
            console.log(result)
              let userCoordinates = {
                  lat: result.results[0].geometry.location.lat,
                  lng: result.results[0].geometry.location.lng
              }
              console.log(userCoordinates)

              fetch('makePost', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
              
                  'caption':caption,
                  'photo': photo,
                  'lat':userCoordinates.lat,
                  'lng': userCoordinates.lng
                })
              })
              .then(response => {
                if (response.ok) return response.json()
              })
             
              
          })
          .catch(function (err) {
              console.error(err);
          });
  });

Array.from(bookmark).forEach(function(element) {
  element.addEventListener('click', function(){
   
    const postId= element.dataset.id
    fetch('bookmark', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
    
        'postId':postId
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
       
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[4].innerText)
        console.log(this.parentNode.parentNode.childNodes[4])
        fetch('liked', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
        
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(thumbDown).forEach(function(element) {
  element.addEventListener('click', function(){
  
    const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[4].innerText)
    fetch('liked', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'thumbUp':(thumbUp -1) -1
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

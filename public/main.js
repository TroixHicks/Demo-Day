var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-minus-circle");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var bookmark = document.getElementsByClassName("fa-bookmark");


  // <!-- Set autocomplete address input -->
  let gpaInput = document.getElementById("enterLocation")
  let autocomplete = new google.maps.places.Autocomplete(gpaInput);


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

var url = location.href.split("/"); //replace string with location.href
var navLinks = document.getElementsByClassName("nav-link");

//naturally you could use something other than the <nav> element
var currentPage = url[url.length - 1];
for(let i=0;i < navLinks.length; i++){
  var lb = navLinks[i].href.split("/");
  console.log(lb)
  if(lb[lb.length-1] == currentPage) {
   navLinks[i].className = "nav-link active";
    }
  }

//validation 


function validateForm() {
    let x = document.forms["myForm"]["name"].value;
    if (x == ""||x.trim().length==0) {
    
      alert("Name must not be empty");
      return false;
    }
    let y=document.forms["myForm"]["password"].value;
    if(y==""||y.trim().length==0){
        alert("Password field must not be empty")
        return false;
    }
    let z=document.forms["myForm"]["email"].value;
    if(z==""||z.trim().length==0){
      alert("Email field must not be empty")
      return false;
  }
  else 
  document.getElementById("login").disabled=true;
  // document.forms["myForm"].reset()
}
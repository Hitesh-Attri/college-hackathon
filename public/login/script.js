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
    document.getElementsByClassName("b")[0].disabled=true;
}

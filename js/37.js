// tags
let n = document.getElementById('username');
let p = document.getElementById('password');

// errors
let ne = document.getElementById('ne');
let pe = document.getElementById('pe');

n.addEventListener("change", function() {
    if(n.value.trim() !== "") {
        p.focus();
    }
});
/*
document.addEventListener("DOMContentLoad", function(){
	let n = document.getElementById('username');
   n.focus();
});
*/  //not working idk why 

function validate() 
{
    let nm = n.value.trim();
    let pm = p.value;

    ne.innerHTML = "";
    pe.innerHTML = "";

    if(nm == "")
    {
        ne.innerHTML = "Username is required";
        n.focus();
        return false;
    }

    if(pm == "")
    {
        pe.innerHTML = "Password is required";
        p.focus();
        return false;
    }
    
    let r=document.getElementById('res');
    r.innerHTML="Successfully registered";
    r.style.color="darkgreen";
    r.style.fontSize="20px"
    return false;
}

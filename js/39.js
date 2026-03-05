let e = document.getElementById('email');
let p = document.getElementById('pass');

let ee = document.getElementById('ee');
let pe = document.getElementById('pe');

let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&₹]).{8,}$/;

/* Email Live Check */
e.addEventListener("input", function() {

    if(emailPattern.test(e.value))
    {
        ee.innerHTML = "Valid email";
        ee.style.color = "green";
        e.style.border = "2px solid green";
    }
    else
    {
        ee.innerHTML = "Invalid email format";
        ee.style.color = "red";
        e.style.border = "2px solid red";
    }

});

/* Password Live Check */
p.addEventListener("input", function() {

    if(passPattern.test(p.value))
    {
        pe.innerHTML = "Strong password";
        pe.style.color = "green";
        p.style.border = "2px solid green";
    }
    else
    {
        pe.innerHTML = "8+ chars, upper, lower, number, symbol required";
        pe.style.color = "red";
        p.style.border = "2px solid red";
    }

});
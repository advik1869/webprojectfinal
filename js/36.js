function validateform()
{
    let n = document.getElementById('name');
    let e = document.getElementById('email');
    let p = document.getElementById('pass');

    let nl = n.value.trim();
    let el = e.value.trim();
    let pl = p.value;

    let ne = document.getElementById('ne');
    let ee = document.getElementById('ee');
    let pe = document.getElementById('pe');
    let res = document.getElementById('res');

    // Clear old messages
    ne.innerHTML = "";
    ee.innerHTML = "";
    pe.innerHTML = "";
    res.innerHTML = "";

    if(nl === "")
    {
        ne.innerHTML = "Username is required";
        n.focus();
        return false;
    }

    if(el === "")
    {
        ee.innerHTML = "E-mail is required";
        e.focus();
        return false;
    }

    if(pl === "")
    {
        pe.innerHTML = "Password is required";
        p.focus();
        return false;
    }

    res.innerHTML = "Registered successfully.";
    res.style.color = "lightgreen";

    return false;   // prevent page refresh
}
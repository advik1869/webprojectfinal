function validate() 
{
    let n = document.getElementById('name').value.trim();
    let e = document.getElementById('email').value.trim();
    let m = document.getElementById('res');

    if (n === "") 
    {
        m.innerHTML = "Name is required.";
        m.style.color = "#fff600";
        return;
    }

    if (e === "") 
    {
        m.innerHTML = "Email is required.";
        m.style.color = "#fff600";
        return;
    }

    // Gender check
    let g = document.getElementsByName('gender');
    let gs = false;

    for (let i = 0; i < g.length; i++) 
    {
        if (g[i].checked) 
        {
            gs = true;
            break;
        }
    }

    if (!gs) 
    {
        m.innerHTML = "Please select a gender.";
        m.style.color = "#fff600";
        return;
    }

    // Subject check
    let s = document.getElementsByName('sub');
    let ss = false;

    for (let i = 0; i < s.length; i++) 
    {
        if (s[i].checked) 
        {
            ss = true;
            break;
        }
    }

    if (!ss) 
    {
        m.innerHTML = "Select at least one subject.";
        m.style.color = "#fff600";
        return;
    }

    // Declaration
    let d = document.getElementById('declaration').checked;

    if (!d) 
    {
        m.innerHTML = "Please agree to terms.";
        m.style.color = "#fff600";
        return;
    }

    // Success
    m.innerHTML = "Registration Successful!";
    m.style.color = "lightgreen";
}
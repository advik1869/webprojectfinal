function validate()
{
    let n = document.getElementById('name').value.trim();
    let c = document.getElementById('contact').value.trim();

    let m1 = document.getElementById('nameerror');
    let m2 = document.getElementById('contacterror');
    let m3 = document.getElementById('roomerror');
    let m4 = document.getElementById('serviceerror');
    let m5 = document.getElementById('termserror');
    let res = document.getElementById('res');

    // Clear old messages
    m1.innerHTML = "";
    m2.innerHTML = "";
    m3.innerHTML = "";
    m4.innerHTML = "";
    m5.innerHTML = "";
    res.innerHTML = "";

    if(n === "")
    {
        m1.innerHTML = "Guest name is required.";
        return false;
    }

    if(c === "")
    {
        m2.innerHTML = "Contact number is required.";
        return false;
    }

    // Room validation
    let r = document.getElementsByName("room");
    let rs = false;

    for(let i=0;i<r.length;i++)
    {
        if(r[i].checked)
        {
            rs = true;
            break;
        }
    }

    if(!rs)
    {
        m3.innerHTML = "Please select the room type.";
        return false;
    }

    // Services validation
    let s = document.getElementsByName('service');
    let ss = false;

    for(let i=0;i<s.length;i++)
    {
        if(s[i].checked)
        {
            ss = true;
            break;
        }
    }

    if(!ss)
    {
        m4.innerHTML = "Select at least one additional service.";
        return false;
    }

    // Terms
    let t = document.getElementById('terms');

    if(!t.checked)
    {
        m5.innerHTML = "You must accept Terms & Conditions.";
        return false;
    }

    res.innerHTML = "Booking Confirmed!";
    res.style.color = "green";

    return true;
}
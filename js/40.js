let l = document.getElementById('login');
let s = document.getElementById('signup');
let c = document.getElementById('confirm');
let ov = document.getElementById('overlay');

let lb = document.getElementById('Loginbtn');
let sb = document.getElementById('Signupbtn');
let cb = document.getElementById('Confirmbtn');

function hideAll()
{
    [l,s,c].forEach(m=>{
        m.style.opacity="0";
        m.style.visibility="hidden";
    });
}

function show(modal)
{
    hideAll();
    modal.style.visibility="visible";
    modal.style.opacity="1";

    ov.style.visibility="visible";
    ov.style.opacity="1";
}

lb.onclick = ()=>show(l);
sb.onclick = ()=>show(s);
cb.onclick = ()=>show(c);

ov.onclick = function(){
    hideAll();
    ov.style.opacity="0";
    ov.style.visibility="hidden";
};
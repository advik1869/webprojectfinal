let i = document.getElementById('img');
let tt = document.getElementById('tooltip');

i.addEventListener("mouseover", func1);
i.addEventListener("mouseout", func2);


function func1()
{
	tt.style.display = "block";
}

function func2()
{
	tt.style.display = "none";
}

i.addEventListener("mousemove", function(e)
{
	let x = e.clientX;
	let y = e.clientY;

	tt.style.left = (x + 20) + "px";
	tt.style.top  = (y + 15) + "px";
});

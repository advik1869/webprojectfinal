let images=document.querySelectorAll(".gallery img")

for(let i=0;i<images.length;i++)
{
	images[i].addEventListener("click",func1 )
}
function func1()
{
	for(let j=0;j<images.length;j++)
	{
		images[j].style.zIndex=j;
	}
	this.style.zIndex="10";
}
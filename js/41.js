let cards = document.querySelectorAll(".left, .mid, .right");

for(let i=0;i<cards.length;i++)
{
	let card=cards[i];
	let tooltip=card.querySelector('.tooltip');

	card.addEventListener("mouseenter",func1);
	card.addEventListener("mouseleave",func2);
	function func1()
	{
		tooltip.style.display="block";
		tooltip.style.zIndex="950";
	}
	function func2()
	{
		tooltip.style.display="none";
	}
}



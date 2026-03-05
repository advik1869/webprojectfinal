function goTop(){
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function loadCode(file, id, btn) {

  let box = document.getElementById(id);

  if (box.style.display === "block") {
    box.style.display = "none";
    btn.innerText = "Show Code";
    return;
  }

  fetch(file + "?v=" + new Date().getTime())
    .then(response => response.text())
    .then(data => {
      box.textContent = data;
      box.style.display = "block";
      btn.innerText = "Hide Code";
    })
    .catch(error => {
      box.textContent = "Error loading file.";
      box.style.display = "block";
    });
}
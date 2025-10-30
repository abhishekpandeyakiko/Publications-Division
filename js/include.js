function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => document.getElementById(id).innerHTML = data);
}

window.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "components/header.html");
  loadComponent("footer", "components/footer.html");
  loadComponent("sidebar", "components/sidebar.html");
});

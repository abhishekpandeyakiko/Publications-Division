// js/include.js
function includeHTML() {
  const includes = document.querySelectorAll('[data-include]');
  includes.forEach(el => {
    const file = el.getAttribute('data-include');
    if (file) {
      fetch(file)
        .then(response => response.text())
        .then(data => {
          el.innerHTML = data;
        })
        .catch(error => {
          el.innerHTML = "<p>Component not found.</p>";
        });
    }
  });
}

document.addEventListener("DOMContentLoaded", includeHTML);

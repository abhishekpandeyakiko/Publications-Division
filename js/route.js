function loadPage(pageName) {
  const pagePath = `pages/${pageName}.html`;
  fetch(pagePath)
    .then(res => {
      if (!res.ok) throw new Error("Page not found");
      return res.text();
    })
    .then(html => {
      document.getElementById("main-content").innerHTML = html;
      window.scrollTo(0, 0); // scroll to top
    })
    .catch(() => {
      document.getElementById("main-content").innerHTML = "<h2>404 - Page Not Found</h2>";
    });
}

// Handle URL changes
window.addEventListener("hashchange", () => {
  const page = location.hash.replace("#", "") || "home";
  loadPage(page);
});

// Load default page
window.addEventListener("DOMContentLoaded", () => {
  const page = location.hash.replace("#", "") || "home";
  loadPage(page);
});

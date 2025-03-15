document.getElementById("pc-toggle").addEventListener('click',()=> {
    document.getElementById("mobile-nav").classList.remove('hidden')
})

document.getElementById("nav-close").addEventListener("click", () => {
  document.getElementById("mobile-nav").classList.add("hidden");
});
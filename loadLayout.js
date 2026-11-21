async function loadLayout() {
    const parser = new DOMParser();
    const [header, footer, scrollBack] = await Promise.all([
        fetch("/header.html").then((r) => r.text()), 
        fetch("/footer.html").then((r) => r.text()), 
        fetch("/scrollBackBtn.html").then((r) => r.text())
    ]);
    const docHeader = parser.parseFromString(header, "text/html");
    const docFooter = parser.parseFromString(footer, "text/html");
    const docBtn = parser.parseFromString(scrollBack, "text/html");
    console.log(docHeader.querySelector("#associationRegInput"));

    const btn = docBtn.querySelector("#scrollTopBtn")
    document.body.append(docBtn.querySelector("#scrollTopBtn"))
    document.querySelector("#site-header").outerHTML = docHeader.querySelector("#site-header").outerHTML;
    document.querySelector("#site-footer").outerHTML = docFooter.querySelector("#site-footer").outerHTML;
    console.log("Header and footer loaded!");
    document.querySelector("#associationRegInput").onkeyup=filterFunction;
    document.querySelector("#scrollTopBtn").addEventListener("click", function() {
            window.scrollBy({ top: -window.scrollY, behavior: "smooth" });
        });
    window.onscroll = function (){
        if (document.body.scrollTop >= 200 || document.documentElement.scrollTop >= 200) {
            btn.classList.add("visible");
        } 
        else {
            btn.classList.remove("visible");
        }
    }
}
function filterFunction() {
    let input, filter, a, i;
    input = document.getElementById("associationRegInput");
    filter = input.value.toUpperCase();
    let div = document.getElementById("dropdown-content");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        let txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}
document.addEventListener("DOMContentLoaded", loadLayout);

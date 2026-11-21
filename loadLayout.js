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
    const btn = docBtn.querySelector("#scrollTopBtn")
    document.body.append(docBtn.querySelector("#scrollTopBtn"))
    document.querySelector("#site-header").outerHTML = docHeader.querySelector("#site-header").outerHTML;
    document.querySelector("#site-footer").outerHTML = docFooter.querySelector("#site-footer").outerHTML;
    console.log("Header and footer loaded!");

    const mobileBtn = document.getElementById("mobile-menu-btn");
    const headerNav = document.getElementById("header-nav");

    if (mobileBtn && headerNav) {
        let hide = true;

        mobileBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            hide = !hide;
            headerNav.classList.toggle("is-open", !hide);
            mobileBtn.setAttribute("aria-expanded", String(!hide));
            mobileBtn.textContent = hide ? "☰" : "X";
        });

        document.addEventListener("click", (e) => {
            if (!hide && !headerNav.contains(e.target) && e.target !== mobileBtn) {
                hide = true;
                headerNav.classList.remove("is-open");
                mobileBtn.setAttribute("aria-expanded", "false");
                mobileBtn.textContent = "☰";
            }
        });
    }
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

document.addEventListener("DOMContentLoaded", loadLayout);

async function loadLayout() {
    const parser = new DOMParser(); // Parser pour lire transformer le contenu textuel des .html en DOM
    const [header, footer, scrollBack] = await Promise.all([ // Récupération des fichiers de l'entête, du pied de page, et du bouton pour remonter au haut de la page
        fetch("/header.html").then((r) => r.text()),
        fetch("/footer.html").then((r) => r.text()),
        fetch("/scrollBackBtn.html").then((r) => r.text())
    ]);
    const docHeader = parser.parseFromString(header, "text/html");
    const docFooter = parser.parseFromString(footer, "text/html");
    const docBtn = parser.parseFromString(scrollBack, "text/html");
    const btn = docBtn.querySelector("#scrollTopBtn"); // Récupération du bouton
    document.body.append(docBtn.querySelector("#scrollTopBtn")) // Ajout du bouton à la page
    document.querySelector("#site-header").outerHTML = docHeader.querySelector("#site-header").outerHTML; // Changer le contenu du header place-holder pour contenir le HTML récupéré
    document.querySelector("#site-footer").outerHTML = docFooter.querySelector("#site-footer").outerHTML; // Changer le contenu du footer place-holder pour contenir le HTML récupéré
    console.log("Header and footer loaded!");
    document.querySelector("#associationRegInput").onkeyup = filterFunction; // Appel de la fonction filtre quand l'utilisateur tape dans la barre de recherche

    // Mobile hamburger button
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
    document.querySelector("#scrollTopBtn").addEventListener("click", function () {
        window.scrollBy({top: -window.scrollY, behavior: "smooth"}); // Lors du clique, remonte en haut de la page. ScrollTo ne fonctionne pas car l'événement "MouseWheel" ne fonctionnera pas pour reafficher le header (qui disparaît lors que l'utilisateur défile vers le bas)
    });
    window.onscroll = function () {
        if (document.body.scrollTop >= 200 || document.documentElement.scrollTop >= 200) { // Quand l'utilisateur défile 2 segments (1 = 100), affiche le bouton pour remonter
            btn.classList.add("visible");
        } else {
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

document.addEventListener("DOMContentLoaded", loadLayout); // Exécuter le chargement une fois que la page est chargé (pour que les querySelector fonctionne)

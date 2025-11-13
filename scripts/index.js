function adjustPasteis2saboresTitle() {
    const title = document.getElementById('pasteis-sabores-title');
    if (window.innerWidth > 700) {
        title.innerHTML = 'Pastéis 2 sabores';
    } else {
        title.innerHTML = 'Pastéis<br>2 sabores';
    }
}

function adjustRefri1LitroTitle() {
    const title2 = document.getElementById('Refri1Litro');
    if (window.innerWidth > 700){
        title2.innerHTML = 'Refrigerantes 1 Litros';
    }
    else {
        title2.innerHTML = 'Refrigerantes <br> 1 Litros';
    }
}

function adjPastelXtudoTitle() {
    const title3 = document.getElementById('pasteis-xtudo');
        if (window.innerWidth > 700) {
            title3.innerHTML = 'Pastel X-tudo'; 
        }  
        else {
            title3.innerHTML = 'Pastel <br> X-tudo'
        }
} 

window.addEventListener('resize', 
adjustPasteis2saboresTitle);
adjustPasteis2saboresTitle();// Run on page load

window.addEventListener('resize', 
adjustRefri1LitroTitle);
adjustRefri1LitroTitle();

window.addEventListener('resize',
adjPastelXtudoTitle);
adjPastelXtudoTitle();

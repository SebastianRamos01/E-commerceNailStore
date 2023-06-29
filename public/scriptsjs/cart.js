window.addEventListener("load", () => {
    const flechita = document.getElementById("flechita");
    const elemento = document.querySelector(".elementos");
    const resumen = document.querySelector(".resumen");
    let isElementosVisible = false;
  
    flechita.addEventListener("click", () => {
      if (isElementosVisible) {
        resumen.style.display = "block";
        elemento.style.display = "none";
        isElementosVisible = false; 
      } else {
        resumen.style.display = "none";
        elemento.style.display = "flex";
        isElementosVisible = true; 
      }
    });
  });
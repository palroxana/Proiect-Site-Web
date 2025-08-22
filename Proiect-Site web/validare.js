window.addEventListener("DOMContentLoaded", function () {

  function valideazaText(inputId, bulinaId) {
    const input = document.getElementById(inputId);
    const bulina = document.getElementById(bulinaId);

    input.addEventListener("input", function () {
      const valoare = input.value;
      const regex = /^[a-z0-9]*$/;

      if (regex.test(valoare)&& valoare !== "") {
        bulina.classList.remove("invalid");
        bulina.classList.add("valid");
      } else {
        bulina.classList.remove("valid");
        bulina.classList.add("invalid");
      }
    });
  }

  valideazaText("text1", "bulina-text1");
  valideazaText("text2", "bulina-text2");


  function valideazaParola() {
    const input = document.getElementById("parola");
    const bulina = document.getElementById("bulina-parola");

    input.addEventListener("input", function () {
      const valoare = input.value;
      const areLitMica = /[a-z]/.test(valoare);
      const areLitMare = /[A-Z]/.test(valoare);
      const areCifra = /[0-9]/.test(valoare);
      const areSemn = /[!]/.test(valoare);

      if (areLitMica && areLitMare && areCifra && areSemn) {
        bulina.classList.remove("invalid");
        bulina.classList.add("valid");
      } else {
        bulina.classList.remove("valid");
        bulina.classList.add("invalid");
      }
    });
  }

  valideazaParola();


  function valideazaEmail() {
    const input = document.getElementById("email");
    const bulina = document.getElementById("bulina-email");

    input.addEventListener("input", function () {
      const valoare = input.value;
      const doarCaracterePermise = /^[a-zA-Z0-9_@.]+$/.test(valoare);
      const areUnSingurAt = (valoare.match(/@/g) || []).length === 1;
      const areCelPutinUnPunct = valoare.includes(".");

      if (doarCaracterePermise && areUnSingurAt && areCelPutinUnPunct) {
        bulina.classList.remove("invalid");
        bulina.classList.add("valid");
      } else {
        bulina.classList.remove("valid");
        bulina.classList.add("invalid");
      }
    });
  }

  valideazaEmail();


  function valideazaTelefon() {
    const input = document.getElementById("telefon");
    const bulina = document.getElementById("bulina-telefon");

    input.addEventListener("input", function () {
      const valoare = input.value;
      const regex = /^\(\+40\)\s[0-9]{3}\s[0-9]{3}\s[0-9]{3}$/;

      if (regex.test(valoare)) {
        bulina.classList.remove("invalid");
        bulina.classList.add("valid");
      } else {
        bulina.classList.remove("valid");
        bulina.classList.add("invalid");
      }
    });
  }

  valideazaTelefon();

 
  function valideazaData() {
    const input = document.getElementById("data");
    const select = document.getElementById("format");
    const bulina = document.getElementById("bulina-data");

    input.addEventListener("input", verifica);
    select.addEventListener("change", verifica);

    function verifica() {
      const valoare = input.value;
      const format = select.value;

      if (valideaza(valoare, format)) {
        bulina.classList.remove("invalid");
        bulina.classList.add("valid");
      } else {
        bulina.classList.remove("valid");
        bulina.classList.add("invalid");
      }
    }
  }

  function valideaza(data, format) {
    const parts = data.split("/");

    let zi, luna, an;

    if (format === "zz/ll/aaaa") {
      [zi, luna, an] = parts;
    } else if (format === "ll/zz/aaaa") {
      [luna, zi, an] = parts;
    } else if (format === "zz/ll/aa") {
      [zi, luna, an] = parts;
      an = "20" + an;
    } else {
      return false;
    }

    zi = parseInt(zi, 10);
    luna = parseInt(luna, 10);
    an = parseInt(an, 10);

    const dataObj = new Date(an, luna - 1, zi);
    return (
      dataObj.getFullYear() === an &&
      dataObj.getMonth() === luna - 1 &&
      dataObj.getDate() === zi
    );
  }

  valideazaData();


  const formular = document.getElementById("formValidare");

  formular.addEventListener("submit", function (e) {
    e.preventDefault();

    const toateBulinele = document.querySelectorAll(".bulina");
    let totulValid = true;

    toateBulinele.forEach(bulina => {
      if (!bulina.classList.contains("valid")) {
        totulValid = false;
      }
    });

    if (totulValid) {
      alert("🎉 Toate câmpurile sunt valide! Formular trimis cu succes!");

    } else {
      alert("⚠️ Unele câmpuri sunt invalide. Te rugăm să le corectezi!");
    }
  });
});

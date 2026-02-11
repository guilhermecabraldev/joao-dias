document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("leadForm");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nameEl = document.getElementById("name");
    const emailEl = document.getElementById("email");
    const phoneEl = document.getElementById("phone");

    const n = (nameEl?.value || "").trim();
    const m = (emailEl?.value || "").trim();
    const p = (phoneEl?.value || "").trim();

    if (!n || !m || !p) {
      alert("Por favor, preenche todos os campos.");
      return;
    }

    const submitBtn = document.querySelector('button[type="submit"]');
    const loadingBtn = document.querySelector("button.loading");

    submitBtn.style.display = "none";
    loadingBtn.style.display = "block";

    const payload = {
      name: n,
      email: m,
      phone: p,
      source: "Desafio 14 Dias Barriga Definida",
      timestamp: new Date().toISOString()
    };

    try {
      await fetch(
        "https://services.leadconnectorhq.com/hooks/bu54Ewnaxt6xTe2Go5Tt/webhook-trigger/42b3ba91-233d-416b-97db-00085dbae5a3",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(payload)
        }
      );

      document.querySelector(".row-form").style.display = "none";
      document.querySelector(".ml-form-successBody").classList.add("show");
    } catch (err) {
      alert("Ocorreu um erro ao processar o teu pedido. Por favor, tenta novamente.");
      submitBtn.style.display = "block";
      loadingBtn.style.display = "none";
    }
  });
});

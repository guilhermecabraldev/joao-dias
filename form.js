document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("leadForm");
  if (!form) return;

  function setLoading(isLoading){
    const submitBtn = document.querySelector('button[type="submit"]');
    const loadingBtn = document.querySelector("button.loading");
    if(!submitBtn || !loadingBtn) return;
    submitBtn.style.display = isLoading ? "none" : "block";
    loadingBtn.style.display = isLoading ? "block" : "none";
  }

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

    setLoading(true);

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

      // Popup de sucesso
      const modal = document.getElementById("successModal");
      if (modal) modal.classList.add("show");

      // Limpar form
      form.reset();
      setLoading(false);
    } catch (err) {
      alert("Ocorreu um erro ao processar o teu pedido. Por favor, tenta novamente.");
      setLoading(false);
    }
  });
});

// Função global para fechar o popup
function closeSuccessModal(){
  const modal = document.getElementById("successModal");
  if (modal) modal.classList.remove("show");
}

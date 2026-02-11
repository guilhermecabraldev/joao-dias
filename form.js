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

  function showSuccessPopup(){
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,0.5)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999";

    const modal = document.createElement("div");
    modal.style.background = "#fff";
    modal.style.padding = "30px";
    modal.style.borderRadius = "6px";
    modal.style.maxWidth = "400px";
    modal.style.width = "90%";
    modal.style.textAlign = "center";
    modal.style.fontFamily = "'Open Sans', Arial, sans-serif";

    const title = document.createElement("h3");
    title.innerText = "🎉 Inscrição enviada com sucesso!";
    title.style.marginBottom = "15px";

    const text = document.createElement("p");
    text.innerText = "Recebemos os teus dados. Em breve vais receber as próximas instruções.";

    const button = document.createElement("button");
    button.innerText = "Fechar";
    button.style.marginTop = "15px";
    button.style.background = "#43a047";
    button.style.border = "none";
    button.style.color = "#fff";
    button.style.padding = "10px 20px";
    button.style.borderRadius = "4px";
    button.style.cursor = "pointer";

    button.onclick = function(){
      document.body.removeChild(overlay);
    };

    overlay.onclick = function(e){
      if(e.target === overlay){
        document.body.removeChild(overlay);
      }
    };

    modal.appendChild(title);
    modal.appendChild(text);
    modal.appendChild(button);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
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

      form.reset();
      setLoading(false);
      showSuccessPopup();

    } catch (err) {
      alert("Ocorreu um erro ao processar o teu pedido. Por favor, tenta novamente.");
      setLoading(false);
    }
  });
});

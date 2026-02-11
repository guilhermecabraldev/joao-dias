(function () {
  const WEBHOOK_URL =
    "https://services.leadconnectorhq.com/hooks/bu54Ewnaxt6xTe2Go5Tt/webhook-trigger/42b3ba91-233d-416b-97db-00085dbae5a3";

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function setLoading(isLoading, container) {
    const submitBtn = qs('button[type="submit"]', container);
    const loadingBtn = qs("button.loading", container);
    if (!submitBtn || !loadingBtn) return;
    submitBtn.style.display = isLoading ? "none" : "block";
    loadingBtn.style.display = isLoading ? "block" : "none";
  }

  function showSuccessPopup() {
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
    overlay.style.zIndex = "999999";

    const modal = document.createElement("div");
    modal.style.background = "#fff";
    modal.style.padding = "28px";
    modal.style.borderRadius = "6px";
    modal.style.maxWidth = "420px";
    modal.style.width = "90%";
    modal.style.textAlign = "center";
    modal.style.fontFamily = "'Open Sans', Arial, Helvetica, sans-serif";

    const h = document.createElement("h3");
    h.textContent = "🎉 Inscrição enviada com sucesso!";
    h.style.margin = "0 0 12px 0";
    h.style.fontSize = "22px";

    const p = document.createElement("p");
    p.textContent =
      "Recebemos os teus dados. Em breve vais receber as próximas instruções.";
    p.style.margin = "0";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Fechar";
    btn.style.marginTop = "16px";
    btn.style.background = "#43a047";
    btn.style.border = "none";
    btn.style.color = "#fff";
    btn.style.padding = "10px 20px";
    btn.style.borderRadius = "4px";
    btn.style.cursor = "pointer";
    btn.style.fontWeight = "700";

    function close() {
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }
    btn.addEventListener("click", close);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });

    modal.appendChild(h);
    modal.appendChild(p);
    modal.appendChild(btn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }

  function initOne(container) {
    const form = qs("#leadForm", container);
    if (!form) return;

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const nameEl = qs("#name", container);
      const emailEl = qs("#email", container);
      const phoneEl = qs("#phone", container);

      const n = (nameEl && nameEl.value ? nameEl.value : "").trim();
      const m = (emailEl && emailEl.value ? emailEl.value : "").trim();
      const p = (phoneEl && phoneEl.value ? phoneEl.value : "").trim();

      if (!n || !m || !p) {
        alert("Por favor, preenche todos os campos.");
        return;
      }

      setLoading(true, container);

      const payload = {
        name: n,
        email: m,
        phone: p,
        source: "Desafio 14 Dias Barriga Definida",
        timestamp: new Date().toISOString(),
      };

      try {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(payload),
        });

        form.reset();
        setLoading(false, container);
        showSuccessPopup();
      } catch (err) {
        setLoading(false, container);
        alert("Ocorreu um erro ao processar o teu pedido. Por favor, tenta novamente.");
      }
    });
  }

  function init() {
    // container do teu form (evita conflitos se existir mais do que um form na página)
    const container = document.getElementById("mlb2-26506012") || document;
    initOne(container);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

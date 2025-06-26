function subscribe(plan) {
  showNotification(`Você assinou o plano ${plan}!`);
}

function showResponse(botType) {
  const responses = {
    respostaBasico: "Olá! Como posso ajudar?",
    respostaPremium: "Como posso otimizar sua experiência hoje?",
    respostaSeguranca: "Mensagem bloqueada por conter linguagem imprópria.",
    respostaTraducao: "Traduzindo: 'Hello' → 'Olá'",
    respostaMax: "Sistema pronto. Comandos carregados. Pronto para uso completo."
  };

  document.getElementById("responseText").innerText = responses[botType] || "Resposta não disponível.";
  document.getElementById("responseModal").style.display = "flex";
}

function hideResponse() {
  document.getElementById("responseModal").style.display = "none";
}

function showNotification(message) {
  const notif = document.getElementById("notification");
  notif.innerText = message;
  notif.style.display = "block";
  setTimeout(() => notif.style.display = "none", 2000);
}
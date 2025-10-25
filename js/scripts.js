/* ------------------------------------------------------
   Raízes do Bem — Interatividade e Funcionalidades
   Autor: Rafael Gonçalves Solera
   ------------------------------------------------------ */

/* ================================
   UTILITÁRIOS DE DOM E FEEDBACK
================================ */

// Cria um toast (mensagem visual de feedback)
function showToast(message, type = "success") {
  let toastWrap = document.querySelector(".toast-wrap");
  if (!toastWrap) {
    toastWrap = document.createElement("div");
    toastWrap.className = "toast-wrap";
    document.body.appendChild(toastWrap);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  if (type === "error") toast.style.background = "#e05a4f";

  toastWrap.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 50);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

/* ================================
   SISTEMA DE NAVEGAÇÃO SPA SIMPLES
================================ */

function loadSection(targetId) {
  const sections = document.querySelectorAll("main section");
  sections.forEach(sec => (sec.style.display = "none"));

  const target = document.getElementById(targetId);
  if (target) target.style.display = "block";
}

document.querySelectorAll("nav a[data-target]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const id = link.dataset.target;
    loadSection(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

/* ================================
   VALIDAÇÃO DE FORMULÁRIO
================================ */

function validateForm(form) {
  const fields = form.querySelectorAll("input, select");
  let valid = true;

  fields.forEach(field => {
    const value = field.value.trim();
    field.classList.remove("invalid");

    // Campos obrigatórios
    if (!value) {
      field.classList.add("invalid");
      showToast(`O campo "${field.name}" é obrigatório.`, "error");
      valid = false;
      return;
    }

    // E-mail
    if (field.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      field.classList.add("invalid");
      showToast("Digite um e-mail válido.", "error");
      valid = false;
    }

    // CPF (formato simples)
    if (field.name.toLowerCase().includes("cpf") && !/^\d{11}$/.test(value.replace(/\D/g, ""))) {
      field.classList.add("invalid");
      showToast("Digite um CPF válido (11 dígitos).", "error");
      valid = false;
    }

    // Telefone
    if (field.type === "tel" && !/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(value)) {
      field.classList.add("invalid");
      showToast("Digite um telefone válido (DDD + número).", "error");
      valid = false;
    }
  });

  return valid;
}

/* ================================
   ENVIO DE FORMULÁRIO
================================ */

const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (validateForm(form)) {
      showToast("Cadastro enviado com sucesso!");
      form.reset();
    }
  });
}

/* ================================
   MENU MOBILE (HAMBURGUER)
================================ */

const hamburger = document.querySelector(".hamburger");
const navMobile = document.querySelector(".nav-mobile");

if (hamburger && navMobile) {
  hamburger.addEventListener("click", () => {
    navMobile.classList.toggle("open");
  });
}
/* ================================
   MODO ESCURO ACESSÍVEL
================================ */

const toggleContrast = document.createElement("button");
toggleContrast.textContent = "🌓 Modo Escuro";
toggleContrast.className = "contrast-toggle";
document.body.appendChild(toggleContrast);

toggleContrast.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

/* ================================
   FIM DO SCRIPT
================================ */
// Código finalizado. Todas as funcionalidades implementadas.
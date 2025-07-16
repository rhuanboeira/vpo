// Aguarda o DOM carregar completamente
document.addEventListener("DOMContentLoaded", () => {
  // ===== MENU MOBILE =====
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const nav = document.getElementById("nav")
  const navLinks = document.querySelectorAll(".nav-link")

  // Toggle do menu mobile
  mobileMenuBtn.addEventListener("click", () => {
    nav.classList.toggle("active")

    // Muda o ícone do botão
    const icon = mobileMenuBtn.querySelector("i")
    if (nav.classList.contains("active")) {
      icon.className = "fas fa-times"
    } else {
      icon.className = "fas fa-bars"
    }
  })

  // Fecha o menu ao clicar em um link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active")
      const icon = mobileMenuBtn.querySelector("i")
      icon.className = "fas fa-bars"
    })
  })

  // ===== SCROLL SUAVE PARA ÂNCORAS =====
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // ===== BOTÕES DO HERO =====
  const heroButtons = document.querySelectorAll(".hero-buttons .btn")
  heroButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.getAttribute("href").startsWith("#")) {
        e.preventDefault()

        const targetId = this.getAttribute("href")
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          const headerHeight = document.querySelector(".header").offsetHeight
          const targetPosition = targetSection.offsetTop - headerHeight

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // ===== HEADER TRANSPARENTE NO SCROLL =====
  const header = document.getElementById("header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.95)"
      header.style.backdropFilter = "blur(10px)"
    } else {
      header.style.background = "white"
      header.style.backdropFilter = "none"
    }
  })

  // ===== FORMULÁRIO DE CONTATO =====
  const contactForm = document.getElementById("contact-form")

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Coleta os dados do formulário
    const formData = new FormData(this)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message"),
    }

    // Simula envio do formulário
    console.log("Dados do formulário:", data)

    // Mostra mensagem de sucesso
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")

    // Limpa o formulário
    this.reset()

    // Aqui você pode integrar com um serviço de email como:
    // - EmailJS
    // - Formspree
    // - Netlify Forms
    // - Ou sua própria API

    // Integração com EmailJS (descomente e configure)
    /*
        function sendEmail(formData) {
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                from_name: formData.name,
                from_email: formData.email,
                company: formData.company,
                message: formData.message
            })
            .then(function(response) {
                console.log('Email enviado com sucesso!', response.status, response.text);
                alert('Mensagem enviada com sucesso!');
            }, function(error) {
                console.log('Erro ao enviar email:', error);
                alert('Erro ao enviar mensagem. Tente novamente.');
            });
        }
        
        sendEmail(data);
        */
  })

  // ===== ANIMAÇÃO DOS CARDS DE SERVIÇO =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observa os cards de serviço
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    observer.observe(card)
  })

  // ===== CONTADOR DE ESTATÍSTICAS =====
  const statNumbers = document.querySelectorAll(".stat-number")

  function animateCounter(element) {
    const target = Number.parseInt(element.textContent)
    const increment = target / 50
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        element.textContent = target + "+"
        clearInterval(timer)
      } else {
        element.textContent = Math.floor(current) + "+"
      }
    }, 40)
  }

  // Observa as estatísticas
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target)
          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  statNumbers.forEach((stat) => {
    statsObserver.observe(stat)
  })

  // ===== ANO ATUAL NO FOOTER =====
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // ===== VALIDAÇÃO DE EMAIL =====
  const emailInputs = document.querySelectorAll('input[type="email"]')

  emailInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      const email = this.value
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (email && !emailRegex.test(email)) {
        this.style.borderColor = "#ef4444"
        this.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.1)"
      } else {
        this.style.borderColor = "#374151"
        this.style.boxShadow = "none"
      }
    })
  })

  // ===== SMOOTH SCROLL PARA NAVEGAÇÃO =====
  // Adiciona classe ativa ao link da seção atual
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]")
    const scrollPos = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        // Remove classe ativa de todos os links
        navLinks.forEach((link) => link.classList.remove("active"))
        // Adiciona classe ativa ao link atual
        if (navLink) {
          navLink.classList.add("active")
        }
      }
    })
  })

  // ===== PRELOADER (OPCIONAL) =====
  // Remove o preloader quando a página carrega
  window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader")
    if (preloader) {
      preloader.style.opacity = "0"
      setTimeout(() => {
        preloader.style.display = "none"
      }, 300)
    }
  })

  console.log("🚀 VPO Tecnologia - Site carregado com sucesso!")
})

// ===== FUNÇÕES UTILITÁRIAS =====

// Função para debounce (otimização de performance)
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Aplica debounce no scroll
const debouncedScroll = debounce(() => {
  // Código de scroll otimizado pode ser adicionado aqui
}, 10)

window.addEventListener("scroll", debouncedScroll)

// ===== ANALYTICS (OPCIONAL) =====
// Função para rastrear eventos
function trackEvent(eventName, eventData) {
  // Google Analytics 4
  const gtag = window.gtag // Declare gtag variable
  if (typeof gtag !== "undefined") {
    gtag("event", eventName, eventData)
  }

  // Facebook Pixel
  const fbq = window.fbq // Declare fbq variable
  if (typeof fbq !== "undefined") {
    fbq("track", eventName, eventData)
  }

  console.log("Event tracked:", eventName, eventData)
}

// Rastreia cliques nos botões
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    trackEvent("button_click", {
      button_text: e.target.textContent.trim(),
      page_location: window.location.href,
    })
  }
})

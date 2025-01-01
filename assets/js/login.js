const { createApp, ref } = Vue;

createApp({
    setup() {
        const isPasswordVisible = ref(false);
        const password = ref('');

        const togglePassword = () => {
            isPasswordVisible.value = !isPasswordVisible.value;
        };

        return {
            isPasswordVisible,
            togglePassword,
            password,
        };
    },
}).mount('#app');

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;
let autoSlideInterval;

// Atualiza os slides e dots
const updateSlides = () => {
    slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === currentSlide);
    });
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
    });

    const offset = -currentSlide * 100;
    document.querySelector(".slides").style.transform = `translateX(${offset}%)`;
};

// Passar para o próximo slide
const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
};

// Voltar para o slide anterior
const prevSlide = () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
};

// Navegar pelos dots
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentSlide = index;
        updateSlides();
        resetAutoSlide(); // Reinicia o temporizador ao clicar em um dot
    });
});

// Inicia o auto slide
const startAutoSlide = () => {
    autoSlideInterval = setInterval(nextSlide, 5000); // Avança a cada 5 segundos
};

// Reinicia o temporizador de auto slide
const resetAutoSlide = () => {
    clearInterval(autoSlideInterval); // Para o temporizador atual
    startAutoSlide(); // Reinicia o temporizador
};

// Adiciona eventos aos botões de controle
document.querySelector(".control.next").addEventListener("click", () => {
    nextSlide();
    resetAutoSlide(); // Reinicia o temporizador ao clicar no botão
});

document.querySelector(".control.prev").addEventListener("click", () => {
    prevSlide();
    resetAutoSlide(); // Reinicia o temporizador ao clicar no botão
});

// Inicializa o slider
updateSlides();
startAutoSlide(); // Começa o auto slide ao carregar a página
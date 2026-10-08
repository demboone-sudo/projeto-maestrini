document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("bg-video");
  const title = document.getElementById("hero-title");
  const bgAudio = document.getElementById("bg-audio");
  const soundToggle = document.getElementById("sound-toggle");
  const soundIcon = document.getElementById("sound-icon");

  let isPlaying = false;

  // Ajusta o volume para um nível ambiente agradável (30%)
  if (bgAudio) {
    bgAudio.volume = 0.3;
  }

  // Função para alternar o áudio entre tocar e pausar
  const toggleAudio = () => {
    if (!bgAudio) return;

    if (isPlaying) {
      bgAudio.pause(); // CORRIGIDO: pause() é o método para pausar o som
      if (soundIcon) soundIcon.textContent = "🔇";
      isPlaying = false;
    } else {
      bgAudio.play()
        .then(() => {
          if (soundIcon) soundIcon.textContent = "🔊";
          isPlaying = true;
        })
        .catch((err) => {
          console.log("Erro ao reproduzir áudio:", err);
        });
    }
  };

  // ADICIONADO: Associa a função ao clique do botão de som
  if (soundToggle) {
    soundToggle.addEventListener("click", toggleAudio);
  }

  // 1. SINCRONIZAÇÃO DO VÍDEO COM A ANIMAÇÃO DO TEXTO
  const startTextAnimation = () => {
    if (title) {
      title.classList.add("video-ready");
    }
  };

  // Se o vídeo já carregou ou veio do cache do navegador
  if (video && video.readyState >= 3) {
    startTextAnimation();
  } else if (video) {
    // Aguarda o disparo real do player (quando os quadros começam a rodar)
    video.addEventListener("playing", startTextAnimation, { once: true });
  }

  // 2. EFEITO DE INCLINAÇÃO 3D COM O MOVIMENTO DO MOUSE (PARALLAX)
  document.addEventListener("mousemove", (e) => {
    if (!title) return;

    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Calcula os graus de rotação baseados na posição do ponteiro na tela
    const rotateX = (clientY / innerHeight - 0.5) * -30; // Rotação vertical
    const rotateY = (clientX / innerWidth - 0.5) * 30;   // Rotação horizontal

    // Aplica a transformação 3D no container do título usando Crases (` `)
    title.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    title.style.transition = "transform 0.1s ease-out";
  });

  // Reseta suavemente o título para o centro quando o mouse sai da janela
  document.addEventListener("mouseleave", () => {
    if (!title) return;
    title.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    title.style.transition = "transform 0.5s ease-out";
  });
});

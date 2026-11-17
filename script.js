document.addEventListener("DOMContentLoaded", () => {
  // العناصر الأساسية
  const screenEnvelope = document.getElementById("screen-envelope");
  const envelopeBox = document.getElementById("envelope-box");
  const passwordInput = document.getElementById("password-input");
  const unlockBtn = document.getElementById("unlock-btn");
  const errorMsg = document.getElementById("error-msg");

  const flowerTransition = document.getElementById("flower-transition");
  const flowerBurst = document.getElementById("flower-burst");

  const screenIntro = document.getElementById("screen-intro");
  const typewriterText = document.getElementById("typewriter-text");
  const introNextBtn = document.getElementById("intro-next-btn");

  const screenMain = document.getElementById("screen-main");
  const memoriesSection = document.getElementById("memories-section");
  const memoriesList = document.getElementById("memories-list");
  const showMessageBtn = document.getElementById("show-message-btn");
  const finalMessageSection = document.getElementById("final-message-section");
  const finalCardLines = document.getElementById("final-card-lines");
  const backMemoriesBtn = document.getElementById("back-memories-btn");

  const musicPlayerBar = document.getElementById("music-player-bar");
  const quickPreviewAddBtn = document.getElementById("quick-preview-add-btn");
  const quickImageInput = document.getElementById("quick-image-input");

  // تطبيق النصوص من config.js
  document.getElementById("env-top-label").textContent = SITE_CONFIG.envelopeTopLabel;
  document.getElementById("env-title").textContent = SITE_CONFIG.envelopeTitle;
  document.getElementById("env-hint").textContent = SITE_CONFIG.envelopeHint;
  unlockBtn.textContent = SITE_CONFIG.envelopeButtonText;
  document.getElementById("wax-avatar").src = SITE_CONFIG.heroCoverImage;

  document.getElementById("intro-emoji").textContent = SITE_CONFIG.introEmoji;
  introNextBtn.textContent = SITE_CONFIG.introNextButton;

  document.getElementById("hero-bg").style.backgroundImage = `url('${SITE_CONFIG.heroCoverImage}')`;
  document.getElementById("hero-title").textContent = SITE_CONFIG.heroTitle;
  document.getElementById("counter-title").textContent = SITE_CONFIG.counterSectionTitle;
  document.getElementById("since-date-text").textContent = SITE_CONFIG.startDateDisplayText;
  document.getElementById("counter-sub-text").textContent = SITE_CONFIG.counterFooterText;

  showMessageBtn.textContent = SITE_CONFIG.finalMessageButton;
  backMemoriesBtn.textContent = SITE_CONFIG.backToMemoriesButton;
  document.getElementById("footer-signature").textContent = SITE_CONFIG.footerSignature;

  // ---------------------------------------------------------
  // 1. القلوب المتطايرة في الخلفية
  // ---------------------------------------------------------
  const heartsContainer = document.getElementById("floating-hearts-container");
  const heartSymbols = ["🤎", "🤍", "❤️", "💕"];
  setInterval(() => {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (14 + Math.random() * 14) + "px";
    const duration = 6 + Math.random() * 6;
    heart.style.animationDuration = duration + "s";
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
  }, 650);

  // ---------------------------------------------------------
  // 2. التحقق من كلمة السر وفتح الظرف
  // ---------------------------------------------------------
  function handleUnlock() {
    const entered = passwordInput.value.trim().toLowerCase();
    const expected = SITE_CONFIG.password.trim().toLowerCase();

    if (entered === expected) {
      errorMsg.textContent = "";
      envelopeBox.classList.add("open");

      // إظهار انتقال الورود بعد فتح الظرف
      setTimeout(() => {
        triggerFlowerTransition();
      }, 650);

      setTimeout(() => {
        screenEnvelope.classList.add("hidden");
        screenIntro.classList.remove("hidden");
        musicPlayerBar.classList.remove("hidden");
        startMusicPlayer();
        startIntroPage(0);
      }, 1750);
    } else {
      errorMsg.textContent = SITE_CONFIG.envelopeErrorText;
      envelopeBox.classList.remove("shake");
      void envelopeBox.offsetWidth; // reset animation
      envelopeBox.classList.add("shake");
    }
  }

  unlockBtn.addEventListener("click", handleUnlock);
  passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleUnlock();
  });

  function triggerFlowerTransition() {
    flowerTransition.classList.remove("hidden");
    flowerBurst.innerHTML = "";
    const flowers = ["🌸", "🌺", "🌷", "🌹", "💐"];
    for (let i = 0; i < 28; i++) {
      const span = document.createElement("span");
      span.className = "petal-item";
      span.textContent = flowers[i % flowers.length];
      span.style.left = Math.random() * 90 + "%";
      span.style.top = Math.random() * 90 + "%";
      span.style.animationDelay = (Math.random() * 0.45) + "s";
      flowerBurst.appendChild(span);
    }
    setTimeout(() => {
      flowerTransition.classList.add("hidden");
    }, 1900);
  }

  // ---------------------------------------------------------
  // 3. تأثير الكتابة التلقائية في شاشة المقدمة
  // ---------------------------------------------------------
  let typingTimer = null;
  let isTyping = false;
  let currentText = "";

  // الرسائل: لو كتبت introMessages (مجموعة) في config.js بيعرضهم واحدة ورا التانية
  // ولو لسه عندك introMessage القديمة (رسالة واحدة) هتشتغل عادي
  const introPages = Array.isArray(SITE_CONFIG.introMessages)
    ? SITE_CONFIG.introMessages
    : [SITE_CONFIG.introMessage];
  let introPageIdx = 0;

  function startIntroPage(i) {
    introPageIdx = i;
    startTypewriter(introPages[i]);
    // آخر رسالة بيتغير شكل الزرار لـ introFinalButton لو كتبته في config
    const isLast = i === introPages.length - 1;
    introNextBtn.textContent = (isLast && SITE_CONFIG.introFinalButton) || SITE_CONFIG.introNextButton;
  }

  function startTypewriter(text) {
    currentText = text;
    typewriterText.textContent = "";
    // الرسالة الطويلة (القصيدة) خط أصغر وكتابة أسرع، والسطور الفاضية بتتحترم
    const isLong = text.length > 200;
    typewriterText.style.whiteSpace = "pre-line";
    typewriterText.style.fontSize = isLong ? "15px" : "";
    typewriterText.style.lineHeight = isLong ? "2" : "";
    let idx = 0;
    isTyping = true;
    clearInterval(typingTimer);
    typingTimer = setInterval(() => {
      if (idx < text.length) {
        typewriterText.textContent += text.charAt(idx);
        idx++;
      } else {
        clearInterval(typingTimer);
        isTyping = false;
      }
    }, isLong ? 22 : 48);
  }

  introNextBtn.addEventListener("click", () => {
    // لو الكتابة لسه شغالة: الدوسة الأولى بتكمّل الرسالة فورًا
    if (isTyping) {
      clearInterval(typingTimer);
      typewriterText.textContent = currentText;
      isTyping = false;
      return;
    }
    // لو فيه رسالة تانية: اعرضها
    if (introPageIdx < introPages.length - 1) {
      startIntroPage(introPageIdx + 1);
      return;
    }
    // آخر رسالة: افتح الصفحة الرئيسية
    screenIntro.classList.add("hidden");
    screenMain.classList.remove("hidden");
    quickPreviewAddBtn.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
    revealVisibleCards();
  });

  // ---------------------------------------------------------
  // 4. عداد الوقت المباشر
  // ---------------------------------------------------------
  const startTimestamp = new Date(SITE_CONFIG.startDate).getTime();

  function updateCounter() {
    const now = Date.now();
    let diff = Math.max(0, now - startTimestamp);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    const seconds = Math.floor(diff / 1000);

    document.getElementById("t-days").textContent = String(days).padStart(2, "0");
    document.getElementById("t-hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("t-minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("t-seconds").textContent = String(seconds).padStart(2, "0");
  }
  updateCounter();
  setInterval(updateCounter, 1000);

  // ---------------------------------------------------------
  // 5. بناء كروت الصور والذكريات ديناميكياً (يدعم أي عدد صور!)
  // ---------------------------------------------------------
  function renderMemories() {
    memoriesList.innerHTML = "";
    SITE_CONFIG.memories.forEach((item) => {
      const card = document.createElement("article");
      card.className = "memory-card";

      let headerHTML = "";
      if (item.topTitle || item.dateBadge) {
        headerHTML += `<div class="memory-header">`;
        if (item.topTitle) {
          headerHTML += `<h3 class="memory-top-title">${item.topTitle}</h3>`;
        }
        if (item.dateBadge) {
          headerHTML += `<span class="memory-date-pill">${item.dateBadge}</span>`;
        }
        headerHTML += `</div>`;
      }

      const imgHTML = `
        <div class="memory-img-wrap">
          <img src="${item.image}" alt="Memory" loading="lazy" />
        </div>
      `;

      const captionHTML = item.caption
        ? `<p class="memory-caption">${item.caption}</p>`
        : "";

      card.innerHTML = headerHTML + imgHTML + captionHTML;
      memoriesList.appendChild(card);
    });
    revealVisibleCards();
  }

  function revealVisibleCards() {
    const cards = document.querySelectorAll(".memory-card");
    const triggerBottom = window.innerHeight * 0.92;
    cards.forEach((card) => {
      const top = card.getBoundingClientRect().top;
      if (top < triggerBottom) {
        card.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealVisibleCards);
  renderMemories();

  // ميزة إضافة صور من جهازك فوراً للمعاينة السريعة
  quickPreviewAddBtn.addEventListener("click", () => {
    quickImageInput.click();
  });

  quickImageInput.addEventListener("change", (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    files.forEach((file) => {
      const url = URL.createObjectURL(file);
      SITE_CONFIG.memories.push({
        image: url,
        caption: "ذكرى جديدة مع بعض ❤️"
      });
    });
    renderMemories();
    // التمرير لآخر صورة أضيفت
    setTimeout(() => {
      memoriesList.lastElementChild?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  });

  // ---------------------------------------------------------
  // 6. التنقل بين الصور والرسالة النهائية
  // ---------------------------------------------------------
  showMessageBtn.addEventListener("click", () => {
    memoriesSection.classList.add("hidden");
    finalMessageSection.classList.remove("hidden");
    finalCardLines.innerHTML = "";

    SITE_CONFIG.finalMessageLines.forEach((line, index) => {
      const p = document.createElement("p");
      p.className = "final-line";
      p.style.animationDelay = (index * 0.45) + "s";
      p.textContent = line;
      finalCardLines.appendChild(p);
    });

    finalMessageSection.scrollIntoView({ behavior: "smooth" });
  });

  backMemoriesBtn.addEventListener("click", () => {
    finalMessageSection.classList.add("hidden");
    memoriesSection.classList.remove("hidden");
    memoriesSection.scrollIntoView({ behavior: "smooth" });
  });

  // ---------------------------------------------------------
  // 7. مشغل الموسيقى التفاعلي
  // ---------------------------------------------------------
  const audioEl = document.getElementById("audio-element");
  const playPauseBtn = document.getElementById("play-pause-btn");
  const prevSongBtn = document.getElementById("prev-song-btn");
  const nextSongBtn = document.getElementById("next-song-btn");
  const songTitleEl = document.getElementById("song-title");
  const songIndexEl = document.getElementById("song-index");
  const playerCoverEl = document.getElementById("player-cover");
  const progressFill = document.getElementById("progress-fill");
  const progressWrapper = document.getElementById("progress-wrapper");
  const currentTimeEl = document.getElementById("current-time");
  const totalTimeEl = document.getElementById("total-time");

  let currentTrackIdx = 0;
  let isPlaying = false;
  let useSimulatedTimer = false;
  let simElapsed = 0;
  let simInterval = null;

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  function loadTrack(index) {
    const track = SITE_CONFIG.playlist[index];
    if (!track) return;

    songTitleEl.textContent = track.title;
    songIndexEl.textContent = `${index + 1}/${SITE_CONFIG.playlist.length}`;
    playerCoverEl.src = track.cover || SITE_CONFIG.heroCoverImage;
    progressFill.style.width = "0%";
    currentTimeEl.textContent = "0:00";
    totalTimeEl.textContent = formatTime(track.fallbackDuration || 36);

    simElapsed = 0;
    useSimulatedTimer = false;
    audioEl.src = track.src;
  }

  function startMusicPlayer() {
    loadTrack(currentTrackIdx);
    playCurrent();
  }

  function playCurrent() {
    isPlaying = true;
    playPauseBtn.textContent = "⏸";
    playerCoverEl.classList.add("spinning");

    const playPromise = audioEl.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // لو ملف الـ mp3 مش مضاف لسه، نشغل عداد تفاعلي بدون أخطاء
        useSimulatedTimer = true;
        startSimulatedProgress();
      });
    }
  }

  function pauseCurrent() {
    isPlaying = false;
    playPauseBtn.textContent = "▶";
    playerCoverEl.classList.remove("spinning");
    audioEl.pause();
    clearInterval(simInterval);
  }

  function startSimulatedProgress() {
    clearInterval(simInterval);
    const track = SITE_CONFIG.playlist[currentTrackIdx];
    const dur = track.fallbackDuration || 36;
    simInterval = setInterval(() => {
      if (!isPlaying) return;
      simElapsed++;
      if (simElapsed >= dur) {
        nextTrack();
        return;
      }
      currentTimeEl.textContent = formatTime(simElapsed);
      progressFill.style.width = ((simElapsed / dur) * 100) + "%";
    }, 1000);
  }

  function nextTrack() {
    currentTrackIdx = (currentTrackIdx + 1) % SITE_CONFIG.playlist.length;
    loadTrack(currentTrackIdx);
    if (isPlaying) playCurrent();
  }

  function prevTrack() {
    currentTrackIdx = (currentTrackIdx - 1 + SITE_CONFIG.playlist.length) % SITE_CONFIG.playlist.length;
    loadTrack(currentTrackIdx);
    if (isPlaying) playCurrent();
  }

  playPauseBtn.addEventListener("click", () => {
    if (isPlaying) pauseCurrent();
    else playCurrent();
  });

  nextSongBtn.addEventListener("click", nextTrack);
  prevSongBtn.addEventListener("click", prevTrack);

  audioEl.addEventListener("timeupdate", () => {
    if (useSimulatedTimer || !audioEl.duration) return;
    currentTimeEl.textContent = formatTime(audioEl.currentTime);
    totalTimeEl.textContent = formatTime(audioEl.duration);
    progressFill.style.width = ((audioEl.currentTime / audioEl.duration) * 100) + "%";
  });

  audioEl.addEventListener("ended", nextTrack);

  progressWrapper.addEventListener("click", (e) => {
    const rect = progressWrapper.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    if (!useSimulatedTimer && audioEl.duration) {
      audioEl.currentTime = ratio * audioEl.duration;
    } else {
      const dur = SITE_CONFIG.playlist[currentTrackIdx].fallbackDuration || 36;
      simElapsed = Math.floor(ratio * dur);
      currentTimeEl.textContent = formatTime(simElapsed);
      progressFill.style.width = (ratio * 100) + "%";
    }
  });
});

// =========================================================================
// ملف الإعدادات السهل (عدّل البيانات هنا براحتك بدون ما تلمس باقي الأكواد!)
// =========================================================================

const SITE_CONFIG = {
  // 1. كلمة السر لفتح الظرف
  password: "love",

  // 2. بيانات الظرف في البداية
  envelopeTopLabel: "LOVE",
  envelopeTitle: "my everything ❤️",
  envelopeHint: "ENTER THE SECRET WORD",
  envelopeButtonText: "💞 Unlock 💞",
  envelopeErrorText: "كلمة السر غلط يا قلبي، جربي تاني ❤️",

  // 3. رسالة المقدمة (الكتابة التلقائية بعد فتح الظرف)
  introEmoji: "😍",
  introMessage: "حبيت اعمل هديه جديده وعايزين نملاه صورنا بقا بس قبل اي حاجه عايز تعرفي اني بحبك وربنا يخليكي ليا يقلبيي ويلا بقا انبهري 😂❤️",
  introNextButton: "next →",

  // 4. قسم الغلاف وبداية العداد
  heroTitle: "بحبك 💕",
  heroCoverImage: "cover.jpg", // صورة الخلفية الكبيرة في البداية
  counterSectionTitle: "بدايتنا 💞",
  // صيغة التاريخ: السنة-الشهر-اليومTالساعة:الدقيقة:الثانية
  startDate: "2025-10-03T00:00:00",
  startDateDisplayText: "💖 سوا من 03-10-2025 💖",
  counterFooterText: "❤️ كل ثانية بتعدي وانتِ في قلبي",

  // 5. قسم الذكريات والصور (تقدر تضيف أي عدد صور عاوزه هنا!)
  // انسخ أي بلوك من { ... }, وضيفه تحت عشان تزود صور أكتر براحتك
  memories: [
    {
      topTitle: "يوم ما قولتلك بحبك ❤️",
      dateBadge: "📅 2026-04-23",
      image: "photo1.jpg",
      caption: "بحبك"
    },
    {
      image: "photo2.jpg",
      caption: "❤️"
    },
    {
      image: "photo3.jpg",
      caption: "ربنا يخليكي ليا"
    },
    {
      image: "photo4.jpg",
      caption: "بحبك"
    },
    {
      image: "photo5.jpg",
      caption: "ايدي ف ايدك "
    },
    {
      image: "photo6.jpg",
      caption: " ❤️ "
    }
  ],

  // 6. الرسالة النهائية (تظهر لما تدوس على زرار message)
  finalMessageButton: "❤️ message ❤️",
  backToMemoriesButton: "🔄 memories",
  finalMessageLines: [
    "بحبك اوي",
    "ربنا يخليكي ليا",
    "وعايزين بقا نملاه صور كتير متنسيس 😂"
  ],
  footerSignature: "💗 Lovely 💗",

  // 7. قائمة الأغاني (حط ملفات mp3 في نفس الفولدر واكتب أسماءها هنا)
  // ملحوظة: لو مفيش ملفات صوت لسه، المشغل هيشتغل بشكل تفاعلي جميل برضه
  playlist: [
    {
      title: "وانت معايا 😍",
      artist: "أغنيتنا",
      src: "song1.mp3",
      cover: "cover.jpg",
      fallbackDuration: 36 // بالثواني في حالة عدم وجود ملف mp3
    },
    {
      title: "على حبك ❤️",
      artist: "أغنيتنا",
      src: "song2.mp3",
      cover: "photo1.jpg",
      fallbackDuration: 41
    }
  ]
};

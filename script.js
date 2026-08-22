  // ============================================================
  // 一般網站互動邏輯(非練習用 bug,可正常維護/修改)
  // ============================================================

  // 行動版導覽選單開關
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? '關閉選單' : '開啟選單');
    });
    // 點擊連結後自動收合選單(行動版)
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', '開啟選單');
      });
    });
  }

  // ============================================================
  // 測試用:以下程式碼刻意埋了幾個 bug,供 Loom bug report 錄製練習
  // 目標:Console 面板會出現 Info / Warning / Error 三種訊息
  // ============================================================

  // [INFO] 頁面初始化紀錄(正常訊息,不需要修)
  console.info('[Loomdemo] App initialized — version 1.0.0');
  console.info('[Loomdemo] Analytics session started for anonymous user');

  // BUG #1 [WARNING]:使用了已棄用的設定參數
  const config = { autoplay: true, legacyPlayerMode: true };
  if (config.legacyPlayerMode) {
    console.warn('[Loomdemo] "legacyPlayerMode" is deprecated and will be removed in v2.0. Use "playerMode: \'modern\'" instead.');
  }

  // BUG #2 [WARNING]:讀取 localStorage 的偏好設定時,key 名稱拼錯了
  const theme = localStorage.getItem('user-thme'); // 正確應為 'user-theme'
  if (theme === null) {
    console.warn('[Loomdemo] User theme preference not found, falling back to default theme.');
  }

  // BUG #3 [ERROR]:呼叫了一個不存在的 API 端點,fetch 會失敗
  fetch('/api/videos/featured')
    .then(res => {
      if (!res.ok) throw new Error(`API responded with status ${res.status}`);
      return res.json();
    })
    .then(data => console.info('[Loomdemo] Featured videos loaded:', data))
    .catch(err => console.error('[Loomdemo] Failed to load featured videos:', err.message));

  // BUG #5 [ERROR]:點擊播放按鈕時,存取了不存在的 DOM 元素造成 TypeError
  function handlePlayButtonActivate() {
    console.info('[Loomdemo] Play button clicked');
    const player = document.getElementById('video-player'); // 這個元素不存在 → null
    player.play(); // TypeError: Cannot read properties of null (reading 'play')
  }
  const heroPlayBtn = document.getElementById('heroPlayBtn');
  heroPlayBtn.addEventListener('click', handlePlayButtonActivate);
  // 讓 role="button" 的自訂按鈕也能用鍵盤(Enter / Space)觸發,維持無障礙可操作性
  heroPlayBtn.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handlePlayButtonActivate();
    }
  });

  // BUG #6 [ERROR]:頁面載入 3 秒後,呼叫一個未定義的函式
  setTimeout(() => {
    try {
      trackPageView('/landing'); // trackPageView 從未被定義 → ReferenceError
    } catch (err) {
      console.error('[Loomdemo] Analytics error:', err.message);
    }
  }, 3000);

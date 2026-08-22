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
  document.getElementById('heroPlayBtn').addEventListener('click', () => {
    console.info('[Loomdemo] Play button clicked');
    const player = document.getElementById('video-player'); // 這個元素不存在 → null
    player.play(); // TypeError: Cannot read properties of null (reading 'play')
  });

  // BUG #6 [ERROR]:頁面載入 3 秒後,呼叫一個未定義的函式
  setTimeout(() => {
    try {
      trackPageView('/landing'); // trackPageView 從未被定義 → ReferenceError
    } catch (err) {
      console.error('[Loomdemo] Analytics error:', err.message);
    }
  }, 3000);

# Loomdemo

一個單頁靜態網站，模擬 Loom 的行銷首頁，部署在 GitHub Pages 上。

僅供示範用途：這個網站**故意**在 `script.js` 中埋了幾個 bug，
用來練習如何用 Loom 錄製並撰寫 bug report。請勿在一般的修改或
重構中「順手修掉」這些 bug，除非該次任務就是要修它們。

## 本機預覽

這是純靜態網站，不需要建置流程。任選一種方式即可：

```bash
# 方式一：直接用瀏覽器開啟
open index.html

# 方式二：起一個簡單的本機伺服器
python3 -m http.server 8080
# 然後瀏覽 http://localhost:8080
```

## 專案結構

- `index.html` — 頁面內容與結構
- `styles.css` — 樣式
- `script.js` — 頁面互動邏輯,包含:
  - 一般網站邏輯(行動版導覽選單開關、播放按鈕鍵盤操作)
  - 下方刻意埋入的 6 個 bug(見下表)
- `.github/workflows/deploy.yml` — 推送到 `main` 分支後自動部署到 GitHub Pages

## 刻意埋入的 Bug 清單

| # | 類型 | 說明 |
|---|------|------|
| 1 | Warning | 使用了已棄用的設定參數 `legacyPlayerMode` |
| 2 | Warning | 讀取 localStorage 偏好設定時 key 名稱拼錯（`user-thme`） |
| 3 | Error | 呼叫了不存在的 API 端點 `/api/videos/featured` |
| 4 | Error（Network） | 圖片 `assets/demo-thumbnail.png` 不存在，載入失敗 |
| 5 | Error | 點擊播放按鈕時存取不存在的 DOM 元素，造成 TypeError |
| 6 | Error | 頁面載入 3 秒後呼叫未定義的函式 `trackPageView`，造成 ReferenceError |

打開瀏覽器開發者工具的 Console 面板，即可觀察到以上 Info / Warning / Error 訊息。

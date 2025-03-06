// 目次を自動生成する関数
document.addEventListener("DOMContentLoaded", function () {
  // 目次を表示する要素を作成
  const tocContainer = document.createElement("div");
  tocContainer.id = "ruffruff-table-of-contents";
  tocContainer.className = "toc-container";

  const tocTitle = document.createElement("h4");
  tocTitle.textContent = "目次";
  tocContainer.appendChild(tocTitle);

  const tocList = document.createElement("ul");
  tocList.className = "toc-list";

  // 記事コンテンツを取得
  const contentDiv = document.querySelector(".article-template__content");
  if (!contentDiv) return;

  // h2とh3要素を取得
  const headings = contentDiv.querySelectorAll("h2, h3");
  if (headings.length === 0) return;

  // 各見出しに対して処理
  headings.forEach((heading, index) => {
    // 見出しのテキストを取得
    const headingText = heading.textContent.trim();

    // IDを作成（日本語を含む場合に対応するため、インデックスも追加）
    const headingId =
      headingText.replace(/\s+/g, "-").replace(/[^\w\-]/g, "") + "-" + index;

    // 見出しにIDを設定
    heading.id = headingId;

    // 目次アイテムを作成
    const listItem = document.createElement("li");
    listItem.className =
      heading.tagName.toLowerCase() === "h3"
        ? "toc-item toc-item-h3"
        : "toc-item";

    const link = document.createElement("a");
    link.href = "#" + headingId;
    link.textContent = headingText;

    listItem.appendChild(link);
    tocList.appendChild(listItem);
  });

  tocContainer.appendChild(tocList);

  // 目次を記事の先頭に挿入
  const firstHeading = contentDiv.querySelector("h2, h3, p");
  if (firstHeading) {
    contentDiv.insertBefore(tocContainer, firstHeading);
  } else {
    contentDiv.appendChild(tocContainer);
  }

  // 目次のスタイルを追加
  const style = document.createElement("style");
  style.textContent = `
      .toc-container {
        margin: 2rem 0;
        padding: 1.5rem;
        background-color: #f8f8f8;
        border-radius: 5px;
        border-left: 5px solid #0A1E27;
      }
      
      .toc-container h4 {
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.2rem;
        color: #0A1E27;
      }
      
      .toc-list {
        margin: 0;
        padding-left: 1.5rem;
      }
      
      .toc-item {
        margin-bottom: 0.5rem;
      }
      
      .toc-item-h3 {
        margin-left: 1.5rem;
        font-size: 0.95em;
      }
      
      .toc-item a {
        color: #333;
        text-decoration: none;
        transition: color 0.3s;
      }
      
      .toc-item a:hover {
        color: #0A1E27;
        text-decoration: underline;
      }
    `;
  document.head.appendChild(style);
});

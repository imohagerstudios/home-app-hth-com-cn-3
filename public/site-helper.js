/**
 * public/site-helper.js
 * 生成页面提示卡片、关键词徽章和访问说明，不依赖第三方库。
 */

(function () {
  'use strict';

  // 配置数据
  const config = {
    siteUrl: 'https://home-app-hth.com.cn',
    keyword: '华体会',
    infoTitle: '页面提示',
    badgeLabel: '关键词',
    visitHint: '如需访问完整内容，请前往官方网站。'
  };

  // 创建样式（内联注入）
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .helper-card {
        background: #f9f9fb;
        border: 1px solid #e0e0e0;
        border-radius: 12px;
        padding: 20px 24px;
        margin: 20px auto;
        max-width: 520px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        font-family: system-ui, -apple-system, sans-serif;
        color: #1e1e2f;
      }
      .helper-card h3 {
        margin: 0 0 12px 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #2a2a3b;
      }
      .helper-card p {
        margin: 8px 0;
        line-height: 1.5;
      }
      .keyword-badge {
        display: inline-block;
        background: #3b82f6;
        color: #ffffff;
        font-size: 0.8rem;
        font-weight: 500;
        padding: 4px 12px;
        border-radius: 20px;
        letter-spacing: 0.3px;
      }
      .visit-link {
        display: inline-block;
        margin-top: 10px;
        color: #2563eb;
        text-decoration: none;
        font-weight: 500;
        border-bottom: 1px dashed #a0c4ff;
      }
      .visit-link:hover {
        color: #1d4ed8;
        border-bottom-style: solid;
      }
    `;
    document.head.appendChild(style);
  }

  // 构建卡片 HTML
  function buildCard() {
    const card = document.createElement('div');
    card.className = 'helper-card';

    const title = document.createElement('h3');
    title.textContent = config.infoTitle;
    card.appendChild(title);

    const badgeSpan = document.createElement('span');
    badgeSpan.className = 'keyword-badge';
    badgeSpan.textContent = config.keyword;
    card.appendChild(badgeSpan);

    const hintPara = document.createElement('p');
    hintPara.textContent = config.visitHint;
    card.appendChild(hintPara);

    const link = document.createElement('a');
    link.href = config.siteUrl;
    link.className = 'visit-link';
    link.textContent = '进入 ' + config.siteUrl.replace(/^https?:\/\//, '');
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    card.appendChild(link);

    return card;
  }

  // 将卡片插入页面合适位置
  function insertHelper() {
    const existing = document.querySelector('.helper-card');
    if (existing) return;

    const container = document.querySelector('#main') ||
                      document.querySelector('main') ||
                      document.querySelector('.content') ||
                      document.body;
    const card = buildCard();
    // 尝试插入到容器第一个子元素之前
    const firstChild = container.firstChild;
    if (firstChild) {
      container.insertBefore(card, firstChild);
    } else {
      container.appendChild(card);
    }
  }

  // 初始化
  function init() {
    injectStyles();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', insertHelper);
    } else {
      insertHelper();
    }
  }

  init();
})();
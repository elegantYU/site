---
title: 'æå°domð²'
date: 2021-08-04 11:17:14
template: post
categories:
  - ç®æ³
tags:
  - DFS && BFS
slug: algorithm-printDomTree
thumbnail: ../cover/wallhaven-nkl710.jpg
excerpt: å¥½åæå¨åé¢è¯é¢ï¼æ¯è°æä¸è¯´~
pwd:
---

## é¢ç®

é¡µé¢æå¦ä¸ dom æ ç­¾ï¼å¦ä½æç§ç»æè¾åºä»¥ä¸æåçæ ç­¾å

```js
dom:

<header>
  <logo />
  <nav>
    <ul>
      <li />
      <li />
      <li />
    </ul>
  </nav>
</header>
<aside />
<section>
  <article>
    <div></div>
  </article>
</section>

è¾åº:
header
logo
nav
ul
li
li
li
aside
section
article
div
```

## æè

æ ¹æ® dom ç»æåæå°é¡ºåºï¼å¯ä»¥çå°æ¯æ·±åº¦ä¼åéå DFS (deep first search)

è·åæ ç­¾ååè¾åºï¼ä»£ç å¦ä¸

```js
function DFStree(root = document.body) {
  const children = Array.from(root.children);

  if (children.length) {
    for (let i = 0; i < children.length; i++) {
      const el = children[i];
      console.log(el.tagName);
      DFStree(el);
    }
  }

  return;
}
```

> easy

å¦æè¾åºé¡ºåºæ¹ä¸ä¸å¢

```js
header;
aside;
section;
logo;
nav;
article;
ul;
div;
li;
```

å³ BFS å¹¿åº¦ä¼åéåï¼howï¼

å©ç¨éåææ³ï¼å°åå± dom æå°æ¶ï¼å¤æ­å¶æ¯å¦æ childrenï¼è¥æåå å¥éåï¼ç­å¾ä¸æ¬¡æå°

```js
function BFStree(root = document.body) {
  const list = [];
  const children = Array.from(root.children);

  children.map((v) => list.push(v));

  let idx = 0;
  while (idx < list.length) {
    const el = list[idx];
    const { tagName, className } = el;
    console.log(`${tagName} --- ${className}`);

    if (el.children.length) {
      list.push(...Array.from(el.children));
    }

    idx++;
  }
}
```

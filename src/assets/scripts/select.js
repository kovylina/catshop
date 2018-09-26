function onFeedClick(e) {
  e.preventDefault();

  const feedItem = this.parentNode;
  // Текст под карточкой заказа
  const textOrder = feedItem.querySelector(".feed-list__order");
  const orderComment = feedItem.querySelector(".feed-list__comment");

  // Если элемент доступен для выбора - выберем его\снимем выбор
  if (!feedItem.classList.contains("feed-list__item--ended")) {
    feedItem.classList.toggle("feed-list__item--selected");
    textOrder.classList.toggle("feed-list__order--hidden");
    orderComment.classList.toggle("feed-list__comment--hidden");
  }
}

function onOrderLinkClick(e) {
  e.preventDefault();

  const linkItem = this;
  // Текст под карточкой заказа
  const feedOrder = linkItem.parentNode;
  const feedListItem = feedOrder.parentNode;
  const feedComment = feedListItem.querySelector(".feed-list__comment");

  // Если элемент выбран, то не обрабатываем клик
  if (feedListItem.classList.contains("feed-list__item--selected")) return;

  // Если элемент доступен для выбора - выберем его\снимем выбор
  if (!feedListItem.classList.contains("feed-list__item--ended")) {
    feedListItem.classList.toggle("feed-list__item--selected");
    feedOrder.classList.toggle("feed-list__order--hidden");
    feedComment.classList.toggle("feed-list__comment--hidden");
  }
}

function init(e) {
  // Найдем все товары на странице
  const feeds = document.querySelectorAll(".feed");

  const orderLinks = document.querySelectorAll(".feed-list__order-link");

  // На товар навесим обработчик события по клику
  for (let i = 0; i < feeds.length; i++) {
    feeds[i].onclick = onFeedClick;
  }

  for (let j = 0; j < orderLinks.length; j++) {
    orderLinks[j].onclick = onOrderLinkClick;
  }
}

window.addEventListener("load", init);

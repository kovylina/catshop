function onFeedClick(e) {
  e.preventDefault();

  const feedItem = this;
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

function init(e) {
  // Найдем все товары на странице
  const feeds = document.querySelectorAll(".feed-list__item");

  // На товар навесим обработчик события по клику
  for (let i = 0; i < feeds.length; i++) {
    feeds[i].onclick = onFeedClick;
  }
}

window.addEventListener("load", init);

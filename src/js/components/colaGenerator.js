class ColaGenerator {
  constructor() {
    this.itemList = document.querySelector(".list-item");
  }

  async setup() {
    await this.loadData((json) => {
      this.colaFactory(json);
    });
  }

  async loadData(callback) {
    const response = await fetch("./src/js/item.json");

    if (response.ok) {
      callback(await response.json());
    } else {
      alert("통신 에러입니다." + response.status);
    }
  }

  colaFactory(data) {
    const docFrag = document.createDocumentFragment();
    data.forEach((el) => {
      const item = document.createElement("li");
      const itemTemplate = `
        <button type="button" class="btn-item" data-item="${el.name}" data-count="${el.count}" data-price="${el.cost}" data-img="${el.img}">
                <img src="./src/img/${el.img}" alt="" class="img-item"/>
                <strong class="name-cola">${el.name}</strong>
                <span class="price-cola">${el.cost}원</span>
              </button>`;
      item.innerHTML = itemTemplate;
      docFrag.appendChild(item);
    });
    this.itemList.appendChild(docFrag);
  }
}

export default ColaGenerator;

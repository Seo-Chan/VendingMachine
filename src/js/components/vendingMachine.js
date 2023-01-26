class VendingMachine {
  constructor() {
    const buyItem = document.querySelector(".buy-item");
    this.change = buyItem.querySelector(".txt-change");
    this.itemList = buyItem.querySelector(".list-item");
    this.inputCostVal = buyItem.querySelector(".txt-pay");
    this.btnPay = buyItem.querySelector(".btn-pay");
    this.btnChange = buyItem.querySelector(".btn-change");
    this.btnGet = buyItem.querySelector(".btn-get");
    this.selectedList = buyItem.querySelector(".select-list");

    const getList = document.querySelector(".get-list");
    this.budget = getList.querySelector(".txt-budget");
    this.getItemList = getList.querySelector(".get-item-list");
    this.txtTotal = getList.querySelector(".txt-total");
  }

  // 선택한 음료수 목록 생성
  selectedItemGenerator(target) {
    const selectedItem = document.createElement("li");
    selectedItem.dataset.item = target.dataset.item;
    selectedItem.dataset.price = target.dataset.price;
    selectedItem.innerHTML = `<div class="select-cola">
      <img src="/src/img/${target.dataset.img}" alt="" />
      <strong class="select-name">${target.dataset.item}</strong>
    </div>
    <span class="count">1</span>
      `;
    this.selectedList.appendChild(selectedItem);
  }
}

export default Vendingmachine;

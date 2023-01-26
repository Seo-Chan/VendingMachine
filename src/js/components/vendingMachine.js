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
  setup() {
    this.addEvent();
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

  addEvent() {
    // 1. 입금 버튼 기능
    this.btnPay.addEventListener("click", (event) => {
      const inputCost = parseInt(this.inputCostVal.value);
      const budgetVal = parseInt(this.budget.textContent.replaceAll(",", ""));
      const changeVal = parseInt(this.change.textContent.replaceAll(",", ""));

      if (inputCost) {
        if (inputCost <= budgetVal && budgetVal > 0) {
          this.budget.textContent =
            new Intl.NumberFormat().format(budgetVal - inputCost) + " 원";
          this.change.textContent =
            new Intl.NumberFormat().format(
              (changeVal ? changeVal : 0) + inputCost
            ) + " 원";
        } else {
          alert("소지금이 부족합니다.");
        }
        this.inputCostVal.value = null;
      }
    });

    // 2. 거스름돈 반환 버튼 기능
    this.btnChange.addEventListener("click", (event) => {
      const changeVal = palseInt(this.change.textContent.replaceAll(",", ""));
      const budgetVal = parseInt(this.budget.textContent.replaceeAll(",", ""));

      if (changeVal) {
        this.budget.textContent =
          new Intl.NumberFormat().format(changeVal + budgetVal) + " 원";
        this.changeVal.textContent = "원";
      }
    });
  }
}

export default Vendingmachine;

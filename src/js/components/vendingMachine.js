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
      const changeVal = parseInt(this.change.textContent.replaceAll(",", ""));
      const budgetVal = parseInt(this.budget.textContent.replaceAll(",", ""));

      if (changeVal) {
        this.budget.textContent =
          new Intl.NumberFormat().format(changeVal + budgetVal) + " 원";
        this.change.textContent = "원";
      }
    });

    // 3. 자판기 메뉴 기능
    const btnsCola = this.itemList.querySelectorAll("button");

    btnsCola.forEach((item) => {
      item.addEventListener("click", (event) => {
        const targetEl = event.currentTarget;
        const changeVal = parseInt(this.change.textContent.replaceAll(",", ""));
        // 이미 선택되어있는지
        let isSelected = false;
        const targetElPrice = parseInt(targetEl.dataset.price);
        const selectedListItem = this.selectedList.querySelectorAll("li");

        if (changeVal >= targetElPrice) {
          this.change.textContent =
            new Intl.NumberFormat().format(changeVal - targetElPrice) + " 원";

          for (const item of selectedListItem) {
            // 내가 클릭한 상품과 내가 담은 상품이 같을 경우
            if (item.dataset.item === targetEl.dataset.item) {
              item.querySelector(".count").textContent++;
              isSelected = true;
              break;
            }
          }

          // 처음 선택한 아이템일 경우
          if (!isSelected) {
            this.selectedItemGenerator(targetEl);
          }

          targetEl.dataset.count--;
        } else {
          alert("잔액이 부족합니다. 돈을 입금해주세요");
        }
      });
    });

    // 4. 획득 버튼 기능
    this.btnGet.addEventListener("click", (event) => {
      let isGot = false;
      let totalPrice = 0;

      // 내가 고른 음료수 목록과 이미 구입한 목록을 비교
      for (const itemSelected of this.selectedList.querySelectorAll("li")) {
        for (const itemGot of this.getItemList.querySelectorAll("li")) {
          let itemGotCount = itemGot.querySelector(".count");
          if (itemSelected.dataset.item === itemGot.dataset.item) {
            itemGotCount.textContent =
              parseInt(itemGotCount.textContent) +
              parseInt(itemSelected.querySelector(".count").textContent);
            isGot = true;
            break;
          }
        }
        if (!isGot) {
          this.getItemList.appendChild(itemSelected);
        }
      }

      this.selectedList.innerHTML = null;

      this.getItemList.querySelectorAll("li").forEach((itemGot) => {
        totalPrice +=
          itemGot.dataset.price *
          parseInt(itemGot.querySelector(".count").textContent);
      });
      this.txtTotal.textContent = `${new Intl.NumberFormat().format(
        totalPrice
      )}원`;
    });
  }
}

export default VendingMachine;

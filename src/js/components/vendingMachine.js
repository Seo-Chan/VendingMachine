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
}

export default Vendingmachine;

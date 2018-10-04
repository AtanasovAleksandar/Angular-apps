import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CustomersService } from "../../../customers.service";

@Component({
  selector: "app-detail-view",
  templateUrl: "./detail-view.component.html",
  styleUrls: ["./detail-view.component.css"]
})
export class DetailViewComponent implements OnInit {
  customerId;
  DetailUser = {};
  orders = false;
  addNewOrder = { name: "", amount: "", customerId: "" };
  totalamount: any;
  reqFilds: any = { reqName: '', reqAmount: ''}

  constructor(
    public customerService: CustomersService,
    public activatedRout: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRout.params.subscribe(params => {
      console.log(params);
      this.customerId = params.detailCustomer;
      this.getCustomer();
    });
  }

  getCustomer() {
    this.addNewOrder.customerId = this.customerId;
    this.customerService.getCustomerById(this.customerId).subscribe(data => {
      console.log(data["data"]);
      this.DetailUser = data["data"];
      this.totalamount = this.getTotal();
      console.log(this.DetailUser);
    });
  }

  showOrders(value) {
    if (value == "orderss") {
      this.orders = true;
    } else {
      this.orders = false;
    }
  }

  OrderNew() {
    this.customerService.postOrders(this.addNewOrder).subscribe(data => {
      console.log(data["data"].orders);
      this.DetailUser["orders"] = data["data"].orders
      this.totalamount = this.getTotal();
    },
    (error) => {
    console.log(error)
    this.reqFilds.reqName = error.error.errors.name;
    this.reqFilds.reqAmount = error.error.errors.amount;
    }
    );
    this.addNewOrder.name = ''
    this.addNewOrder.amount = ''
  }

  getTotal() {
    let total = 0;
    for (var i = 0; i < this.DetailUser["orders"].length; i++) {
      if (this.DetailUser["orders"][i]["amount"]) {
        total += this.DetailUser["orders"][i]["amount"];
      }
    }
    return total;
  }
}

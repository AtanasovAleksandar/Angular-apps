import { Component, OnInit } from "@angular/core";
import { CustomersService } from "../../../customers.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-new-customer",
  templateUrl: "./new-customer.component.html",
  styleUrls: ["./new-customer.component.css"]
})
export class NewCustomerComponent implements OnInit {
  newCustomer = {
    name: "",
    surname: "",
    email: "",
    city: "",
    address: "",
    state: ""
  };
  requiredFilds: any = {
    reqName: "",
    reqSurName: "",
    reqEmail: "",
    reqCity: "",
    reqAddress: "",
    reqState: ""
  };

  
  constructor(public customerService: CustomersService , public router: Router ) {}

  filteredProducts = [];


  ngOnInit() {}

  writeNewCostumer() {
    this.requiredFilds = {};
  
    this.customerService.addNewCustomer(this.newCustomer).subscribe(
      data => {
        this.router.navigate(['Customers', 1 , 'none' ]);
      },
      error => {
        if (error.error.errors) {
          this.requiredFilds.reqName = error.error.errors.name;
          this.requiredFilds.reqSurName = error.error.errors.surname;
          this.requiredFilds.reqEmail = error.error.errors.email;
          this.requiredFilds.reqCity = error.error.errors.city;
          this.requiredFilds.reqAddress = error.error.errors.address;
          this.requiredFilds.reqState = error.error.errors.state;
        }
      }
    );
    console.log("vtoro");
  }
}

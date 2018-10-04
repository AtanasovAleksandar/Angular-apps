import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomersService } from "../../../customers.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  customerId: string;

  customers = [];
  editCustomers = {name: '' , surname: '', email: '', city: '', address: '', state: '' }
  

  constructor(
    public activatedRout: ActivatedRoute,
    public customerService: CustomersService,
    public router: Router
  ) {}

  ngOnInit() {
    this.activatedRout.params.subscribe(params => {
      console.log(params);
      this.customerId = params.customerId;
      this.editCustomer();
    });
  }

  editCustomer() {
    this.customerService.getCustomerById(this.customerId).subscribe(
      (data) => {
        console.log(data)
        console.log(data['data'])
        this.editCustomers = data["data"];
    });
}

saveEditData() {
    this.customerService.editCustomerData(this.editCustomers).subscribe(
      (data) => {
        console.log(data)
        this.router.navigate(['Customers',1,'none'])
      }
    )
}

deletUser() {
  this.customerService.deletUser(this.customerId).subscribe( 
    (data) => {
      console.log(data)
      this.router.navigate(['Customers', 1 , 'none' ]);
    }
  )
}

navigateBack() {
  this.router.navigate(['Customers', 1 , 'none' ]);
}

}

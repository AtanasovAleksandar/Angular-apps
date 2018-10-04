import { Component, OnInit } from "@angular/core";
import { CustomersService } from "../../customers.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.css"]
})
export class CustomersComponent implements OnInit {
  customers = [];
  currentPage: any;
  activePage;
  pageNext: any;
  nextPage: number = 1;
  pagePrevius;
  previousPage: number;
  searchValue: string = '';
  customersSearch: any = {};
  finalCustomers: any[];
  activeSearch = false;
  paramSearch: any;

  constructor(
    public costumerService: CustomersService,
    public activeRouter: ActivatedRoute,
    public router: Router
  ) {
    this.activeRouter.params.subscribe(params => {
      console.log(params);
      this.activePage = params.activePage;
      this.paramSearch = params.search
      if(params.search!='none')
      this.searchValue=params.search;
      else this.searchValue=''
      this.getActivePageCustomers();
    });
  }

  getActivePageCustomers() {
    this.customers = []
    this.costumerService.getCustomers(this.activePage,this.paramSearch).subscribe(data => {
      console.log(data.data.data);
      this.customers = data.data.data;
      this.currentPage = data.data.current;
      this.pageNext = data.data.next;
      this.pagePrevius = data.data.previous;
    });
  }

  ngOnInit() {
   
  }

  getCustomerPage(active) {
    this.activePage = active;
  }

  goToNextPage() {
    let nextPage=parseInt(this.activePage)+1;
    this.router.navigateByUrl("/Customers/"+nextPage+'/'+ this.paramSearch);
  }

  goToPreviousPage() {
    let previousPage = parseInt(this.activePage)-1
    this.router.navigateByUrl("/Customers/"+previousPage+'/'+ this.paramSearch);
  }

}

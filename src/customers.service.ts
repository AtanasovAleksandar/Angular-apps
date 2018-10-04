import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CustomersService {
  apiUrl = "http://localhost:8080/";
  currentPage: any;

  constructor(private http: HttpClient) {}

  addNewCustomer(newCostumer): Observable<any> {
    return this.http.post(this.apiUrl + "customer", newCostumer);
  }

  getCustomers(page, value): Observable<any> {
    if (value == "none") value = "";
    return this.http.get(
      this.apiUrl + "customers?page=" + page + "&search=" + value
    );
  }

  serchCustomer(page, serch) {
    return this.http.get(
      this.apiUrl + "customers?page=" + page + "&search=" + serch
    );
  }

  getCustomerById(customerId) {
    return this.http.get(this.apiUrl + "customer/" + customerId);
  }

  editCustomerData(newData) {
    return this.http.put(this.apiUrl + "customer", newData);
  }

  postOrders(newOrder) {
    return this.http.post(this.apiUrl + "order", newOrder);
  }

  getOrders() {
    return this.http.get(this.apiUrl + "order");
  }

  deletUser(deletedUser) {
    return this.http.delete(this.apiUrl + "customer/" + deletedUser);
  }
}

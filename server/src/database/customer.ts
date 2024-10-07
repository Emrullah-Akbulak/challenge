import { DbManager } from "./base";
import { db } from "./db";

export interface Customer {
  firstName: string;
  lastName: string;
  domain: string;
  email: string;
}

export class CustomerDbManager implements DbManager<Customer> {
  repository = db["customers"] as Customer[];

  create = async (customer: Customer) => {
    this.repository.push(customer);
    return customer;
  };

  findByDomain = async (domain: string) => {
    return this.repository.find((t) => t.domain === domain);
  };
}

import { CustomerDbManager } from "../database/customer";
import {
  DomainInfoDbManager,
  DomainInfo,
  DomainNamingType,
} from "../database/domain-info";
import { Customer } from "../database/customer";
import { NotFound } from "../domain/error/not-found";
interface GenerateEmailParams {
  firstName: string;
  lastName: string;
  domain: string;
}

export default class EmailGeneratorManager {
  private customerDbManager: CustomerDbManager;
  private domainInfoDbManager: DomainInfoDbManager;

  constructor(
    customerDbManager: CustomerDbManager = new CustomerDbManager(),
    domainInfoDbManager: DomainInfoDbManager = new DomainInfoDbManager()
  ) {
    this.customerDbManager = customerDbManager;
    this.domainInfoDbManager = domainInfoDbManager;
  }

  private generateFromDomainInfo(
    generateParams: GenerateEmailParams,
    domanInfo: DomainInfo
  ) {
    //First and last names does not have to be singular, people can have multiple first names and last names
    //thats why we split and join to get rid of empty spaces in names
    if (domanInfo.type == DomainNamingType.FIRST_LAST) {
      return `${generateParams.firstName.replace(
        /\s+/g,
        ""
      )}${generateParams.lastName.replace(/\s+/g, "")}@${
        generateParams.domain
      }`.toLowerCase();
    }

    return `${generateParams.firstName[0]}${generateParams.lastName.replace(
      /\s+/g,
      ""
    )}@${generateParams.domain}`.toLowerCase();
  }

  private getNamingTypeFromCustomer(customer: Customer) {
    const naming = customer.email.split("@")[0];

    if (naming == `${customer.firstName}${customer.lastName}`.toLowerCase()) {
      return DomainNamingType.FIRST_LAST;
    }

    return DomainNamingType.FIRST_INITIAL_LAST;
  }

  public async generate({
    firstName,
    lastName,
    domain,
  }: GenerateEmailParams): Promise<string> {
    const domainInfo = await this.domainInfoDbManager.findByDomain(domain);

    //Check if we already calculated style for this domain before
    //if we did, fetch the naming type and generate according to that
    if (domainInfo) {
      return this.generateFromDomainInfo(
        { firstName, lastName, domain },
        domainInfo
      );
    }

    const example_customer = await this.customerDbManager.findByDomain(domain);

    //No domain info and customer related to that domain exists, cannot continue anymore throw not found
    //error code 1404 is arbitrary for now but it would normally be tied to a error table for the companies internal errors.
    if (!example_customer) {
      throw new NotFound("Domain is unknown!", 1404);
    }

    //If we have other customers with that domain, just analyze the type of that domain
    const type = this.getNamingTypeFromCustomer(example_customer);

    //Save it to use it later so we do not waste time analyzing it every time
    const result = await this.domainInfoDbManager.create({
      domain: domain,
      type: type,
    });

    return this.generateFromDomainInfo({ firstName, lastName, domain }, result);
  }
}

import EmailGeneratorManager from "../../src/business/email-generator";
import { CustomerDbManager } from "../../src/database/customer";
import { db } from "../../src/database/db";
import {
  DomainInfoDbManager,
  DomainNamingType,
} from "../../src/database/domain-info";
import { NotFound } from "../../src/domain/error/not-found";

describe("generate", () => {
  let customerDbManager: CustomerDbManager;
  let domainInfoDbManager: DomainInfoDbManager;
  let emailGeneratorManager: EmailGeneratorManager;

  beforeEach(() => {
    db["customers"] = [];
    db["domainInfo"] = [];

    customerDbManager = new CustomerDbManager();
    domainInfoDbManager = new DomainInfoDbManager();
    emailGeneratorManager = new EmailGeneratorManager(
      customerDbManager,
      domainInfoDbManager
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create default email generator with default values", async () => {
    emailGeneratorManager = new EmailGeneratorManager();
    expect(emailGeneratorManager).toBeInstanceOf(EmailGeneratorManager);
  });

  it("should throw domain not found error", async () => {
    const mockCustomerFindByDomain = jest.spyOn(
      customerDbManager,
      "findByDomain"
    );

    const mockDomainInfoFindByDomain = jest.spyOn(
      domainInfoDbManager,
      "findByDomain"
    );

    const mockData = {
      firstName: "fName",
      lastName: "lName",
      domain: "test.com",
    };

    await expect(emailGeneratorManager.generate(mockData)).rejects.toThrow(
      NotFound
    );

    expect(mockCustomerFindByDomain).toHaveBeenCalled();
    expect(mockDomainInfoFindByDomain).toHaveBeenCalled();
  });

  it("should use cache from domain info as FIRST_LAST", async () => {
    domainInfoDbManager.create({
      domain: "test.com",
      type: DomainNamingType.FIRST_LAST,
    });

    const mockCustomerFindByDomain = jest.spyOn(
      customerDbManager,
      "findByDomain"
    );
    const mockDomainInfoFindByDomain = jest.spyOn(
      domainInfoDbManager,
      "findByDomain"
    );

    const mockData = {
      firstName: "fName",
      lastName: "lName",
      domain: "test.com",
    };

    await expect(emailGeneratorManager.generate(mockData)).resolves.toBe(
      "fnamelname@test.com"
    );

    expect(mockDomainInfoFindByDomain).toHaveBeenCalled();
    expect(mockCustomerFindByDomain).toHaveBeenCalledTimes(0);
  });

  it("should use cache from domain info as FIRST_INITIAL_LAST", async () => {
    domainInfoDbManager.create({
      domain: "test.com",
      type: DomainNamingType.FIRST_INITIAL_LAST,
    });

    const mockCustomerFindByDomain = jest.spyOn(
      customerDbManager,
      "findByDomain"
    );

    const mockDomainInfoFindByDomain = jest.spyOn(
      domainInfoDbManager,
      "findByDomain"
    );

    const mockData = {
      firstName: "fName",
      lastName: "lName",
      domain: "test.com",
    };

    await expect(emailGeneratorManager.generate(mockData)).resolves.toBe(
      "flname@test.com"
    );

    expect(mockDomainInfoFindByDomain).toHaveBeenCalled();
    expect(mockCustomerFindByDomain).toHaveBeenCalledTimes(0);
  });

  it("should resolve from customer info as FIRST_INITIAL_LAST", async () => {
    customerDbManager.create({
      firstName: "fName",
      lastName: "lName",
      domain: "test.com",
      email: "flname@test.com",
    });

    const mockCustomerFindByDomain = jest.spyOn(
      customerDbManager,
      "findByDomain"
    );
    const mockDomainInfoFindByDomain = jest.spyOn(
      domainInfoDbManager,
      "findByDomain"
    );

    const mockData = {
      firstName: "fNameMock",
      lastName: "lNameMock",
      domain: "test.com",
    };

    await expect(emailGeneratorManager.generate(mockData)).resolves.toBe(
      "flnamemock@test.com"
    );

    expect(mockDomainInfoFindByDomain).toHaveBeenCalled();
    expect(mockCustomerFindByDomain).toHaveBeenCalled();
  });

  it("should resolve from customer info as FIRST_LAST", async () => {
    customerDbManager.create({
      firstName: "fName",
      lastName: "lName",
      domain: "test.com",
      email: "fnamelname@test.com",
    });

    const mockCustomerFindByDomain = jest.spyOn(
      customerDbManager,
      "findByDomain"
    );

    const mockDomainInfoFindByDomain = jest.spyOn(
      domainInfoDbManager,
      "findByDomain"
    );

    const mockData = {
      firstName: "fNameMock",
      lastName: "lNameMock",
      domain: "test.com",
    };

    await expect(emailGeneratorManager.generate(mockData)).resolves.toBe(
      "fnamemocklnamemock@test.com"
    );

    expect(mockDomainInfoFindByDomain).toHaveBeenCalled();
    expect(mockCustomerFindByDomain).toHaveBeenCalled();
  });

  it("should use lower case for email & strip whitespaces from two names and surnames", async () => {
    domainInfoDbManager.create({
      domain: "test.com",
      type: DomainNamingType.FIRST_INITIAL_LAST,
    });

    const mockCustomerFindByDomain = jest.spyOn(
      customerDbManager,
      "findByDomain"
    );

    const mockDomainInfoFindByDomain = jest.spyOn(
      domainInfoDbManager,
      "findByDomain"
    );

    const mockData = {
      firstName: "fName FNAMESECOND",
      lastName: "lName LNAMESECOND",
      domain: "test.com",
    };

    await expect(emailGeneratorManager.generate(mockData)).resolves.toBe(
      "flnamelnamesecond@test.com"
    );

    expect(mockDomainInfoFindByDomain).toHaveBeenCalled();
    expect(mockCustomerFindByDomain).toHaveBeenCalledTimes(0);
  });

  it("should use cached value if used twice", async () => {
    customerDbManager.create({
      firstName: "fName",
      lastName: "lName",
      domain: "test.com",
      email: "flname@test.com",
    });

    const mockCustomerFindByDomain = jest.spyOn(
      customerDbManager,
      "findByDomain"
    );

    const mockDomainInfoFindByDomain = jest.spyOn(
      domainInfoDbManager,
      "findByDomain"
    );

    const mockData = {
      firstName: "fNameMock",
      lastName: "lNameMock",
      domain: "test.com",
    };

    await expect(emailGeneratorManager.generate(mockData)).resolves.toBe(
      "flnamemock@test.com"
    );

    expect(mockDomainInfoFindByDomain).toHaveBeenCalled();
    expect(mockCustomerFindByDomain).toHaveBeenCalled();

    await expect(emailGeneratorManager.generate(mockData)).resolves.toBe(
      "flnamemock@test.com"
    );

    expect(mockDomainInfoFindByDomain).toHaveBeenCalled();
    expect(mockCustomerFindByDomain).toHaveBeenCalledTimes(1);
  });
});

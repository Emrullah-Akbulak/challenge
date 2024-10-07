import { DbManager } from "./base";
import { db } from "./db";

export enum DomainNamingType {
  "FIRST_LAST",
  "FIRST_INITIAL_LAST",
}

export interface DomainInfo {
  type: DomainNamingType;
  domain: string;
}

export class DomainInfoDbManager implements DbManager<DomainInfo> {
  repository = db["domainInfo"] as DomainInfo[];

  create = async (info: DomainInfo) => {
    this.repository.push(info);
    return info;
  };

  findByDomain = async (domain: string) => {
    return this.repository.find((t) => t.domain === domain);
  };
}

export type Database = {
  [key: string]: object[];
};

export const db = {
  customers: [
    {
      firstName: "Jane",
      lastName: "Doe",
      email: "jdoe@babbel.com",
      domain: "babbel.com",
    },
    {
      firstName: "Jay",
      lastName: "Arun",
      email: "jayarun@linkedin.com",
      domain: "linkedin.com",
    },
    {
      firstName: "David",
      lastName: "Stein",
      email: "davidstein@google.com",
      domain: "google.com",
    },
    {
      firstName: "Mat",
      lastName: "Lee",
      email: "matlee@google.com",
      domain: "google.com",
    },
    {
      firstName: "Marta",
      lastName: "Dahl",
      email: "mdahl@babbel.com",
      domain: "babbel.com",
    },
    {
      firstName: "Vanessa",
      lastName: "Boom",
      email: "vboom@babbel.com",
      domain: "babbel.com",
    },
  ],
  domainInfo: [],
} as Database;

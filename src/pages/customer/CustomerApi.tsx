import React from "react";

export function searchCustomers() {
  let customers = localStorage["customers"];
  if (!customers) {
    localStorage["customers"] = "[]";
  }
  customers = JSON.parse(customers);
  return customers;
}

export function removeCustomer(id: string) {
    let customers = searchCustomers();
    let indice=customers.findIndex((c: any) => c.id === id)
    customers.splice(indice,1)
    localStorage["customers"] = JSON.stringify(customers);
}

export function saveCustomer(customer: any) {
  let customers = searchCustomers();
  customers.push(customer);
  localStorage["customers"] = JSON.stringify(customers);
}

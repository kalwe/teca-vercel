/**
 * hoursBankService.ts
 *
 * Service for handling API calls related to the Bank of Hours.
 * It generates an access token by concatenating the base token with the current date (in dd/mm/yyyy format)
 * and encrypting it using SHA256. The service then makes a POST request to the API with the necessary headers and body.
 */

import crypto from "crypto";

// Interface defining the filter parameters for the API request.
export interface HoursBankFilter {
  dtde: string; // Start date (dd/mm/yyyy)
  dtate: string; // End date (dd/mm/yyyy)
  nome_pessoa?: string; // Employee name (if applicable)
  cod_pessoa?: string; // Employee ID
}

export class HoursBankService {
  private apiUrl: string;
  private apiUser: string;
  private apiTokenBase: string;

  /**
   * Constructor for HoursBankService.
   * @param apiUrl - The URL of the API endpoint.
   * @param apiUser - The user login to be sent in the header.
   * @param apiTokenBase - The base token provided by support.
   */
  constructor(apiUrl: string, apiUser: string, apiTokenBase: string) {
    this.apiUrl = apiUrl;
    this.apiUser = apiUser;
    this.apiTokenBase = apiTokenBase;
  }

/**
 * Generates an encrypted token by concatenating the base token with the current date
 * and hashing the result using SHA256.
 * @returns {string} The SHA256 encrypted token.
 */
generateToken(): string {
  const today = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const tokenString = `${this.apiTokenBase}${today}`;
  const encryptedToken = crypto.createHash("sha256").update(tokenString).digest("hex");

  console.log("Generated Token:", encryptedToken);
  return encryptedToken;
}


  /**
   * Calls the Bank of Hours API using the provided filter parameters.
   * @param filter - An object containing the filter parameters for the API request.
   */
/**
 * Calls the Bank of Hours API using the provided filter parameters.
 * Sends a GET request to the proxy.
 * @param filter - An object containing the filter parameters for the API request.
 */
async getBankHoursExtract(filter: HoursBankFilter) {
  const token = this.generateToken();

  const headers = {
    "Content-Type": "application/json",
    "User": this.apiUser,
    "Token": token,
  };
  console.log("API Response:", data);


  // Construct query parameters from the filter object
  const queryParams = new URLSearchParams(filter as Record<string, string>).toString();

  const response = await fetch(`/api/proxy?${queryParams}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar dados");
  }

  return response.json();
}

}

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
/**
 * Calls the Bank of Hours API using the provided filter parameters.
 * @param filter - An object containing the filter parameters for the API request.
 */
async getBankHoursExtract(filter: HoursBankFilter) {
  const token = this.generateToken();

  const headers = {
    "Content-Type": "application/json",
    "User": this.apiUser,
    "Token": token,
  };

  // Build the request URL with query parameters
  const queryParams = new URLSearchParams(filter as Record<string, string>).toString();
  const requestUrl = `/api/proxy?${queryParams}`;
  console.log("Request URL:", requestUrl);

  try {
    // Initialize data with a default value
    let data = {};

    // Fetch data from the proxy
    const response = await fetch(requestUrl, {
      method: "GET",
      headers,
    });

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.status} ${response.statusText}`);
    }

    // Get content type to determine how to parse the response
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      console.warn("Unexpected content type:", contentType);
      data = await response.text(); // If not JSON, get text response
    }

    console.log("API Response Data:", data);

    // Return data or throw an error if the structure is unexpected
    if (!data || typeof data !== "object") {
      throw new Error("Dados inesperados na resposta da API.");
    }

    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error; // Re-throw to be caught in the component
  }
}


}

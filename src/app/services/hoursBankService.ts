import crypto from 'crypto'

export interface HoursBankFilter {
  dtde: string
  dtate: string
  nome_pessoa?: string
  cod_pessoa?: string
}

export class HoursBankService {
  private apiUser: string
  private apiTokenBase: string

  /**
   * Constructor for HoursBankService.
   * @param apiUrl - The URL of the API endpoint.
   * @param apiUser - The user login to be sent in the header.
   * @param apiTokenBase - The base token provided by support.
   */
  constructor(apiUser: string, apiTokenBase: string) {
    this.apiUser = apiUser
    this.apiTokenBase = apiTokenBase
  }

  /**
   * Generates an encrypted token by concatenating the base token with the current date
   * and hashing the result using SHA256.
   * @returns {string} The SHA256 encrypted token.
   */
  generateToken(): string {
    const today = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    const tokenString = `${this.apiTokenBase}${today}`
    const encryptedToken = crypto.createHash('sha256').update(tokenString).digest('hex')

    console.log('Generated Token:', encryptedToken)
    return encryptedToken
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
    const token = this.generateToken()

    const headers = {
      'Content-Type': 'application/json',
      User: this.apiUser,
      Token: token,
    }

    const queryParams = new URLSearchParams(filter as Record<string, string>).toString()
    const requestUrl = `/api/proxy?${queryParams}`
    console.log('Request URL:', requestUrl)

    try {
      let data = {}

      const response = await fetch(requestUrl, {
        method: 'GET',
        headers,
      })

      if (!response.ok) {
        throw new Error(`Erro ao buscar dados: ${response.status} ${response.statusText}`)
      }

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        data = await response.json()
      } else {
        console.warn('Unexpected content type:', contentType)
        data = await response.text()
      }

      console.log('API Response Data:', data)

      if (!data || typeof data !== 'object') {
        throw new Error('Dados inesperados na resposta da API.')
      }

      return data
    } catch (error) {
      console.error('Erro na requisição:', error)
      throw error
    }
  }
}

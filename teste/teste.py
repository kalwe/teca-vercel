import hashlib
from datetime import datetime

import requests

# Configuração da API
API_URL = "https://stou.ifractal.com.br/teca/rest/"
API_USER = "token"
API_TOKEN_BASE = "QS7lc@HwpO3D!E!ajxDS"

# Gerar Token SHA-256
today = datetime.today().strftime("%d/%m/%Y")

# Exibir a data utilizada no token
print(today)

# Criar a string do token
token_string = f"{API_TOKEN_BASE}{today}"
token_hash = hashlib.sha256(token_string.encode()).hexdigest()

# Exibir o token gerado para debug
print(token_hash)

# Definir os headers da requisição
headers = {
    "Content-Type": "application/json",
    "User": API_USER,
    "Token": token_hash,
}

# Definir o body da requisição para buscar o ID do funcionário pelo nome
body = {
    "pag": "funcionario_cracha",
    "cmd": "get",
    "nome": "João Silva",
}

# Enviar a requisição para obter o ID do funcionário
try:
    response = requests.post(API_URL, json=body, headers=headers)
    print("Status da Resposta:", response.status_code)
    print("Resposta da API:", response.json())

    # Debug extra
    print("\n DEBUG INFO")
    print("String usada para o hash:", token_string)
    print("Token SHA-256:", token_hash)

except requests.exceptions.RequestException as e:
    print(" Erro na requisição:", e)

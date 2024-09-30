import requests

class EthereumClient:
    """
    A client for interacting with the Ethereum blockchain via the Infura API.

    Attributes:
        project_id (str): The Infura Project ID used for making API requests.
    """

    def __init__(self, project_id):
        """
        Initializes the EthereumClient with the specified Infura Project ID.

        Args:
            project_id (str): The Infura Project ID.
        """
        self.project_id = project_id

    def get_ethereum_balance(self, wallet_address):
        """
        Retrieves the Ethereum balance for the specified wallet address.

        Args:
            wallet_address (str): The Ethereum wallet address to query.

        Returns:
            float: The balance in Ether (ETH) if the request is successful; 
            None if the request fails or the wallet address is invalid.
        """
        url = f'https://mainnet.infura.io/v3/{self.project_id}'
        headers = {'Content-Type': 'application/json'}
        data = {
            "jsonrpc": "2.0",
            "method": "eth_getBalance",
            "params": [wallet_address, "latest"],
            "id": 1
        }

        response = requests.post(url, json=data, headers=headers)

        if response.status_code == 200:
            balance_wei = int(response.json()['result'], 16)
            balance_eth = balance_wei / (10 ** 18)
            return balance_eth
        else:
            return None

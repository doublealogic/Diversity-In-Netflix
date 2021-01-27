import json
import pandas as pd
import urllib3
from config import client_id

def get_db_data():
    # Connect to database
    pd.fromsql()

    # Query data

    # Return data in json format

    pass

def get_api_data(media_type): 
    # Query to api
    
    http = urllib3.PoolManager()
    headers = {
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': client_id
    }
    request = http.request('GET', f"https://api.trakt.tv/{media_type}/watched/yearly?page=1&limit=100", headers=headers)
    return json.loads(request.data.decode("utf-8"))

    
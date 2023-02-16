# Original Data : https://data.sfgov.org/Public-Safety/Law-Enforcement-Dispatched-Calls-for-Service-Real-/gnap-fj3t
from datetime import date, timedelta
import os

import pandas as pd
from sodapy import Socrata

from google.cloud import storage

os.environ["no_proxy"]="*" # set this for airflow errors. https://github.com/apache/airflow/discussions/24463

def create_dir(parent_dir, directory):
    path = os.path.join(parent_dir, directory)
    os.makedirs(path, exist_ok=True)

def retrieve_yesterday_data(url, sub_uri, app_token, data_limit, yesterday):
    # app_token is not needed for public data
    client = Socrata(url, app_token)
    results = client.get(sub_uri, limit=data_limit)
    results_df = pd.DataFrame.from_records(results)
    return results_df[results_df['received_datetime'].str.startswith(yesterday)]

def write_csv_to_gcs(bucket_name, blob_name, service_account_key_file, df):
    """Write and read a blob from GCS using file-like IO"""
    storage_client = storage.Client.from_service_account_json(service_account_key_file)
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(blob_name)

    with blob.open("w") as f:
        df.to_csv(f, index=False)
        








import subprocess
import time
from datetime import datetime


def status_update(statusInput):
    with open("status_file.txt", "w") as status_file:
        status_file.write(statusInput)

def last_updated():
    with open("last_updated.txt", "w") as last_updated:
        last_updated.write(str(datetime.now()))


try:
    print("Getting bridge values....")
    status_update("Updating Bridge Values...")
    subprocess.run(["node", "/home/naz/crypto_ecosystem_map/BridgeValueCalculation/getBridgeValues.js"])
except:
    print("An error occurred, most likely an RPC timeout, trying again in 1 min...")
    status_update("Updating Bridge Values...")
    time.sleep(60)
    subprocess.run(["node", "/home/naz/crypto_ecosystem_map/BridgeValueCalculation/getBridgeValues.js"])

try:
    print("Getting chain ecosystem values...")
    status_update("Updating Chain Ecosystem Values...")
    subprocess.run(["node","/home/naz/crypto_ecosystem_map/ChainTotalValueCalculation/getChainTotalValue.js" ])
except:
    print("An error occurred, most likely an RPC timeout, trying again in 1 min...")
    status_update("Updating Chain Ecosystem Values...")
    time.sleep(60)
    subprocess.run(["node","/home/naz/crypto_ecosystem_map/ChainTotalValueCalculation/getChainTotalValue.js" ])



print("Generating final JSON file...")
status_update("Generating final JSON file...")

subprocess.run(["node", "/home/naz/crypto_ecosystem_map/generateFinalJSON.js"])

print("Generating figma formatted data...")
status_update("Generating figma file...")

subprocess.run(["python3", "/home/naz/crypto_ecosystem_map/outputToCsv.py"])

print("Done!")
status_update("Done!")
last_updated()


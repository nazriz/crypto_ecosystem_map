import subprocess
import time

# try:
#     print("Getting bridge values....")
#     subprocess.run(["node", "/Users/nazimrizvic/crypto_ecosystem_map/crypto_ecosystem_map/BridgeValueCalculation/getBridgeValues.js"])
# except:
#     print("An error occurred, most likely an RPC timeout, trying again in 1 min...")
#     time.sleep(60)
#     subprocess.run(["node", "/Users/nazimrizvic/crypto_ecosystem_map/crypto_ecosystem_map/BridgeValueCalculation/getBridgeValues.js"])

# try:
#     print("Getting chain ecosystem values...")
#     subprocess.run(["node","/Users/nazimrizvic/crypto_ecosystem_map/crypto_ecosystem_map/ChainTotalValueCalculation/getChainTotalValue.js" ])
# except:
#     print("An error occurred, most likely an RPC timeout, trying again in 1 min...")
#     time.sleep(60)
#     subprocess.run(["node","/Users/nazimrizvic/crypto_ecosystem_map/crypto_ecosystem_map/ChainTotalValueCalculation/getChainTotalValue.js" ])



print("Generating final JSON file...")
subprocess.run(["node", "/Users/nazimrizvic/crypto_ecosystem_map/crypto_ecosystem_map/generateFinalJSON.js"])

print("Generating figma formatted data...")
subprocess.run(["python3", "/Users/nazimrizvic/crypto_ecosystem_map/crypto_ecosystem_map/outputToCsv.py"])

print("Done!")
from ctc import evm
import ctc
import asyncio

# transfers = asyncio.run(evm.async_get_erc20_transfers(
#     token='0x956f47f50a910163d8bf957cf5846d573e7f87ca',
#     event_name='Transfer',
# ))

async def getEth():
    transactions = await ctc.async_get_transactions_from_address("0x3ee18B2214AFF97000D974cf647E7C347E8fa585")


    return transactions

amount = asyncio.run(getEth())

print(amount)


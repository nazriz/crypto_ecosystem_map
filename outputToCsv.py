import json
import pandas as pd
f = open('finalData.json')
data = json.load(f)


outputDict = {}
for x in data:
    if x != "totals":
        if x != "last_updated":
            for y in data[x]:
                outputDict[y] = data[x][y]

f.close()


df = pd.DataFrame.from_dict(outputDict, orient='index')
df.to_csv("output.csv", encoding='utf-8', index='false')



import json
import pandas as pd
import locale
locale.setlocale( locale.LC_ALL, '' )


f = open('finalData.json')
data = json.load(f)


outputDict = {}
for x in data:
    if x != "totals":
        if x != "last_updated":
            for y in data[x]:
                outputDict[y] = data[x][y]

f.close()

for y in outputDict:
    for z in outputDict[y]:
        if 'USD' in z:
            if not isinstance(outputDict[y][z],str):
                outputDict[y][z] = '${:,.0f}'.format(outputDict[y][z])



df = pd.DataFrame.from_dict(outputDict, orient='index')
df.to_csv("figmaFormattedData.csv", encoding='utf-8', index='false')



print(df)

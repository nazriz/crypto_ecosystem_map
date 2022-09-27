import json
import pandas as pd
import locale
import os
locale.setlocale( locale.LC_ALL, '' )
dirname = os.path.dirname(__file__)
finalDataPath = os.path.join(dirname,'./data/finalData.json')
figmaDataPath = os.path.join(dirname,'./data/figmaFormattedData.csv')

f = open(finalDataPath)
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
            if not isinstance(outputDict[y][z],str) and outputDict[y][z]:
                outputDict[y][z] = '${:,.0f}'.format(outputDict[y][z])



df = pd.DataFrame.from_dict(outputDict, orient='index')
df.to_csv(figmaDataPath, encoding='utf-8', index='false')



# print(df)

import requests
from bs4 import beautifulSoup
import re
import xlwt

# 根据UTL和开始页码获取当前页面的文本男人（HTML源码）

def getHtmlTest(url, startRow):
	if(startRow == 0):
		param = {}
	else: 
		param = {"start": startRow, "filter": ""}

	r = requests.get(url, params = param, headers = {})


# 保存

def saveData(savePath):
	book = xlwt.workbook(encoding="utf-8", style_compression=0)
	sheet = book.add_sheet("豆瓣最受欢迎的Top250部电影", cell_overwrite_ok=True)
	col = ('电影名称', '评分', '评论人数', '短评')
	for i in range(0,4):
		sheet.write(0,i, col[i])
	for i in range(0, 250):
		data = datalist[i]
		for j in range(0,4):
			sheet.write(i+1, j, data[j]) #给表格添加数据
	book.save(savepath) #保存excel
	return




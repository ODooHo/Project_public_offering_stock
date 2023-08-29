# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class StockItem(scrapy.Item):
    ipo_Name = scrapy.Field() # 공모주 명
    market = scrapy.Field() # 시장 구분
    code = scrapy.Field() # 종목 코드   
    owner = scrapy.Field() # 대표명
    locate = scrapy.Field() # 위치

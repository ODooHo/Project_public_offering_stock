# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class BaseItem(scrapy.Item):
    ipo_Name = scrapy.Field() # 공모주 명
    ipo_code = scrapy.Field() # 종목 코드   
    market = scrapy.Field() # 시장 구분
    owner = scrapy.Field() # 대표명
    shareholder = scrapy.Field() #최대 주주 
    locate = scrapy.Field() # 위치
    seed = scrapy.Field() # 자본금
    business = scrapy.Field() # 업종
    ipo_count = scrapy.Field() #공모주식수
    face_value = scrapy.Field() #액면가
    collusion = scrapy.Field() #공모가
    chief = scrapy.Field() #주간사
    compete = scrapy.Field() #기관 경쟁률
    commit = scrapy.Field() #의무 보유 확약
    date = scrapy.Field() #공모 날짜
    


class IPOItem(scrapy.Item):
    ipo_Name = scrapy.Field() # 공모주 명
    date = scrapy.Field() # 공모 날짜 
    
    

    
    
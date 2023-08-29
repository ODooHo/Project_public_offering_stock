import scrapy
from scrapy import Spider

from .. import items
from pymongo import MongoClient

client = MongoClient('mongodb+srv://engh0205:dhwjdgh1102@stockcluster.m2fm1sr.mongodb.net/?retryWrites=true&w=majority')
db = client.test

class StockSpider(Spider):
    name = 'prac'

    def start_requests(self):
        url = "http://www.38.co.kr/html/fund/index.htm?o=k"
        yield scrapy.Request(url, self.parse_start)

    def parse_start(self, response):
        # Find the total number of items and generate indices for the URLs
        total = 30
        indices = range(1,total+1)

        base_url = "http://www.38.co.kr"
        # for index in indices:
        #     # Generate the link xpath
        for index in indices:
            link_xpath = f'/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[4]//tr[2]/td/table//tr[{index}]/td[1]/a/@href'
            
            link = response.xpath(link_xpath).get()

            if link:
                # Create the full link URL by joining base_url and link
                full_link_url = f"{base_url}{link}"
                yield scrapy.Request(full_link_url, callback=self.parse_item)



    def parse_item(self, response):
        item = items.StockItem()
        item['ipo_Name'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[2]//tr[1]/td[2]/a/b/font/text()').get()
        item['market'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[2]//tr[2]/td[2]/text()').get().strip()
        item['code'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[2]//tr[2]/td[4]/text()').get().strip()
        item['owner'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[2]//tr[4]/td[2]/text()').get().strip()
        item['locate'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[2]//tr[5]/td[2]/text()').get().strip()
        
        #yield item
        db.test.insert_one(dict(item))
        print(item)

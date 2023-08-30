import scrapy
from scrapy import Spider

from .. import items
from pymongo import MongoClient

#client = MongoClient('mongodb+srv://engh0205:dhwjdgh1102@stockcluster.m2fm1sr.mongodb.net/?retryWrites=true&w=majority')
#db = client.test

class StockSpider(Spider):
    name = 'IPO'

    IPO_list = []
    

    def start_requests(self):
        url = "http://www.ipostock.co.kr/sub03/ipo04.asp?str1=2023&str2=all"
        yield scrapy.Request(url, self.parse_start)


    def parse_start(self, response):
        # Find the total number of items and generate indices for the URLs
        total = 20 * 2

        base_url = "http://www.ipostock.co.kr"
        # for index in indices:
        #     # Generate the link xpath
        #for index in range(1,total,2):
        link_xpath = f'//*[@id="print"]/table[1]//tr[4]/td/table//tr[4]/td/table//tr[1]/td[3]/a/@href'
        

        link = response.xpath(link_xpath).get()

        if link:
            # Create the full link URL by joining base_url and link
            full_link_url = f"{base_url}{link}"
            yield scrapy.Request(full_link_url, callback=self.parse_category)


    def parse_category(self,response):
        base_url = "http://www.ipostock.co.kr/view_pg/"
 #       for index in range(1,5):
        xpath = f'//*[@id="print"]/table//tr[5]/td/table[1]//tr[1]/td[2]/a/@href'


        link = response.xpath(xpath).get()
        if link:
            if link.find('view_01') == 0:
                full_url = f"{base_url}{link}"
                yield scrapy.Request(full_url, callback=self.parse_item)
         

    def parse_item(self, response):
        item = items.StockItem()
        item['ipo_Name'] = response.xpath('//*[@id="print"]/table//tr[3]/td/table//tr[5]/td/table//tr[2]/td/table//tr[1]/td[1]/text()').get().strip()
        item['market'] = response.xpath('//*[@id="print"]/table//tr[3]/td/table//tr[5]/td/table//tr[2]/td/table//tr[1]/td[2]/text()').get().strip()
        item['code'] = response.xpath('//*[@id="print"]/table//tr[3]/td/table//tr[5]/td/table//tr[2]/td/table//tr[1]/td[3]/text()').get().strip()
        item['owner'] = response.xpath('//*[@id="print"]/table//tr[3]/td/table//tr[5]/td/table//tr[2]/td/table//tr[1]/td[4]/text()').get().strip()
        item['locate'] = response.xpath('//*[@id="print"]/table//tr[3]/td/table//tr[5]/td/table//tr[2]/td/table//tr[2]/td[1]/text()').get().strip()
        yield item

        #db.test.insert_one(dict(item))

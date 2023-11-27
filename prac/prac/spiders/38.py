import scrapy
from scrapy import Spider
from .. import items
from pymongo import MongoClient
from bs4 import BeautifulSoup


client = MongoClient('mongodb+srv://engh0205:dhwjdgh1102@stockcluster.m2fm1sr.mongodb.net/?retryWrites=true&w=majority')
db = client.test

class StockSpider(Spider):
    name = 'update'
    IPO_list = []

    def start_requests(self):
        url = "http://www.38.co.kr/html/fund/index.htm?o=k"
        #url = "http://www.38.co.kr/html/fund/index.htm?o=k&page=2"
        yield scrapy.Request(url, self.parse_start)

    def parse_start(self, response):
        # Find the total number of items and generate indices for the URLs
        total = 30
        index = 1
        check = []

        base_url = "http://www.38.co.kr"
        for index in range(1,total+1):
            a = []
            name = response.xpath(f'/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[4]//tr[2]/td/table//tr[{index}]/td[1]/a/font/text()').get()
        #     # Generate the link xpath
        #for index in range(1,6):
        link_xpath = f'/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[4]//tr[2]/td/table//tr[{index}]/td[1]/a/@href'
        #/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[4]//tr[2]/td/table//tr[{index}]/td[1]/a
        link = response.xpath(link_xpath).get()


        if link:
            # Create the full link URL by joining base_url and link
            full_link_url = f"{base_url}{link}"
            yield scrapy.Request(full_link_url, callback=self.parse_item)

    def parse_item(self, response):
        item = items.BaseItem()
        name = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[2]//tr[1]/td[2]/a/b/font/text()').get()
        public = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[6]//tr[6]/td[2]').get.strip()
        print(public)
        db.test.update_one({"ipoName" : name},{"$set" : {"public" : public}})
        #a = list(result)
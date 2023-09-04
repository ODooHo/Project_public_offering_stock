import scrapy
from scrapy import Spider
from .. import items
from pymongo import MongoClient
from bs4 import BeautifulSoup

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
        for index in range(1,total,2):
            link_xpath = f'//*[@id="print"]/table[1]//tr[4]/td/table//tr[4]/td/table//tr[{index}]/td[3]/a/@href'
        
            link = response.xpath(link_xpath).get()
            if link:
                # Create the full link URL by joining base_url and link
                full_link_url = f"{base_url}{link}"
                yield scrapy.Request(full_link_url, callback=self.parse_category)


    def parse_category(self,response):
        base_url = "http://www.ipostock.co.kr/view_pg/"
        for index in range(1,5):
            xpath = f'//*[@id="print"]/table//tr[5]/td/table[1]//tr[1]/td[{index}]/a/@href'
            link = response.xpath(xpath).get()
            if link:
                if link.find('view_02') == 0:
                    full_url = f"{base_url}{link}"
                    yield scrapy.Request(full_url, callback=self.parse_holder)
                elif link.find('view_03') == 0:
                    full_url = f"{base_url}{link}"
                    yield scrapy.Request(full_url, callback=self.parse_seed)


    
    def parse_holder(self, response):
        html = response.text
        soup = BeautifulSoup(html,'html.parser')

        strong_tags = soup.find_all('strong')
        strong_contents = [tag.get_text().strip() for tag in strong_tags]
        
        print(strong_contents)
         

    def parse_seed(self, response):
        item = items.IPOItem()
        html = response.text
        soup = BeautifulSoup(html,'html.parser')

        strong_tags = soup.find_all('strong')
        strong_contents = [tag.get_text().strip() for tag in strong_tags]
        print(strong_contents)

        #db.test.insert_one(dict(item))

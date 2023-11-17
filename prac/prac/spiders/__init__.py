import scrapy
from scrapy import Spider
from .. import items
from pymongo import MongoClient
from bs4 import BeautifulSoup
from datetime import datetime

client = MongoClient('mongodb+srv://engh0205:dhwjdgh1102@stockcluster.m2fm1sr.mongodb.net/?retryWrites=true&w=majority')
db = client.test

class StockSpider(Spider):
    name = 'base'
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
            compete = response.xpath(f'/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[4]//tr[2]/td/table//tr[{index}]/td[5]/text()').get().strip()
            collusion = response.xpath(f'/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[4]//tr[2]/td/table//tr[{index}]/td[3]/text()').get().strip()
            flag = db.test.find_one({"ipoName" : name})
            
            if flag is None:
                check.append(index)
            
            db.test.update_one({"ipoName" : name} , {"$set": {"compete" : compete}})
            db.test.update_one({"ipoName" : name} , {"$set":{"finalCollusion" : collusion}})
        if len(check)<=0:
            link_xpath = f'/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[4]//tr[2]/td/table//tr[{index}]/td[1]/a/@href'
        else:
            print(check)
            link_xpath = f'/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[4]//tr[2]/td/table//tr[{check[0]}]/td[1]/a/@href'
        
        link = response.xpath(link_xpath).get()


        if link:
            # Create the full link URL by joining base_url and link
            full_link_url = f"{base_url}{link}"
            yield scrapy.Request(full_link_url, callback=self.parse_item)

    def parse_item(self, response):
        item = items.BaseItem()
        name = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[2]//tr[1]/td[2]/a/b/font/text()').get()
        public = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[6]//tr[6]/td[2]/text()').get().strip()
        db.test.update_one({"ipoName" : name},{"$set" : {"public" : public}})
        result = db.test.find({"ipoName" : name},{"compete" : ""})
        a = list(result)
        print(a)
        total = 30
        if(len(a)!=0):
            return
        else:
            item['ipoName'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[2]//tr[1]/td[2]/a/b/font/text()').get()
            item['ipoCode'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[2]//tr[2]/td[4]/text()').get().strip()  
            item['owner'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[2]//tr[4]/td[2]/text()').get().strip()
            item['locate'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[2]//tr[5]/td[2]/text()').get().strip()
            item['seed'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[2]//tr[9]/td[4]/text()').get().strip()
            item['business'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[2]//tr[3]/td[2]/text()').get().strip()
            item['ipoQuantity'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[4]//tr[1]/td[2]/text()').get().strip()
            item['faceValue'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[4]//tr[1]/td[4]/text()').get().strip()
            item['collusion'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[4]//tr[3]/td[2]/text()').get().strip()
            item['chief'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[4]//tr[5]/td[2]/b/text()').get().strip()
            item['compete'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[6]//tr[9]/td[2]/table//tr/td[2]/text()').get().strip()
            item['commit'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[6]//tr[9]/td[2]/table//tr/td[4]/text()').get().strip()
            item['date'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[6]//tr[2]/td[2]/text()').get().strip()
            item['public'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[6]//tr[6]/td[2]/text()').get().strip()
            

            # if item['ipoName'] == '두산로보틱스':
            #     item['compete'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[7]//tr[9]/td[2]/table//tr/td[2]/text()').get().strip()
            #     item['commit'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[7]//tr[9]/td[2]/table//tr/td[4]/text()').get().strip()
            #     item['date'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[7]//tr[2]/td[2]/text()').get().strip()
            # else:
            #     item['compete'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[6]//tr[9]/td[2]/table//tr/td[2]/text()').get().strip()
            #     item['commit'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[6]//tr[9]/td[2]/table//tr/td[4]/text()').get().strip()
            #     item['date'] = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[6]//tr[2]/td[2]/text()').get().strip()

            url = "http://www.ipostock.co.kr/sub03/ipo04.asp?str1=2023&str2=all&str3=&str4=&page=1"
            #url = "http://www.ipostock.co.kr/sub03/ipo04.asp?str1=2023&str2=all&str3=&str4=&page=3"
            yield scrapy.Request(url, callback=self.parse_IPO_start, meta={'item': item})


    def parse_IPO_start(self,response):
        total = 20 * 2
        base_url = "http://www.ipostock.co.kr"
        item = response.meta['item']
        index = 3
        #     # Generate the link xpath
        #for index in range(1,12,2):
        link_xpath = f'//*[@id="print"]/table[1]//tr[4]/td/table//tr[4]/td/table//tr[{index}]/td[3]/a/@href'        
        link = response.xpath(link_xpath).get()
        if link:
            # Create the full link URL by joining base_url and link
            full_link_url = f"{base_url}{link}"
            yield scrapy.Request(full_link_url, callback=self.parse_IPO_category,meta={'item' : item})


    def parse_IPO_category(self,response):
        item = response.meta['item']
        base_url = "http://www.ipostock.co.kr/view_pg/"
        #item['date'] = response.xpath('//*[@id="print"]/table//tr[5]/td/table[2]//tr[1]/td/table//tr[2]/td[1]/table//tr[3]/td[2]/text()').get().strip()
        #item['ipo_Name'] = response.xpath('//*[@id="print"]/table//tr[3]/td/table//tr/td[1]/table//tr[1]/td/table//tr/td[1]/strong[1]/text()').get().strip()
        for index in range(1,5):
            xpath = f'//*[@id="print"]/table//tr[5]/td/table[1]//tr[1]/td[{index}]/a/@href'
            link = response.xpath(xpath).get()
            print(link)
            if link:
                if link.find('view_02') == 0:
                    full_url = f"{base_url}{link}"
                    yield scrapy.Request(full_url, callback=self.parse_holder, meta={'item': item})
                elif link.find('view_03') == 0:
                    full_url = f"{base_url}{link}"
                    yield scrapy.Request(full_url, callback=self.parse_seed, meta={'item': item})


    def parse_holder(self, response):
        item = response.meta['item']
        
        html = response.text
        soup = BeautifulSoup(html,'html.parser')

        strong_tags = soup.find_all('b')
        contents = [tag.get_text().strip() for tag in strong_tags]
        if contents[0] == "바로가기":
            contents = contents[1:]

        #contents[0] : 보호예수 물량 합계
        #contents[1] : 보호예수 물량 비율
        #contents[2] : 유통가능 주식 합계
        #contents[3] : 유통가능 주식 비율
        #contents[4] : 상장 주식 수 

        item['protect'] = contents[0]
        item['protectPercent'] = contents[1]
        item['possible'] = contents[2]
        item['possiblePercent'] = contents[3]
        item['sharedQuantity'] = contents[4]
        # item['sale'] = []
        # item['profit'] = []
        # item['pureProfit'] = []
        # yield item

    def parse_seed(self, response):
        # html = response.text
        # soup = BeautifulSoup(html,'html.parser')

        # strong_tags = soup.find_all('strong')
        # strong_contents = [tag.get_text().strip() for tag in strong_tags]
        # strong_contents = strong_contents[-3:]
        # strong_contents.append("seed")
        item = response.meta['item']
        temp = []
        cat = 14
        ind = 2


        for i in range(3):
            for j in range(3):
                result = response.xpath(f'//*[@id="print"]/table//tr[6]/td/table[2]//tr[{cat + i}]/td[{ind + j}]/text()').get().strip()
                temp.append(result)
        
        #temp[0] : 매출액(23년 반기 or 22년 말기 *제일 최신)
        #temp[1] : 매출액(22년 반기 or 초기 * 두번째 최신)
        #temp[2] : 매출액(21년 초기 or 반기 * 세번째 최신) 이하 동일
        #temp[3~5] : 영업이익
        #temp[6~8] : 당기순이익 

    
        item['sale'] = temp[0:3]
        item['profit'] = temp[3:6]
        item['pureProfit'] = temp[6:9]
        yield item

        


class UpdateSpider(Spider):
    name = 'prac'
    IPO_list = []

    def start_requests(self):
        url = "http://www.38.co.kr/html/fund/index.htm?o=k"
        yield scrapy.Request(url, self.parse_start)

    def parse_start(self, response):
        # Find the total number of items and generate indices for the URLs
        total = 30
        index = 1
        check = []

        base_url = "http://www.38.co.kr"
        for index in range(1,30):
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
        
        result = db.test.find_one({'ipoName': name}, {'date': 1})
        if result:
            public_value = result['date']
            temp = public_value.split('~')
            date_format = '%Y.%m.%d'
            temp = temp[0].strip()
            date_object = datetime.strptime(temp, date_format)
            a = datetime.now()
            
            flag = date_object - a

            if(flag.days <=3):
                check = db.test.find_one({'ipoName' : name} , {'public' : ""})
                if check is None:
                    print("temp")
                    pass
                else:
                    public = response.xpath('/html/body/table[3]//tr/td/table[1]//tr/td[1]/table[6]//tr[6]/td[2]/text()').get().strip()
                    print(public)
                    db.test.update_one({"ipoName" : name},{"$set" : {"public" : public}})
        else:
            print(f"No document found with ipoName: {name}")
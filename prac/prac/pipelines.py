# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from pymongo import MongoClient

class IPOPipeline:
    def __init__(self):
        self.IPO_list = []
        self.item_count = 0

    def process_item(self, item, spider):
        self.IPO_list.append(item)
        return item

    def close_spider(self, spider):
        sorted_list = sorted(self.IPO_list, key=lambda x: x['date'], reverse=True)
        print(self.IPO_list)
        if(len(self.IPO_list) == 0):
            return
        client = MongoClient('mongodb+srv://engh0205:dhwjdgh1102@stockcluster.m2fm1sr.mongodb.net/?retryWrites=true&w=majority')
        db = client.test        
        db.test.insert_one(dict(sorted_list[0]))
        print("IPO_list:{}\n".format(sorted_list))
        print("Total number of items in IPO_list:", len(sorted_list))
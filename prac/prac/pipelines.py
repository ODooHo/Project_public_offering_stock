# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter


class IPOPipeline:
    def __init__(self):
        self.IPO_list = []
        self.item_count = 0

    def process_item(self, item, spider):
        self.IPO_list.append(item)
        return item

    def close_spider(self, spider):
        sorted_list = sorted(self.IPO_list, key=lambda x: x['date'], reverse=True)
        print("IPO_list:{}\n".format(sorted_list))
        print("Total number of items in IPO_list:", len(sorted_list))
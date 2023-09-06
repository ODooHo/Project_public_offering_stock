from scrapy.crawler import CrawlerProcess
from prac.spiders import base,IPO

process = CrawlerProcess()
process.crawl(base)
process.crawl(IPO)
process.start()
 
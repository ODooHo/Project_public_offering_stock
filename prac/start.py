import scrapy
from scrapy.crawler import CrawlerProcess
from prac.spiders import StockSpider,UpdateSpider # 이 부분을 적절하게 수정해야 합니다.
from prac.spiders import UpdateSpider
from scrapy.utils.project import get_project_settings

# 스크래피 설정
settings = get_project_settings()
# 크롤러 프로세스 초기화
process = CrawlerProcess(settings)

# 스파이더 추가
process.crawl(StockSpider)
process.crawl(UpdateSpider)

# 크롤러 실행
process.start()
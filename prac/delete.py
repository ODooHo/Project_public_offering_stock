from pymongo import MongoClient
from bs4 import BeautifulSoup
from datetime import datetime


client = MongoClient('mongodb+srv://engh0205:dhwjdgh1102@stockcluster.m2fm1sr.mongodb.net/?retryWrites=true&w=majority')
db = client.test


db.test.update_many({}, {"$unset": {"public": ""}})
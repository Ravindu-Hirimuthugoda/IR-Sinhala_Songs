import scrapy
from song_crawler.items import SongCrawlerItem
# from datetime import datetime
import re


class SongSpider(scrapy.Spider):
	name = "my_scraper"

	# First Start Url
	start_urls = ["https://www.sinhalasongbook.com/all-sinhala-song-lyrics-and-chords/"]

	npages = 5

	# This mimics getting the pages using the next button. 
	for i in range(2, npages):
		start_urls.append("https://www.sinhalasongbook.com/all-sinhala-song-lyrics-and-chords/?_page="+str(i)+"")
	
	def parse(self, response):
		for href in response.xpath("//h4[contains(@class, 'pt-cv-title')]/a[contains(@class,'_blank')]//@href").extract():
			# add the scheme, eg http:// 
			yield scrapy.Request(href, callback=self.parse_dir_contents)
					
	def parse_dir_contents(self, response):
		item = SongCrawlerItem()

		# song title
		item['songTitle'] = response.xpath("//h1[contains(@class, 'entry-title')]/descendant::text()").extract()[0].strip()

		# lyrics
		lyrcs = response.xpath("//div[contains(@class, 'su-column-inner su-u-clearfix su-u-trim')]/pre[contains(@style,'font-weight: bold;')]/text()").extract()

		structured_lyrics = ''

		for i in range(len(lyrcs)):
			updated_string = re.sub(r'[a-zA-Z]|\d|#|[\([{})\]]|-|,|∆|—|\/|\'|\|+|', '', lyrcs[i])
			updated_strings = re.sub(r'\s+', ' ', updated_string).strip()
			structured_lyrics += updated_strings
		item['lyrics'] = structured_lyrics

		# lyricist
		item['lyricist'] = response.xpath("//span[contains(@class, 'lyrics')]/a/text()").extract()[0].strip()

		# singer
		item['singer'] = response.xpath("//span[contains(@class, 'entry-categories')]/a/text()").extract()[0].strip()

		# composer
		item['composer'] = response.xpath("//span[contains(@class, 'music')]/a/text()").extract()[0].strip()

		# genre
		item['genre'] = response.css("div.su-column-inner span.entry-tags a ::text").getall()

		yield item

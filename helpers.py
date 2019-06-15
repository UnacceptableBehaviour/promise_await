#! /usr/bin/env python

# Quick note on generating a call graph - darwin / osx
	# $ pip install pycallgraph
	# $ brew install graphviz
	# $ pycallgraph --include "helpers.*" graphviz -- ./populate_db.py
	# # http://pycallgraph.slowchop.com/en/master/guide/command_line_usage.html

# helper functions

import csv
import itertools
import re
import copy                 # copy.deepcopy()
from pathlib import Path
from pprint import pprint # giza a look

# serve files from http://192.168.0.8:8000/static/sql_recipe_data.csv
# $ cd /a_syllabus/lang/python/repos/assest_server 
# $ http-server -p 8000 --cors 
# import urllib.request
# urllib.request.urlretrieve ("http://192.168.0.8:8000/static/sql_recipe_data.csv", "sql_recipe_data.csv")
# url = urllib.parse.quote(url, safe='/:')  # make sure files w/ spaces OK







    
if __name__ == '__main__':
    # print("-----  get CSV ------------------------------------S")
    # fetch_file = 'http://192.168.0.8:8000/static/sql_recipe_data.csv'
    # get_csv_from_server_as_disctionary(fetch_file)
    # print("-----  get CSV ------------------------------------E")

    recipe_text = '20190103_170558_chicken beetroot w broccoli and greens.txt'
    #recipe_text = '20190109_143622_crabcakes.txt'
    #urllib.request = 'http://192.168.0.8:8000/static/recipe/20190109_143622_crabcakes.txt'
    get_recipe_ingredients_and_yields_from_file_test(recipe_text,'chicken beetroot w broccoli and greens')

#! /usr/bin/env python

# helper functions
# import os
# import csv
# import copy                 # copy.deepcopy()

import itertools            # items()

import re

from pathlib import Path    # working with paths

from pprint import pprint   # giza a look

import urllib.request       # for get file from server



def get_text_file_contents_from_asset_server(text_filename):
    file_text = 'FILE ACCESS ERROR: NO FILE or NO DATA IN FILE'
    
    print("----- get_text_file_contents_from_asset_server -------------------------------------------------")
    base_url = 'http://192.168.0.8:8000/'
    url = f"{base_url}{text_filename}"
    print(url)

    # IN  http://192.168.0.8:8000/static/recipe/20190228_163410_monkfish and red pepper skewers.txt
    # url = url.replace(" ", "%20")          # WORKS 
    # OUT http://192.168.0.8:8000/static/recipe/20190228_163410_monkfish%20and%20red%20pepper%20skewers.txt

    # get recipe text from assest server
    url = urllib.parse.quote(url, safe='/:')  # WORKS - likely more robust
    print(url)

    local_scratch_dir = Path("./scratch/")

    # create directory (and subdirectory if NO exist)    
    local_scratch_dir.mkdir(parents=True, exist_ok=True)
    
        #pathlib.Path('file_path').mkdir(parents=True, exist_ok=True) # create directory (and subdirectory if NO exist)
        #os.makedirs(local_scratch_dir, exist_ok=True)   # create directory (and subdirectory if NO exist)
            
    file_path = local_scratch_dir.joinpath( Path(text_filename).name )
    
    print(" * * * * * * ")
    print(Path(text_filename).name)
    print(file_path)
    print(" * * * * * * ")
    
    try:
        ret_val = urllib.request.urlretrieve(url, file_path)    
        #pprint(ret_val)
    
        if file_path.is_file():
            print(f"File exists: {file_path}")
            f = open(file_path, 'r')              # load local file to work with
        else:
            print(f"File NOT PRESENT: {file_path}")
            return
    
        file_text = f.read()
        f.close()
    
    except Exception as e:
        msg = f"File not present: {text_filename}"
        log_exception(msg, e)
        file_text = f"FILE-MISSING: {text_filename}"
        
    finally:
        print(f"RETRIEVED URL: finally segment")
        
    return file_text


def log_exception(message, exception):
    print("------ caught exception rectrieving url - - - - - - < S")
    print(f"NOTE:{message}\n")
    print(exception)
    f = open('./scratch/error_log.txt', 'a')
    f.write(f"\n\nNOTE: {message} <\n{exception}")
    f.close()
    print("------ caught exception rectrieving url - - - - - - < E")
    return 0

def get_nutrinfo_vocab(text_data):
    
    #for line in text_data.splitlines():
    #    print(line)
        
    vocab = re.findall(r'^-+ for the nutrition information (.*?) \(', text_data, re.MULTILINE)
        
    #for word in vocab: #.items():
    #    print(word)
    
    return vocab


def get_igd_vocab():
    
    nutrinfo_text = get_text_file_contents_from_asset_server('scratch/nutrinfo.txt')
    
    vocab = get_nutrinfo_vocab(nutrinfo_text)
    
    print(vocab)    
    # vocab.sort()
    print("\n*\n*\n*\n*\n*")
    print(vocab)
    vocab = list( filter(None, vocab) ) # remove blanks
    print("\n+\n*\n+\n*\n+")
    print(vocab)

    
    print(f"vocab: {len(vocab)} {vocab[0]}")
    
    return vocab

    
if __name__ == '__main__':
    # print("-----  get CSV ------------------------------------S")
    # fetch_file = 'http://192.168.0.8:8000/static/sql_recipe_data.csv'
    # get_csv_from_server_as_disctionary(fetch_file)
    # print("-----  get CSV ------------------------------------E")

    file_path = 'scratch/nutrinfo.txt'
    #file_text = '20190109_143622_crabcakes.txt'
    #urllib.request = 'http://192.168.0.8:8000/static/recipe/20190109_143622_crabcakes.txt'
    nutrinfo_text = get_text_file_contents_from_asset_server(file_path)

    print( get_nutrinfo_vocab(nutrinfo_text) )

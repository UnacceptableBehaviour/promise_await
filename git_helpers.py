#! /usr/bin/env python

# git helper functions - listing repos
# find all repos on local machine that match those
# in the online user profile - GitAPI

#import itertools            # items()

#import re

# https://docs.python.org/3/library/pathlib.html
from pathlib import Path    # working with paths

from pprint import pprint   # giza a look

# import urllib.request       # for get file from server

import glob

def find_all_local_git_repos_under_directory(target_dir):
    repo_dict = {}
    
    print("* * * FINDING REPOS * * *")
    print( f"{target_dir}" )
    
    # recursively look for directories (trailing /) with name .git
    dir_list = glob.glob(f"{target_dir}/**/.git/", recursive=True)
    
    print("\n\n")
    
    # go through list and pull out second from last (repo name) and it's location 
    for d in dir_list:        
        components = d.split('/')
        
        # second from last (repo name)
        repo_name = components.pop(len(components) - 3)
        
        # split the path using the name to get it's location
        repo_path = d.split(repo_name)[0]
        
        # create a dictionary of repos and their lcations        
        repo_dict[repo_name] = repo_path
        
    return repo_dict
    


    
if __name__ == '__main__':

    file_path = Path('/Users/simon/a_syllabus/lang/')

    print( type(file_path) )
    print( f"{file_path} \n\n" )
    
    repositories = find_all_local_git_repos_under_directory(file_path)
    
    for k in repositories:
        print(f"{k}\t in: {repositories[k]}")
    
    

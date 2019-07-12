#! /usr/bin/env python

# git helper functions - listing repos
# find all repos on local machine that match those
# in the online user profile - GitAPI

import os                   # chdir(dir), getcwd
import subprocess           # subprocess.run(command, arg)

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


def find_all_local_git_repos():    
    file_path = Path('/Users/simon/a_syllabus/lang/')
    
    return find_all_local_git_repos_under_directory(file_path) 

def process_git_status(git_status_response):
    status_dict = {}
        
    print("- - - process_git_status - S")
    # eg git status o/p
    #
    # On branch master
    # Your branch is up-to-date with 'origin/master'.
    # 
    # Changes to be committed:
    #   (use "git reset HEAD <file>..." to unstage)
    # 
    # 	modified:   README.md
    # 
    # Changes not staged for commit:
    #   (use "git add <file>..." to update what will be committed)
    #   (use "git checkout -- <file>..." to discard changes in working directory)
    # 
    # 	modified:   templates/index.html
    # 
    # Untracked files:
    #   (use "git add <file>..." to include in what will be committed)
    # 
    # 	antenna_physics.txt
    
    

    #print(regex_me)
    print("- - - process_git_status - E")
    
    return(status_dict)



import json
    
if __name__ == '__main__':
    
    # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    # finding local repos
    # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    # example output:
    # FOUND 0 - gdb_lldb            /Users/simon/a_syllabus/lang/c++/repos/
    # FOUND 1 - openFrameworks      /Users/simon/a_syllabus/lang/c++/repos/
    # FOUND 2 - ajax_cc             /Users/simon/a_syllabus/lang/html_css_js/
    # FOUND 3 - bootstrap_4         /Users/simon/a_syllabus/lang/html_css_js/
    # FOUND 4 - dom_js              /Users/simon/a_syllabus/lang/html_css_js/
    # FOUND 5 - fetch_js            /Users/simon/a_syllabus/lang/html_css_js/
    # FOUND 6 - html_label          /Users/simon/a_syllabus/lang/html_css_js/
    # FOUND 7 - js_intro_msgQ       /Users/simon/a_syllabus/lang/html_css_js/
    # FOUND 8 - promise_await       /Users/simon/a_syllabus/lang/html_css_js/
    # FOUND 9 - linux_bike          /Users/simon/a_syllabus/lang/linux_mix/
    # FOUND 10 - linux_scripts      /Users/simon/a_syllabus/lang/linux_mix/
    # FOUND 11 - 00_flask           /Users/simon/a_syllabus/lang/python/repos/
    # FOUND 12 - 01_flask           /Users/simon/a_syllabus/lang/python/repos/
    # FOUND 13 - 02_flask_js_mysql  /Users/simon/a_syllabus/lang/python/repos/
    # FOUND 14 - assest_server      /Users/simon/a_syllabus/lang/python/repos/
    # FOUND 15 - heroku_nubes       /Users/simon/a_syllabus/lang/python/repos/
    # FOUND 16 - mysql_python       /Users/simon/a_syllabus/lang/python/repos/
    # FOUND 17 - python-getting-started/Users/simon/a_syllabus/lang/python/repos/
    # FOUND 18 - python_koans       /Users/simon/a_syllabus/lang/python/repos/
    # FOUND 19 - _sketchup          /Users/simon/a_syllabus/lang/ruby/repos/
    # FOUND 20 - nutri_scrape       /Users/simon/a_syllabus/lang/ruby/repos/
    # FOUND 21 - sketchup           /Users/simon/a_syllabus/lang/ruby/repos/
    # FOUND 22 - ruby_sinatra       /Users/simon/a_syllabus/lang/ruby/sinatra/repos/
    # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 1
    file_path = Path('/Users/simon/a_syllabus/lang/')
    
    print( type(file_path) )
    print( f"{file_path} \n\n" )
    
    repos_with_paths = find_all_local_git_repos_under_directory(file_path)
    
    for index, repo in enumerate(repos_with_paths):
        
        if repo in repos_with_paths:    # list cross-compare function LOCAL version / GIT version
            print(str.ljust("FOUND "+f"{index} - {repo}", 30) + f"{repos_with_paths[repo]}")
        else:
            print(str.ljust("      "+f"{index} - {repo}", 30) + "* * WARNING - NOT FOUND * *")
            
        
    # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    
    # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    # converting from and to JSON strings and dictionaries
    # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 2
    repo_payload_dict = {'repos': ['00_flask', '01_flask', '02_flask_js_mysql', 'ajax_cc', 'assest_server', 'bootstrap_4', 'dom_js', 'fetch_js', 'gdb_lldb', 'heroku_nubes', 'html_label', 'js_intro_msgQ', 'label', 'linux_bike', 'mysql_python', 'nutri_scrape', 'promise_await', 'python_koans', 'shoes4', 'sketchup']}
    
    # convert from DICT to JSON string - dump string    
    repo_payload_json_string = json.dumps(repo_payload_dict)
    
    print(type(repo_payload_dict))  # prints '<class 'dict'>'
    print(type(repo_payload_json_string))  # prints '<class 'str'>'
    print(repo_payload_json_string)
    
    # convert from JSON string to DICT - load string
    repo_dict = json.loads(repo_payload_json_string)
    print(type(repo_dict))  # prints '<class 'dict'>'
    
    repo_list = repo_dict['repos']
    print("----")
    pprint(repo_list)
    print("----")
    
    print(f"No of repos in JSON: {len(repo_list)}")

    # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    # executing shell commands: (to get response from git status)
    # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    # >>> import subprocess
    # >>> result = subprocess.run(['ls', '-l'], stdout=subprocess.PIPE)
    # >>> result.stdout
    # b'total 0\n-rw-r--r--  1 memyself  staff  0 Mar 14 11:04 files\n'
    # The return value is a bytes object, so if you want a proper string, you'll need to decode it.
    # Assuming the called process returns a UTF-8-encoded string:
    # 
    # >>> result.stdout.decode('utf-8')
    # 'total 0\n-rw-r--r--  1 memyself  staff  0 Mar 14 11:04 files\n'
    # This can all be compressed to a one-liner:
    # 
    # >>> subprocess.run(['ls', '-l'], stdout=subprocess.PIPE).stdout.decode('utf-8')
    #
    # changing directory
    # import os
    # >> os.chdir("/tmp/")
    # >>> os.getcwd()    
    # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    
    repo_report = {}
    
    for index, repo in enumerate(repo_list):
        
        if repo in repos_with_paths:
            print(str.ljust("FOUND "+f"{index} - {repo}", 30) + f"{repos_with_paths[repo]}")
            
            # the default in inverted commas is returned if value not in dict
            repo_to_check_path = repos_with_paths.pop(repo, "lightening_bolts_of_wtf?")             
                # del repos_with_paths[repo] # also works
            
            print(f"\n\nChecking REPO: {repo}")
            pprint(repo_to_check_path)
            os.chdir(Path(repo_to_check_path).joinpath(repo))
            print(os.getcwd())
            
            repo_status = subprocess.run(['git', 'status'], stdout=subprocess.PIPE).stdout.decode('utf-8')
            #repo_status = subprocess.run(['git status', ''], stdout=subprocess.PIPE).stdout.decode('utf-8')
            print("\n- - returned from shell - -")
            print(repo_status)
            repo_report[repo] = process_git_status(repo_status)
            print("- - -|")
            break
            
        else:
            print(str.ljust("      "+f"{index} - {repo}", 30) + "* * WARNING - NOT FOUND * *")
            
    pprint(repos_with_paths)    
    



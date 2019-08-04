#! /usr/bin/env python

# git helper functions - listing repos
# find all repos on local machine that match those
# in the online user profile - GitAPI

import os                   # chdir(dir), getcwd
import sys                  # no __func__ use 'sys._getframe().f_code.co_name'
import subprocess           # subprocess.run(command, arg)
import re                   # regular expresions
import json                 # json parsing

from datetime import datetime   # timstamp - epoch calcs
# import datetime # means that . . 
# The people who made the datetime module also named their class datetime:
# module  class    method
# datetime.datetime.strptime(date, "%Y-%m-%d")

import glob                 
from pprint import pprint   # giza a look

from pathlib import Path    # working with paths - # https://docs.python.org/3/library/pathlib.html
import logging              # include various levels of debugging - https://docs.python.org/3/howto/logging.html



# create directory (and subdirectory if NO exist)    
local_scratch_dir = Path("./scratch/")
local_scratch_dir.mkdir(parents=True, exist_ok=True)
# configure basic logging - create new file each time
#logging.basicConfig(filename='scratch/git_helper.log', filemode='w', level=logging.INFO, format='%(asctime)s %(message)s')

# levels lowest to highest: DEBUG, INFO, WARNING, ERROR, CRITICAL
# logging.basicConfig(level=logging.INFO, format='%(asctime)s %(message)s')   # add time & date info

logging.basicConfig(level=logging.INFO)   # set level
#logging.basicConfig(level=logging.DEBUG)   # set level



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



def get_list_of_files_from_gits_status_subset(text, header=''):
    # by this point the subsection header has been removed
    # all that's left is hints in brackets & files of interest

    # re.DOTALL, re.S  -  Make . match any character, including newlines.
    # re.MULTILINE, re.M - Multi-line matching, affecting ^ and $.
    # return re.findall(r'\t(.*?)$', text, re.M | re.S)
    subset_of_files = re.findall(r'\t(.*?)$', text, re.M)  # return list ['file_one.js','file_two.txt']
        
    return [ a.replace('modified:   ','') for a in subset_of_files ]
    



def process_git_status(git_status_response):
    status_dict = {}
            
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
    
    # any of the above section may or may not be present in the git status output.
    # start at the end and remove sections one by one
    search_and_split_list = {'untracked':'Untracked files:',
                             'not_staged':'Changes not staged for commit:',
                             'changes_to_commit':'Changes to be committed:'}
    TO_KEEP_PROCESSING = 0
    OF_INTEREST = 1
    
    for key in search_and_split_list:
        
        # see if section header is in the output
        #if git_status_response.find(search_and_split_list[key]) > -1:   # return position or -1 not found
        if search_and_split_list[key] in git_status_response:            # returns True or False
            
            # split the end off and retrive files
            halves = git_status_response.split(search_and_split_list[key])
            
            git_status_response = halves[TO_KEEP_PROCESSING]
            
            status_dict[key] = get_list_of_files_from_gits_status_subset(halves[OF_INTEREST])
    
    
    return(status_dict)


def get_status_of_local_git_repos(repo_list, debug_level=0):
    repo_report = {}

    repos_with_paths = find_all_local_git_repos()

    for index, repo in enumerate(repo_list):
        
        if repo in repos_with_paths:
            logging.debug(str.ljust(" - - - - - - - - - - - - - - - - - FOUND "+f"{index} - {repo}", 30) + f"  {repos_with_paths[repo]}")
            
            # the default in inverted commas is returned if value not in dict
            repo_to_check_path = repos_with_paths.pop(repo, "lightening_bolts_of_wtf?")                                             
            
            logging.debug(f"\n\nChecking REPO: {repo}     - - - - - <")
            pprint(repo_to_check_path)
            os.chdir( Path(repo_to_check_path).joinpath(repo) )
            #logging.debug(os.getcwd())
            
            repo_status = subprocess.run(['git', 'status'], stdout=subprocess.PIPE).stdout.decode('utf-8')
            #repo_status = subprocess.run(['git status', ''], stdout=subprocess.PIPE).stdout.decode('utf-8')
            
            logging.debug(f"\n- - returned from shell - - {repo}")
            logging.debug(repo_status)
            repo_report[repo] = process_git_status(repo_status)            
            
            # get latest activity and when most active
            for key, value in get_date_info().items():
                repo_report[repo][key] = value
            
            # get status, heat & next steps
            for key, value in get_status_info().items():
                repo_report[repo][key] = value          
            
            
            logging.debug("- - - - - - - - - - - - - - - - - - - -|")
            
        else:
            logging.debug(str.ljust("      "+f"{index} - {repo}", 30) + "* * WARNING - NOT FOUND * *")

    return repo_report


def display_repo_data_to_console(repo_report):
    logging.debug('')
    logging.info("")
    logging.info("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ")
    logging.info(f"Status of all repos belonging to user: {repo_payload_dict['user']}")
    logging.info("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ")
    
    for repo in repo_report:
        logging.info(f"- - - - - - - - - - - - - - - - - - : {repo} <<")
        #pprint(repo_report[repo])
        logging.info(repo_report[repo])
        logging.info(f"\n")
    logging.info("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ")

def get_status_info(context_file='./context.md'):
        
    status_text = ''
    status_heat = ''
    status_next = ''    
    status_text_regex = '## Status:(.*?)^\[(\w+)\]'
    status_next_regex = '### Next steps(.*?)^### Completed'
    
    if Path(context_file).exists():    
        with open(context_file) as f:
            context = f.read()
            
            # get status test and heat(RED, AMBER, GREEN, BLUE)
            try:
                match = re.search(status_text_regex, context, re.S | re.M)
                status_text = match.group(1).strip()
                status_heat = match.group(2).strip()        
            
            except (AttributeError, IndexError) as e:
                logging.info(f"Exception: IndexError in {__file__}/{sys._getframe().f_code.co_name} TEXT/HEAT")
                
            try:
                match = re.search(status_next_regex, context, re.S | re.M)
                pre_process_text = match.group(1)
                
                # remove md CRLF (space,space \n) replace with HTML CRLF (<br>)
                status_next = '<br>'.join( [line.strip() for line in pre_process_text.strip().splitlines()] ) 
            
            except (AttributeError, IndexError) as e:
                #logging.info(f"Exception: IndexError in {__func__} NEXT STEPS")
                logging.info(f"Exception: IndexError in {__file__}/{sys._getframe().f_code.co_name} NEXT STEPS")
                
    return {
        'status_text':status_text,
        'status_heat':status_heat,
        'status_next':status_next
    }



#$ git log -1 | grep Date  >Date:   Fri Aug 2 11:29:08 2019 +0100
def get_date_info():
    
    try:
        date_touch = 0
        date_general = 0
        
        # NOPE
        #date_cli_return = subprocess.run(['git log -1', ''], stdout=subprocess.PIPE).stdout.decode('utf-8')
    
        # NOPE
        #date_cli_return = subprocess.run(['git', 'log -1'], stdout=subprocess.PIPE).stdout.decode('utf-8')
    
        # OK
        #date_cli_return = subprocess.run(['git', 'log','-1'], stdout=subprocess.PIPE).stdout.decode('utf-8') # last push
        date_cli_return = subprocess.run(['git', 'log'], stdout=subprocess.PIPE).stdout.decode('utf-8')     # all pushes
        
        # NOPE
        #date_cli_return = subprocess.run(['git', 'log','-1','|','grep','Date'], stdout=subprocess.PIPE).stdout.decode('utf-8')
        # Ahh . . .
        # Normally, each call to run, check_output, or the Popen constructor executes a single program.
        # That means no fancy bash-style pipes. If you want to run complex shell commands, you can pass shell=True,
        # which all three functions support.
        # https://stackoverflow.com/questions/4760215/running-shell-command-and-capturing-the-output
        # https://stackoverflow.com/questions/6341451/piping-together-several-subprocesses
    
        #['Fri Aug 2 11:29:08 2019 +0100']
        #  '%a %b %d %H:%M:%S %Y %z'
        # parse to datetime
        # print( datetime.strptime(push_dates[0], '%a %b %d %H:%M:%S %Y %z') )
        # turn to seconds since epoch
        # print( datetime.strptime(push_dates[0], '%a %b %d %H:%M:%S %Y %z').timestamp() )
        # turn back again
        # print( datetime.fromtimestamp(datetime.strptime(push_dates[0], '%a %b %d %H:%M:%S %Y %z').timestamp()) )
    
        git_push_dates = re.findall(r'^Date:   (.*?)$', date_cli_return, re.M | re.S)   # 'Tue Jun 18 21:59:55 2019 +0100'
        
        time_format = '%a %b %d %H:%M:%S %Y %z'
        
        epochs = [ datetime.strptime(d, time_format).timestamp() for d in git_push_dates ]
        
        date_touch = epochs[0]                     # last put back date
        
        date_general = sum(epochs) / len(epochs)   # average date so a single file push or edit doesn't skew order
        
        # print("- - - Data - - - S")
        # print(f"touch s epoch: {date_touch}")
        # print(f"touch date: {datetime.fromtimestamp(date_touch)}")
        # print(f"general s epoch: {round(date_general,0)}")
        # print(f"general date: {datetime.fromtimestamp(round(date_general,0))}")    
        # print("- - - Data - - - E")
    except NotImplementedError:
        print('get_date_info() should be run from the appropriate git directory')
        
    finally:        
        return { 'date_general':round(date_general,0), 'date_touch':date_touch }
    
    
if __name__ == '__main__':
    
    # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    # finding local repos
    # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    # example output:
    # FOUND 0 - gdb_lldb            /Users/simon/a_syllabus/lang/c++/repos/
    # FOUND 1 - openFrameworks      /Users/simon/a_syllabus/lang/c++/repos/
    # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    
    repos_with_paths = find_all_local_git_repos()
                    
    # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    
    # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    # converting from and to JSON strings and dictionaries
    # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 2
    repo_payload_dict = {'user': 'UnacceptableBehaviour','repos': ['00_flask', '01_flask', '02_flask_js_mysql', 'ajax_cc', 'assest_server', 'bootstrap_4', 'dom_js', 'fetch_js', 'gdb_lldb', 'heroku_nubes', 'html_label', 'js_intro_msgQ', 'label', 'linux_bike', 'mysql_python', 'nutri_scrape', 'promise_await', 'python_koans', 'shoes4', 'sketchup']}
    repo_payload_json_string = json.dumps(repo_payload_dict)

    # DICT to work with   
    repo_dict = json.loads(repo_payload_json_string) # JSON FROM BROWSER
    
    # create a list of repo names to work with (and compare to local repos)    
    repo_list = repo_dict['repos']    
    print(f"No of repos in JSON: {len(repo_list)}")

    
    # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    # go through repo list and get status
    # - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    repo_report = get_status_of_local_git_repos(repo_list)
    pprint(repo_report['00_flask'])
    display_repo_data_to_console(repo_report)
    
    
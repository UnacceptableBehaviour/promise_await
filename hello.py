#! /usr/bin/env python

from flask import Flask, render_template, request, jsonify
app = Flask(__name__)


# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


# dev remove
from helpers import get_igd_vocab
from git_helpers import find_all_local_git_repos, get_status_of_local_git_repos
import json

# giza a look
from pprint import pprint
import re



# each app.route is an endpoint
@app.route('/')
def hello_world_js_examples():
    test_version = '0.0.0'
    print(f"==|| Vs: {test_version}")
    
    recipe  = { 'ri_name': 'pulpo gallego' }
    recipes = [ recipe ]
    vocab = get_igd_vocab()
    helper_data = { 'vocab': vocab }
    script_example = 'auto_complete.js'
    script_example = 'async_await.js'
    
    
    return render_template('js_example_selector.html', recipes=recipes, helper_data=helper_data, script_example=script_example)
# doesn't curently take template setup into account
'''
  JS examples
  <!--<script src="static/callbacks.js"></script>-->  
  <!--<script src="static/promises.js"></script>-->  
  <!--<script src="static/promises_promises.js"></script>-->
  <!--<script src="static/more_promises.js"></script>-->
  <script src="static/async_await.js"></script>
  <!--<script src="static/async_await_ax1iii.js"></script> NOT FUNCTIONAL -->
  <!--<script src="static/auto_complete.js">AUTO COMPLETE</script>-->
  <!--<script src="static/auto_complete.js"></script>-->
'''




@app.route('/git_report', methods=["GET", "POST"])
def git_report():
    headline_py = "Sending data back . . ."
    repo_data = {}
    
    repositories = find_all_local_git_repos()
    
    for k in repositories:
        print(f"{k}\t in: {repositories[k]}")
    
    repo_data['local'] = repositories
    
    return render_template('repo_report.html', repo_data=repo_data)



@app.route('/js_fetch_test', methods=["GET", "POST"])
def js_fetch_test():
    headline_py = "Sending data back . . ."
    recipes = {}
    
    # POST request
    if request.method == 'POST':
        #print('Incoming . . yeay!! . . victory dance . . . aruba aruba aruba')
        pprint(request)
        posted_data = request.get_json() # parse JSON into DICT        
        print(posted_data)
        print("= - = - = - = - = - = - = POST S")
        print(posted_data['repos'])
        repo_report = get_status_of_local_git_repos(posted_data['repos'])
        
        for r in repo_report:
            print(f"{r}: {repo_report[r]['status_next']}")
            pprint(repo_report[r])
        
        #repo_report['greeting'] = 'Return from POST'
        
        #return 'OK', 200
        return json.dumps(repo_report), 200
        #return render_template('js_fetch_both_ways_example.html', repo_data=repo_report)

    # GET request
    else:
        message = {'greeting':'Hello from Flask!'}
        #return jsonify(message)  # serialize and use JSON headers
        #return render_template('js_fetch_both_ways_example.html', repo_data=jsonify(message))
        return render_template('js_fetch_both_ways_example.html', repo_data=message)


if __name__ == '__main__':
    # setup notes:
    # https://github.com/UnacceptableBehaviour/00_flask/blob/master/README.md
    # http://flask.pocoo.org/docs/1.0/config/
    # export FLASK_ENV=development add to ~/.bash_profile
    app.run(host='0.0.0.0', port=50096)

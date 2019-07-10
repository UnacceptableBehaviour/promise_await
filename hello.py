#! /usr/bin/env python

from flask import Flask, render_template, request
app = Flask(__name__)

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


# dev remove
from helpers import get_igd_vocab


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
    
    
    return render_template('js_example_selector.html', recipes=recipes, helper_data=helper_data, script_example=script_example)
# doesn't cuurently take template setup into account
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
    recipes = {}
    return render_template('repo_report.html', recipes=recipes)


if __name__ == '__main__':
    # setup notes:
    # https://github.com/UnacceptableBehaviour/00_flask/blob/master/README.md
    # http://flask.pocoo.org/docs/1.0/config/
    # export FLASK_ENV=development add to ~/.bash_profile
    app.run(host='0.0.0.0', port=50096)

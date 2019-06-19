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
def db_hello_world():
    test_version = '0.0.0'; print(f"==|| Vs: {test_version}")
    
    recipe  = { 'ri_name': 'pulpo gallego' }
    recipes = [ recipe ]
    vocab = get_igd_vocab()
    helper_data = { 'vocab': vocab }
    
    return render_template('index.html', recipes=recipes, helper_data=helper_data)


# @app.route('/twonky_donuts', methods=["GET", "POST"])
# def buttons_inputs():
#     headline_py = "Sending data back . . ."
#     recipes = {}
#     return render_template('index.html', recipes=recipes)


if __name__ == '__main__':
    # setup notes:
    # https://github.com/UnacceptableBehaviour/00_flask/blob/master/README.md
    # http://flask.pocoo.org/docs/1.0/config/
    # export FLASK_ENV=development add to ~/.bash_profile
    app.run(host='0.0.0.0', port=50096)

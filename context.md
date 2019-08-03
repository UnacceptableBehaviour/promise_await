# Context
## Status: Adding status reporting to rep list. WIP
[AMBER]

## Contents
1. [Status: Adding status reporting to rep list. WIP](#status-adding-status-reporting-to-rep-list-wip)
2. [Contents](#contents)
	1. [Next steps](#next-steps)
	2. [Completed](#completed)
3. [Questions / Barriers](#questions--barriers)
4. [How To's](#how-tos)
	1. [How do I insert a TOC?](#how-do-i-insert-a-toc)
	2. [How do I auto generate TOC?](#how-do-i-auto-generate-toc)
5. [TIPS](#tips)
6. [REFERENCES](#references)
	1. [Markdown cheat sheet](#markdown-cheat-sheet)
	2. [GFM - Git Flavoured Markdown](#gfm--git-flavoured-markdown)

### Next steps
Order repos by last touch (or average touch: 'general_date': 1563990008.0).  
See how may anti patterns we've trodden in: Promises & their anti patterns  
(https://www.nearform.com/blog/javascript-promises-the-definitive-guid)   
Break git tool out into separate repo and park it  
Finish JS auto complete exercize  


### Completed
2019.Aug.03 - Create an Open readme  button for each repo with href to README.md for that repo  
2019.Aug.03 - Set background colour according to status (Use blue for parked)
2019.Aug.03 - Report next steps in card - repo report  
2019.Aug.02 - Update sequence diagram of report.  
2019.Aug.02 - Get next steps & status colour & reason from context.md  
2019.Aug.02 - Combine ‘Get Data’ & ‘Git Status’ functionality into one button.  
2019.Aug.02 - Get last commit from each repo using ```$ git log -1```  
2019.Aug.01 - Draw sequence diagram of report.  
2019.Jul.31 - Added auto gen TOC see HowTo: create_TOC_for_md.py  
2019.Jul.25 - Create context.md layout template based on FTD doc.  
2019.Jul.14 - Use JS to display the results  
2019.Jul.13 - Bootstrap report card  
2019.Jul.12 - de-noise console outs by adding logging to JS  
Pass data back from Python to JS  
Interrogate local repos  
Pass data from JS to Python  
Access GIT using Git API in JS  


## Questions / Barriers






## How To's
### How do I insert a TOC?
To creat a link to a chapter in MD:
```
[Text to Display](#text-from-title)\
[Q's & How To's](#qs--how-tos)\
```

The text-from-title is the the text from the title downcased, with spaces replaced with a hyphen '-' and non alphanumeric characters removed. So "Q's & How To's" becomes '#qs--how-tos'
The '\\' at the end of the line is same as <br> or CRLF. (New line)

To create a TOC, create a numbered list of links. Tab in next level with new numbers.
```
1. [Current status](#status)  
2. [Contents](#contents)  
3. [Next steps](#next-steps)  
4. [Completed](#completed)  
5. [Q's & How To's](#qs--how-tos)  
    1. [Adding tabs to content links](#adding-tabs-to-content-links)   
    2. [Auto generaging TOC](#auto-generaging-toc)  
6. [Tips on context doc](#tips)  
7. [References](#references)  
```

### How do I auto generate TOC?
```
$ cd /lang/linux_mix/linux_bike             # cd into repo - same dir as the README.md file
                                            # or context.md file
$ spe                                       # venv for python scrips
                                            # alias spe='. /repos/python_scripts/venv/bin/activate'   
$ create_TOC_for_md.py                      # run script
                                            # paste output into .md file TOC
```



## TIPS
Keep status concise:  
start w/ RED, AMBER, GREEN (colours report box)  

<br>/CRLF in markdown is endline \\ or two spaces


## REFERENCES
### Markdown cheat sheet
https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet

### GFM - Git Flavoured Markdown
https://github.github.com/gfm/

import os
from posixpath import basename
import sys
from pathlib import Path
import re
import shutil
from distutils.dir_util import copy_tree

outDir = "./bin/"

tsc = False
sass = False
html = False
assets = False
deploy = False


def hr():
    print("================================")


def title(t):
    print('\033[95m'+str(t)+'\033[0m')


def info(i):
    print('\033[0m'+str(i)+'\033[0m')


def error(e):
    print('\033[91m'+str(e)+'\033[0m')


for arg in sys.argv:
    if arg == "-all":
        tsc = True
        sass = True
        html = True
        assets = True
        deploy = True
    else:
        if arg == "-tsc":
            tsc = True
        else:
            if arg == "-sass":
                sass = True
            else:
                if arg == "-html":
                    html = True
                else:
                    if arg == "-assets":
                        assets = True
                    else:
                        if arg == "-deploy":
                            deploy = True


if assets:
    title("assets")
    if os.path.isdir(outDir):
        shutil.rmtree(outDir)
    for file in copy_tree("./src/assets/", outDir):
        info(file)
    hr()

if tsc:
    title("tsc")
    if os.system("tsc -p ./tsconfig.json --pretty") != 0:
        exit(1)
    hr()

if sass:
    title("sass")
    style = open(outDir+"style.css", "w+")
    style.write("")
    style.close()
    style = open(outDir+"style.css", "a")

    for file in list(Path(".").rglob("*.scss")):
        fileBasename = os.path.basename(file)
        if fileBasename.startswith("_"):
            continue
        compiledFile = "temp/" + \
            fileBasename.replace(".scss", ".css")
        if os.system("sass "+str(file)+" " + compiledFile +
                  " --style compressed --no-source-map --update") != 0:
            exit(1)
        cssTemp = open(compiledFile, "r")
        txt = cssTemp.read()
        style.write(txt)
        cssTemp.close()

    for file in list(Path(".").rglob("*.sass")):
        fileBasename = os.path.basename(file)
        if fileBasename.startswith("_"):
            continue
        compiledFile = "temp/" + \
            fileBasename.replace(".sass", ".css")
        if os.system("sass "+str(file)+" " + compiledFile +
                  " --style compressed --no-source-map --update") != 0:
            exit(1)
        cssTemp = open(compiledFile, "r")
        txt = cssTemp.read()
        style.write(txt)
        cssTemp.close()

    style.close()
    hr()

if html:
    title("html")
    for file in copy_tree("./src/html/", outDir):
        if file.endswith(".html"):
            info(file)
        else:
            os.remove(file)
    hr()

if deploy:
    title("deploy")
    os.system("firebase deploy")
    hr()
title("Done!")
exit()

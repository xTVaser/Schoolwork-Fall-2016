import tkinter as tk
from tkinter import filedialog
from os import listdir
from os.path import isfile, join

#Import Custom Libraries
from libs.requestStripper import *


file_path = "/home/tyler/Documents/Thesis Testing"#tk.filedialog.askdirectory()
print(file_path)

files = [f for f in listdir(file_path) if isfile(join(file_path, f))]
for i, value in enumerate(files):
    files[i] = file_path + "/" + files[i]

print(files)

lines = []
for f in files:
    gatherStrings(lines, f)



newFile = open(file_path+"/"+"compiledRequests", "w")

exportFile(lines, newFile)
newFile.close()







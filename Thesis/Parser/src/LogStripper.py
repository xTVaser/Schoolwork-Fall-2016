import tkinter as tk
from tkinter import filedialog
from os import listdir
from os.path import isfile, join

def gatherStrings(array, file):
    for line in open(file):
        array.append(line)

file_path = "/home/tyler/Documents/Thesis Testing"#tk.filedialog.askdirectory()
print(file_path)

files = [f for f in listdir(file_path) if isfile(join(file_path, f))]
for i, value in enumerate(files):
    files[i] = file_path + "/" + files[i]

print(files)

lines = []
for f in files:
    gatherStrings(lines, f)

def exportFile(lines, file):
    for l in lines:
        request = l.split("\"")[1]
        file.write(request+"\n")

newFile = open(file_path+"/"+"compiledRequests", "w")

exportFile(lines, newFile)
newFile.close();







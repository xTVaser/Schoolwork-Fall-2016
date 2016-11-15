import tkinter as tk
from tkinter import filedialog
from os import listdir
from os.path import isfile, join

file_path = tk.filedialog.askdirectory()
print(file_path)

files = [f for f in listdir(file_path) if isfile(join(file_path, f))]
print(files)





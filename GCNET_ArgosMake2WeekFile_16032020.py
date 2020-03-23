#!/usr/bin/python
#%%%% 14 Day Data File Creation %%%%
#% This function checks if a station csv file exists and reads the last
#% 24hr * 14 days = 336 lines it then outputs to a csv
#% file with the _v (for visualation) suffix

#%written by Derek Houtz Birmensdorf, Modified 15.10.2018
#converted to python
import numpy as np
import datetime

def WriteCFile(fid,DatasetN):
    if len(DatasetN)!=0:
        formstr = '%i,%4i,%.4f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f'
        np.savetxt(fid,DatasetN,fmt=formstr)
    else:
        np.savetxt(fid,DatasetN)

AStation_numbers = np.array([4,5,7,22,31,32,33])
stations = AStation_numbers;
numlines = 24*14; #this is 2 weeks of data assuming max transmission every hour

today = datetime.datetime.now()
doynow = (today - datetime.datetime(today.year, 1, 1)).days + 1
yearn = today.year

#2 weeks will not be longer than this length
for i in range(len(stations)):
    filename = str(stations[i])+'.csv'
    #find if there are at least numlines in file
    with open(filename,"rb") as f:
         lines = f.readlines()
    lineCount = len(lines)
    if lineCount >=numlines:
        twoweeks = np.genfromtxt(lines[-numlines:],delimiter=',')# get the lines from
        #file without reading whole csv into memory
        doyv = twoweeks[:,2]
        yrv = twoweeks[:,1]
        if doynow>14:
            twoweeks=twoweeks[(doyv>=doynow-14) & (yrv==yearn),:]
        else:
            twoweeks=twoweeks[(doyv>=365-14+doynow) & (yrv>=yearn-1),:]
    else:
        twoweeks = np.array([])
    newfilename = str(stations[i])+'_v.csv'
    with open(newfilename,'w') as fidn:
       WriteCFile(fidn,twoweeks)

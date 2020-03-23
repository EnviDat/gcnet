#!/usr/bin/python
import numpy as np
import os
import datetime
import warnings

def WriteCFile(fid,DatasetN):
    if len(DatasetN)!=0:
        formstr = '%i,%4i,%.4f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f'
        try:
            np.savetxt(fid,DatasetN,fmt=formstr)
            print "Successfully saved "+str(len(DatasetN[:,1]))+" entries to file: "+str(fid.name)
        except:
            print "Error writing CSV: WriteCFile in GoesMain"
    else:
        np.savetxt(fid,DatasetN)

#check for reset bool in reset file
try:
     f = open("GOESRESET.txt","r")
     flagval = f.read()
     flag = int(flagval)
     if flag==1:
         newloadflag = 1
     else:
         newloadflag = 0
except IOError:
    newloadflag = 1
#load temp file
try:
   ftemp = open("goestemp.dat","r")
   with warnings.catch_warnings():
       warnings.simplefilter("ignore")  #ignores warnings about lines with incorrect columns (some columns are corrupt and missing values)
       tempraw = np.genfromtxt(ftemp,missing_values=("*******","******","*****","****","***","**","*"),filling_values=999,invalid_raise=False,loose=True)
   gmat=np.array(tempraw)
except:
    print "Error Loading goestemp.txt, check fortran exe or timing"

#define limits for filtering for all stations
swmax = 1300 #W/m2 the full strength of the sun
swmin = 0
hmpmin = -40 #this is the measurement range of the HMP temp sensor
hmpmax = 50 #this is hottest hopefully ever
tcmax = 50
tcmin = -100
wmax = 50# wind max m/s
wmin = 0 #wind min m/s
wdmax = 360
wdmin = 0
pmin = 500 #this is low pressure
pmax = 1200 #this is high pressure
rhmax = 130 #no more than 130# humidity sensors can have noise above 100%
rhmin = 0
shmin = -10 #this is conservative
shmax = 10  #max height above snow - sonic sensor, usually have really
#high values when bad
battmin = 8 #loggers & instruments unlikely to work
battmax = 24 #hopefully the highest ever would be 16 or else there
#are serious problems
# GOES Processing Sequence

# GOES Station IDs and names
#(00)   8030A1E0 SC-10m - Swiss Camp 10 meter Tower
#(01)   80300118 SC     - Swiss Camp AWS
#(02)   8030126E CP1    - Crawford Point
#(03)   8030D770 NASA-U - NASA-U
#(06)   803027F4 SUM    - Summit Station
#(08)   803064FE Dye2   - Dye-II
#(09)   80303482 JAR1   - JAR-1
#(10)   80307788 Saddle - Saddle
#(11)   80305164 S-Dome - South Dome
#(12)   8030E2EA NASA-E - NASA East
#(15)   8030870C NASA-SE- NASA South-East
#(23)   8030C406 NEEM   - NEEM
#(24)   8030947A EGRIP  - East GRIP
#(30)   80304212 LAR1   - LAR1

GStation_numbers = np.array([0,1,2,3,6,8,9,10,11,12,15,23,24,30]) #this vector
#contains the (c-level) standard station number in the order in which we will process
#these data.  The cell array data{} will contain each station's data
#indexed by this station number

# Define GOES Station calibration constants and limits
swincal = np.multiply(200.,np.ones((len(GStation_numbers),1)))
swoutcal = np.multiply(200.,np.ones((len(GStation_numbers),1)))
swoutcal[1] = 71.9  #swiss camp
swoutcal[3] = 77    #NASA-U
swincal[8]=62       #south dome
swoutcal[8]=72.789  #south dome
swincal[9]=71.429  #NASA-E has different cal
swoutcal[9]=70.748 #NASA-E has different cal
swincal[13] = 74.4  #LAR
swoutcal[13]=68.6   #LAR
# The calibration coefficients are extracted from the
# QC->Ancillary->Defaults->CalibrationDefault.cal files in the QC software
#                      0  1   2   3   6    8     9    10    11   12   15   23  24  30
swnetcal_pos=np.array([80,80,80,9.43, 80,78.74,9.29, 9.29, 9.29,9.29,9.79,9.29,80,13.9])
swnetcal_neg=np.array([80,80,80,11.77,80,78.74,11.54,11.53,11.7,11.7,11.7,11.7,80,13.9])
poffset = 400*np.ones((len(GStation_numbers),1)) #400mb offset for pressures
poffset[5] = 600 #DYE-II has 600mb offset
poffset[11] = 300 #NEEM has a different offset 300 mb
poffset[12] = 300 #E-GRIP has 300mb offset

for i in range(len(GStation_numbers)):
    sid = GStation_numbers[i]
    print "Processing Station #"+str(sid)+"..."
    if gmat.size!=0:
        adata=np.array(gmat[gmat[:,1]==sid,:]) #find data associated with each
        u,IA = np.unique(adata[:,5:],axis=0,return_index=True) #find rows with unique data
        #     % after column 5 because data may repeat with different time signature
        adata=adata[np.sort(IA),:]
        adata = adata[(adata[:,2]>1990) & (adata[:,2]<2050) & (adata[:,3]>=0) & (adata[:,3]<367),:] #filter realistic time
        # #(positive and less than 367 JD, leap year will have 366 days)
        # # and sensible year
        if len(adata)!=0:
            if sid==0:  #if 10 meter tower
                gdata=np.ones((np.size(adata,0),43))*999
                gind = np.concatenate((np.arange(0,7),np.arange(8,20),np.array([30,34,35,38,39])))
                aind = np.concatenate((np.arange(1,8),np.arange(8,20),np.array([24]),np.arange(20,24)))
                #print gind
                #print aind
                gdata[:,gind]=adata[:,aind] #format is
            elif sid==24: #if East GRIP
                gdata=np.ones((np.size(adata,0),43))*999
                gind = np.concatenate((np.arange(0,7),np.arange(8,20),np.array([30]),np.arange(34,43)))
                aind = np.concatenate((np.arange(1,8),np.arange(8,20),np.array([31]),np.arange(22,31)))
                gdata[:,gind]=adata[:,aind] #format is
                # #different for this station: no snow temp, only 2 radiation
                # #statistic measurements
            elif sid==30: #if PE Blue
                gdata=np.ones((np.size(adata,0),43))*999
                gind = np.concatenate((np.arange(0,20),np.array([30,31,32]),np.arange(34,40)))
                aind = np.concatenate((np.arange(1,21),np.array([29]),np.arange(21,29)))
                # gdata(:,[1:20,31,32,33,35:40])=adata(:,[1:20,29,21:28]); %format is
                gdata[:,gind]=adata[:,aind]
                # #different for this station: no snow temp, only 2 radiation
                # #statistic measurements
            else:  #if normal station
                # #this vector is made from looking at C-level columns and find index
                # # of raw data that matches
                aind = np.concatenate((np.arange(1,8),np.arange(18,31),np.arange(8,18),np.array([43]),np.arange(31,43)))
                # rawindex = [1:7,18:30,8:17,43,31:42];
                # gdata=adata(:,rawindex); %put data into pseudo C-level format!
                gdata=np.array(adata[:,aind])
            gdata[gdata==-8190]=999
            gdata[gdata==2080]=999
            #print gdata[-1,0:5]

            yr = gdata[:,1]    #get year data
            jday = gdata[:,2]+gdata[:,3]/24   #calculate fractional julian day
            datenum = yr*1e3+jday  #number that is ascending in time
            udatenum,unind = np.unique(datenum,axis=0,return_index=True) #find only unique time stamps
            if len(unind)<len(datenum):
                numduptime = len(datenum)-len(unind)
                print "Warning: Removed "+str(numduptime)+" entires out of: "+str(len(datenum))+" good pts from station ID: "+str(sid)+" Reason: duplicate time tags"
            tind=np.argsort(datenum[unind])     #find indexes of a sort of unique values along time

            gdata=gdata[tind,:] #crop data array to unique times
            jday = jday[tind]   #crop jday vector to unique times
            yr = yr[tind]
            datenum = datenum[tind] #leave only unique and sorted datenums
            stnum = gdata[:,0] #get station number vector

            SWin = gdata[:,4]*swincal[i] #assign and calibrate incoming shortwave
            SWin[SWin<swmin]=999     #filter low
            SWin[SWin>swmax]=999   #filter high

            SWout = gdata[:,5]*swoutcal[i] #assign and calibrate outgoing shortwave
            SWout[SWout<swmin]=999     #filter low
            SWout[SWout>swmax]=999   #filter high
            # #assign and calibrate net shortwave, negative and positive values
            # #have different calibration coefficients according to QC code
            SWnet = 999*np.ones(np.size(SWout,0))
            SWnet[gdata[:,6]>=0]=gdata[gdata[:,6]>=0,6]*swnetcal_pos[i]
            SWnet[gdata[:,6]<0] =gdata[gdata[:,6]<0,6]*swnetcal_neg[i]

            SWnet[SWnet<-swmax]=999     #filter low
            SWnet[SWnet>swmax]=999   #filter high

            TC1 = gdata[:,7] #thermocouple 1
            TC1[TC1<tcmin]=999     #filter low
            TC1[TC1>tcmax]=999   #filter high
            TC2 = gdata[:,8] #thermocouple 2
            TC2[TC2<tcmin]=999     #filter low
            TC2[TC2>tcmax]=999   #filter high
            HMP1 = gdata[:,9] #HMP1 temp
            HMP1[HMP1<hmpmin]=999     #filter low
            HMP1[HMP1>hmpmax]=999   #filter high
            HMP2 = gdata[:,10] #HMP2 temp
            HMP2[HMP2<hmpmin]=999     #filter low
            HMP2[HMP2>hmpmax]=999   #filter high

            RH1 = gdata[:,11]            #HMP relative humidity 1
            RH1[RH1<rhmin]=999     #filter low
            RH1[RH1>rhmax]=999     #filter high
            RH2 = gdata[:,12]            #HMP relative humidity 2
            RH2[RH2<rhmin]=999     #filter low
            RH2[RH2>rhmax]=999     #filter high
            WS1 = gdata[:,13]           #wind speed 1
            WS1[WS1<wmin]=999     #filter low
            WS1[WS1>wmax]=999   #filter high
            WS2 = gdata[:,14] #wind speed 2
            WS2[WS2<wmin]=999     #filter low
            WS2[WS2>wmax]=999
            WD1 = gdata[:,15] #wind direction 1
            WD1[WD1<wdmin]=999     #filter low
            WD1[WD1>wdmax]=999
            WD2 = gdata[:,16] #wind direction 2
            WD2[WD2<wdmin]=999     #filter low
            WD2[WD2>wdmax]=999

            pres = gdata[:,17]+poffset[i] #barometeric pressure
            pres[pres<pmin]=999     #filter low
            pres[pres>pmax]=999   #filter high
            presd = np.diff(pres) #find difference of subsequent pressure meas
            hrdif = np.diff(jday)*24. #time diff in hrs
            mb_per_hr = np.absolute(np.divide(presd,hrdif,out=np.zeros_like(presd),where=hrdif!=0))
            pjumps=np.argwhere(mb_per_hr>10) #find jumps > 10mb/hr (quite unnatural)
            pres[pjumps+1]=999 #eliminate these single point jumps

            SH1 = gdata[:,18]  #hieght above snow 1
            SH1[SH1<shmin]=999     #filter low
            SH1[SH1>shmax]=999   #filter high
            SH2 = gdata[:,19]  #hieght above snow 2
            SH2[SH2<shmin]=999     #filter low
            SH2[SH2>shmax]=999   #filter high

            SnowTemp10 = gdata[:,20:30] #10m snow temperature (many of these are non functional or not connected)

            volts = gdata[:,30] #battery voltage
            volts[volts<battmin]=999    #filter low
            volts[volts>battmax]=999   #filter high

            SWinmax = gdata[:,31]*swincal[i]  #incoming shortwave max
            SWinmax[SWinmax<swmin]=999     #filter low
            SWinmax[SWinmax>swmax]=999  #filter high

            SWoutmax = gdata[:,32]*swoutcal[i] #reflected shortwave max
            SWoutmax[SWoutmax<swmin]=0     #filter low
            SWoutmax[SWoutmax>swmax]=999   #filter high

            SWnetmax = 999*np.ones_like(SWoutmax)
            SWnetmax[gdata[:,33]>=0]=gdata[gdata[:,33]>=0,33]*swnetcal_pos[i] #net radiation max
            SWnetmax[gdata[:,33]<0]=gdata[gdata[:,33]<0,33]*swnetcal_neg[i]
            SWnetmax[SWnetmax<-swmax]=999     #filter low
            SWnetmax[SWnetmax>swmax]=999   #filter high

            tc1max = gdata[:,34]
            tc1max[tc1max<tcmin]=999     #filter low
            tc1max[tc1max>tcmax]=999   #filter high
            tc2max = gdata[:,35]
            tc2max[tc2max<tcmin]=999    #filter low
            tc2max[tc2max>tcmax]=999   #filter high
            tc1min = gdata[:,36]
            tc1min[tc1min<tcmin]=999    #filter low
            tc1min[tc1min>tcmax]=999   #filter high
            tc2min = gdata[:,37]
            tc2min[tc2min<tcmin]=999   #filter low
            tc2min[tc2min>tcmax]=999   #filter high

            ws1max = gdata[:,38] #stats
            ws2max = gdata[:,39]
            ws1std = gdata[:,40]
            ws2std = gdata[:,41]
            Tref = gdata[:,42]
            # # note this code does not currently calculate the 2 and 10 m winds
            # # and albedo, so this is column 1-42 of the Level C data
            wdata = np.column_stack((stnum,yr,jday,SWin,SWout,SWnet,TC1,TC2,HMP1,HMP2,RH1,RH2,WS1,WS2,WD1,WD2,pres,SH1,SH2,SnowTemp10,volts,SWinmax,SWoutmax,SWnetmax,tc1max,tc2max,tc1min,tc2min,ws1max,ws2max,ws1std,ws2std,Tref)) #assemble data into final level C standard form
            today = datetime.datetime.now()
            day_of_year = (today - datetime.datetime(today.year, 1, 1)).days + 1
            theyear = today.year
            todayjday = day_of_year+today.hour/24   #calculate fractional julian day
            nowdatenum = theyear*1e3+todayjday
            wdata = wdata[datenum<nowdatenum,:] #only take entries in the past
            numfuturepts = len(np.argwhere(datenum>nowdatenum))
            if numfuturepts>0:
                print "Warning: Removed "+str(numfuturepts)+" entires out of: "+str(len(wdata[:,1])+numfuturepts)+" good pts from station ID: "+str(sid)+" Reason: time tags in future"

        else: #if no data in adata still output empty wdata array so empty file is created
            wdata = np.array([])
        filename = str(sid)+'.csv'
        if newloadflag==1:
            with open(filename,'w') as fidn:
                WriteCFile(fidn,wdata) #overwrite any existing files because
                                       #newloadflag==1 means fresh run
        else:
            try:
                fsize=os.path.getsize(filename)
                if fsize!=0: #if station file already exists append to it
                    if len(wdata) == 0: #if no new data
                        indstart = 0
                        outdat = wdata
                    else: #there is some data in the array
                        with open(filename,"rb") as f:
                            lines = f.readlines()
                        lastline=np.genfromtxt(lines[-1:],delimiter=',') # read last line of existing file
                        lastyr = lastline[:,1]    #get year data
                        lastjday = lastline[:,2]+lastline[:,3]/24   #calculate fractional julian day
                        lastdatenum = yr*1e3+jday  #number that is ascending in time, calculate last date number of old data
                        indstart = np.argwhere(datenum<=lastdatenum) #find indexs of dates in new part that are before what is already in csv
                        if len(indstart)==0: #all data new
                            indstart = 0
                            outdat = wdata
                        elif len(indstart) == len(wdata[:,1]):    #only dates before what is already there
                            outdat = np.array([])
                        else:                                     #some new data some old data
                            outdat = wdata[int(np.max(indstart))+1:,:] #begin with index after what is already in file
                    #write outdat to station_id.dat
                    with open(filename,'a') as fidn:
                        WriteCFile(fidn,outdat)
            except: #if filename doesnt exist create new file
                with open(filename,'w') as fidn:
                   WriteCFile(fidn,wdata)
                   print "No Existing "+filename+" found. Writing new .dat for this station"

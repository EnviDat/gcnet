GCNET_Main Executable

1. Prerequisites for Deployment 

Verify that version 9.3 (R2017b) of the MATLAB Runtime is installed.   

If the MATLAB Runtime is not installed, download and install the MATLAB Runtime for R2017b 
from the following link on the MathWorks website:

    http://www.mathworks.com/products/compiler/mcr/index.html
   
For more information about the MATLAB Runtime and the MATLAB Runtime installer, see 
Package and Distribute in the MATLAB Compiler documentation  
in the MathWorks Documentation Center.    

NOTE: You will need administrator rights to run the MATLAB Runtime installer. 

With the following files in the current directory:
GCNet_Main.exe
ArgosLoader_LineN.exe
GoesLoader_LineN.exe
LATEST_ARGOS.raw
LASTEST_GOES.raw
ARGOSLINE.txt
GOESLINE.txt

This executable application reads two files named "LATEST_ARGOS.raw" and "LATEST_GOES.raw" from the directory where the executable
exists.  The .txt files ARGOSLINE.txt and GOESLINE.txt contain the line number (I8 integer) in the .raw files that has been processed thus far.  
These files MUST EXIST for the program to work correctly.  If the .raw files are reset, this line number must be reset to 1 (not 0).   

The program produces formatted, calibrated, and cleaned data for the GC-net automatic weather stations.  

The outputs append to numbered CSV files.  If the station files do not exist already they are newly created.  
The numbers correspond to the station numbers and have following assignments:

Number Station Name    Station nickname
------------------------------------------
0      Swiss Camp 10m    10m   
1      Swiss Camp        sc
2      Crawford Point    cp1
3      NASA-U            nasau
4      GITS              gits
5      Humboldt          hum
6      Summit Station    summit
7      Tunu North        tunu
8      DYE-II            dye
9      JAR-1             jar1
10     Saddle
11     South Dome        sdome
12     NASA East         nasae
15     NASA South-East   nasase
22     Petermann         pet
23     NEEM         
24     East GRIP         egrip
30     LAR1
31     PE Gun
32     PE Blu
33     PE Air

The output files have the following output format:
(NOTE: erroneous values have been assigned the value 999
 or one of these values '999.00', '999', '999.999', '999999.00', '*********'
 Spurious data can still occur within the physical bounds of the parameters
 so it is not possible to perfectly filter the data.)  

| Column | Name                   | Unit                                   |
+----+----------+------------------------------+---------------------+----------------------------------------+
 1 | Station Number/ID            | Integer value                          |
 2 | Year                         | Year                                   |
 3 | Decimal Julian Day           | Day of Year.hour/24 [days]             |
 4 | SWin                         | SW_down [W m-2]                        |
 5 | SWout                        | SW_up [W m-2]                          |
 6 | Net Radiation                | Net Radiation F [W m-2]                |
 7 | Air Temperture-TC Air 1      | TC Air 1 G Air Temperature [degC]      |
 8 | Air Temperture-TC Air 2      | TC Air 2 H Air Temperature [degC]      |
 9 | Air Temperture-CS500 T Air 1 | CS500 T Air 1 I Air Temperature [degC] |
10 | Air Temperture-CS500 T Air 2 | CS500 T Air 2 J Air Temperature [degC] |
11 | Relative Humidity-RH 1       | RH 1 K Relative Humidity [%] **        |
12 | Relative Humidity-RH 2       | RH 2 L Relative Humidity [%] **        |
13 | Windspeed-U1                 | U1 M Wind Speed [m/s]                  |
14 | Windspeed-U2                 | U2 N Wind Speed [m/s]                  |
15 | Wind Direction-U Dir 1       | U Dir 1 O [deg]                        |
16 | Wind Direction-U Dir 2       | U Dir 2 P [deg]                        |
17 | Atmos Pressure               | Atmos Pressure Q [mbar]                |
18 | Snow Height 1                | Snow Height 1 R [m]                    |
19 | Snow Height 2                | Snow Height 2 S [m]                    |
20 | Snow Temperature 1           | T Snow 1 T [degC]                      |
21 | Snow Temperature 2           | T Snow 2 U [degC]                      |
22 | Snow Temperature 3           | T Snow 3 V [degC]                      |
23 | Snow Temperature 4           | T Snow 4 W [degC]                      |
24 | Snow Temperature 5           | T Snow 5 X [degC]                      |
25 | Snow Temperature 6           | T Snow 6 Y [degC]                      |
26 | Snow Temperature 7           | T Snow 7 Z [degC]                      |
27 | Snow Temperature 8           | T Snow 8 AA [degC]                     |
28 | Snow Temperature 9           | T Snow 9 AB [degC]                     |
29 | Snow Temperature 10          | T Snow 10 AC [degC]                    |
30 | Battery Voltage              | Battery Voltage [V]                    |
31 | SWinMax                      | [W m-2]                                |
32 | SWoutMax                     | [W m-2]                                |
33 | NetRadMax                    | NetRadMax[W m-2]                       |
34 | Max Air Temperture1 (TC)     | Max Air Temperture1 (TC) [degC]        |
35 | Max Air Temperture2 (TC)     | Max Air Temperture2 (TC)[degC]         |
36 | Min Air Temperture1 (TC)     | Min Air Temperture1 (TC)[degC]         |
37 | Min Air Temperture2 (TC)     | Min Air Temperture2 (TC) [degC]        |
38 | Max Windspeed-U1             | Max Windspeed-U1 [m/s]                 |
39 | Max Windspeed-U2             | Max Windspeed-U2 [m/s]                 |
40 | StdDev Windspeed-U1          | StdDev Windspeed-U1 [m/s]              |
41 | StdDev Windspeed-U2          | StdDev Windspeed-U2 [m/s]              |
42 | Ref Temperature              | Ref Temperature [degC]                 |


 
Old version:

+----+----------+------------------------------+---------------------+----------------------------------------+ 
| ID | Param_ID | Name                         | Modify_date         | Unit                                   | 
+----+----------+------------------------------+---------------------+----------------------------------------+ 
|  1 |        4 | SWin                         | 2011-12-02 14:30:32 | SW_down [W m-2]                        | 
|  2 |        5 | SWout                        | 2011-12-02 14:30:32 | SW_up [W m-2]                          | 
|  3 |        6 | Net Radiation                | 2011-12-02 14:30:32 | Net Radiation F [W m-2]                | 
|  4 |        7 | Air Temperture-TC Air 1      | 2011-12-02 14:30:32 | TC Air 1 G Air Temperature [degC]      | 
|  5 |        8 | Air Temperture-TC Air 2      | 2011-12-02 14:30:32 | TC Air 2 H Air Temperature [degC]      | 
|  6 |        9 | Air Temperture-CS500 T Air 1 | 2011-12-02 14:30:32 | CS500 T Air 1 I Air Temperature [degC] | 
|  7 |       10 | Air Temperture-CS500 T Air 2 | 2011-12-02 14:30:32 | CS500 T Air 2 J Air Temperature [degC] | 
|  8 |       11 | Relative Humidity-RH 1       | 2011-12-02 14:30:32 | RH 1 K Relative Humidity [%] **        | 
|  9 |       12 | Relative Humidity-RH 2       | 2011-12-02 14:30:32 | RH 2 L Relative Humidity [%] **        | 
| 10 |       13 | Windspeed-U1                 | 2011-12-02 14:30:32 | U1 M Wind Speed [m/s]                  | 
| 11 |       14 | Windspeed-U2                 | 2011-12-02 14:30:32 | U2 N Wind Speed [m/s]                  | 
| 12 |       15 | Wind Direction-U Dir 1       | 2011-12-02 14:30:32 | U Dir 1 O [deg]                        | 
| 13 |       16 | Wind Direction-U Dir 2       | 2011-12-02 14:30:32 | U Dir 2 P [deg]                        | 
| 14 |       17 | Atmos Pressure               | 2011-12-02 14:30:32 | Atmos Pressure Q [mbar]                | 
| 15 |       18 | Snow Height 1                | 2011-12-02 14:30:32 | Snow Height 1 R [m]                    | 
| 16 |       19 | Snow Height 2                | 2011-12-02 14:30:32 | Snow Height 2 S [m]                    | 
| 17 |       20 | Snow Temperature 1           | 2011-12-02 14:30:32 | T Snow 1 T [degC]                      | 
| 18 |       21 | Snow Temperature 2           | 2011-12-02 14:30:32 | T Snow 2 U [degC]                      | 
| 19 |       22 | Snow Temperature 3           | 2011-12-02 14:30:32 | T Snow 3 V [degC]                      | 
| 20 |       23 | Snow Temperature 4           | 2011-12-02 14:30:32 | T Snow 4 W [degC]                      | 
| 21 |       24 | Snow Temperature 5           | 2011-12-02 14:30:32 | T Snow 5 X [degC]                      | 
| 22 |       25 | Snow Temperature 6           | 2011-12-02 14:30:32 | T Snow 6 Y [degC]                      | 
| 23 |       26 | Snow Temperature 7           | 2011-12-02 14:30:32 | T Snow 7 Z [degC]                      | 
| 24 |       27 | Snow Temperature 8           | 2011-12-02 14:30:32 | T Snow 8 AA [degC]                     | 
| 25 |       28 | Snow Temperature 9           | 2011-12-02 14:30:32 | T Snow 9 AB [degC]                     | 
| 26 |       29 | Snow Temperature 10          | 2011-12-02 14:30:32 | T Snow 10 AC [degC]                    | 
| 27 |       30 | Battery Voltage              | 2011-12-02 14:30:32 | Battery Voltage [V]                    | 
| 28 |       31 | SWinMax                      | 2011-12-02 14:30:32 | [W m-2]                                | 
| 29 |       32 | SWoutMax                     | 2011-12-02 14:30:32 | [W m-2]                                | 
| 30 |       33 | NetRadMax                    | 2011-12-02 14:30:32 | NetRadMax[W m-2]                       | 
| 31 |       34 | Max Air Temperture1 (TC)     | 2011-12-02 14:30:32 | Max Air Temperture1 (TC) [degC]        | 
| 32 |       35 | Max Air Temperture2 (TC)     | 2011-12-02 14:30:32 | Max Air Temperture2 (TC)[degC]         | 
| 33 |       36 | Min Air Temperture1 (TC)     | 2011-12-02 14:30:32 | Min Air Temperture1 (TC)[degC]         | 
| 34 |       37 | Min Air Temperture2 (TC)     | 2011-12-02 14:30:32 | Min Air Temperture2 (TC) [degC]        | 
| 35 |       38 | Max Windspeed-U1             | 2011-12-02 14:30:32 | Max Windspeed-U1 [m/s]                 | 
| 36 |       39 | Max Windspeed-U2             | 2011-12-02 14:30:32 | Max Windspeed-U2 [m/s]                 | 
| 37 |       40 | StdDev Windspeed-U1          | 2011-12-02 14:30:32 | StdDev Windspeed-U1 [m/s]              | 
| 38 |       41 | StdDev Windspeed-U2          | 2011-12-02 14:30:32 | StdDev Windspeed-U2 [m/s]              | 
| 39 |       42 | Ref Temperature              | 2011-12-02 14:30:32 | Ref Temperature [degC]                 | 
| 40 |       43 | Windspeed@2m                 | 2011-12-02 14:30:32 | Windspeed@2m [m/s]                     | 
| 41 |       44 | Windspeed@10m                | 2011-12-02 14:30:32 | Windspeed@10m [m/s]                    | 
| 42 |       45 | WindSensorHeight1            | 2011-12-02 14:30:32 | WindSensorHeight1 [m]                  | 
| 43 |       46 | WindSensorHeight2            | 2011-12-02 14:30:32 | WindSensorHeight2 [m]                  | 
| 44 |       47 | Albedo                       | 2011-12-02 14:30:32 | Albedo                                 | 
| 45 |       48 | Zenith Angle                 | 2011-12-02 14:30:32 | Zenith Angle [deg]                     | 
| 46 |       49 | QCl01-08                     | 2011-12-02 14:30:32 | QCl01-08                               | 
| 47 |       50 | QCl09-16                     | 2011-12-02 14:30:32 | QCl09-16                               | 
| 48 |       51 | QCl17-24                     | 2011-12-02 14:30:32 | QCl17-24                               | 
| 49 |       52 | QCl25-27                     | 2011-12-02 14:30:32 | QCl25-27                               | 
+----+----------+------------------------------+---------------------+----------------------------------------+ 


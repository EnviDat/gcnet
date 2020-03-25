
function cleanGOESDataset(dataset){

    var cleanRecords = [];
    var lastRecord;

    for (var i = 0; i < dataset.records.length; i++) {

        var record = dataset.records[i];
        var skip = false;

        if ((
                isParamInvalid(record.sw_down)
                && isParamInvalid(record.sw_up)
                && isParamInvalid(record.net_radiation)
                && isParamInvalid(record.tc_air_1)
                && isParamInvalid(record.tc_air_2)
                //&& isParamInvalid(record.cs500_air_1)
                //&& isParamInvalid(record.cs500_air_2)
            ) || (
                isParamInvalid(record.wind_speed_u1)
                && isParamInvalid(record.wind_speed_u2)
                && isParamInvalid(record.wind_dir_u1)
                && isParamInvalid(record.wind_dir_u2)
            )){
            skip = true;
        }

        if (lastRecord !== undefined && !skip){
            skip = recordsAreIdentical(record, lastRecord);
        }

        if (!skip && (record.time === 'Invalid Date' || record.station === '')){
            skip = true;
        }

        if (!skip){
            cleanRecords.push(record);
        }

        lastRecord = record;
    }

    return {header: dataset.header, records: cleanRecords };
}

function recordsAreIdentical(recordA, recordB){

    if (recordA.station === recordB.station && dateFns.isEqual(recordA.time, recordB.time)){
        return true;
    }

    if ((
           recordA.sw_down !== 'undefined'
        && recordA.sw_down === recordB.sw_down
        && recordA.sw_up !== 'undefined'
        && recordA.sw_up === recordB.sw_up
        && recordA.net_radiation !== 'undefined'
        && recordA.net_radiation === recordB.net_radiation
        && recordA.tc_air_1 !== 'undefined'
        && recordA.tc_air_1 === recordB.tc_air_1
        && recordA.tc_air_2 !== 'undefined'
        && recordA.tc_air_2 === recordB.tc_air_2
        )
    ||
        (
           recordA.wind_speed_u1 !== 'undefined'
        && recordA.wind_speed_u1 === recordB.wind_speed_u1
        && recordA.wind_speed_u2 !== 'undefined'
        && recordA.wind_speed_u2 === recordB.wind_speed_u2
        && recordA.wind_dir_u1 !== 'undefined'
        && recordA.wind_dir_u1 === recordB.wind_dir_u1
        && recordA.wind_dir_u2 !== 'undefined'
        && recordA.wind_dir_u2 === recordB.wind_dir_u2
        )
     //&& recordA.cs500_air_1 === recordB.cs500_air_1
     //&& recordA.cs500_air_2 === recordB.cs500_air_2
        ){
        return true;
    }

    return false;
}

const invalidMarkerValue = undefined; //'999999.00';
const invalidValues = ['999.00', '999', '999.999', '999999.00', '*********'];

function cleanParameter(dataparameter){

    if (dataparameter === undefined || invalidValues.indexOf(dataparameter) !== -1){
        return invalidMarkerValue;
    }

    if (dataparameter.lastIndexOf('.') == dataparameter.length - 1) {
        dataparameter = dataparameter.substring(0, dataparameter.length - 2);
    }    

    var value = Number.parseFloat(dataparameter.trim());

    if (value >= 999 || value <= -999){
        return invalidMarkerValue;
    }

    return dataparameter;
}

function isParamInvalid(dataparameter){
    return dataparameter === invalidMarkerValue;
}


function createJSONDataset(fileString, delimiter, station){

    var dataset;
    var header = [];
    var records = [];

    // regex for any whitespace https://stackoverflow.com/questions/25218677/javascript-split-function-to-split-into-array-at-new-line-or-white-space
    //var fileLines = fileString.split('\n');
    var fileLines = fileString.split(/\r\n|\r|\n/g);
    var regex = new RegExp(delimiter, 'g');

    for (var i = 0; i < fileLines.length; i++) {

        var line = fileLines[i];
        var fileLineSplit = line.trim().split(regex);

        if (fileLineSplit.length > 1){
            var record = convertRecord(fileLineSplit, 3);

            if(!record){
                console.log("station " + station + " couldn't convert record " + i);
            }

            records.push(record);
        } else if (line.length > 0) {
            console.log("station " + station + " couldn't split record " + i );
        }
    }

    dataset = {header: header, records: records };

    return dataset;        
}
 

function convertRecord(fileLineSplit, firstParameterIndex)
{
    var year = Number.parseInt(fileLineSplit[1]);
    var julianDays = fileLineSplit[2];

    var time = getDateFromJulianDays(year, julianDays);

    var station = fileLineSplit[0];
    
    var record = getRecordFromLine(fileLineSplit, firstParameterIndex, station, year, time);

    var wind_speed_u1 = cleanParameter(fileLineSplit[12]);
    var wind_speed_u2 = cleanParameter(fileLineSplit[13]);

    var wind_dir_u1 = cleanParameter(fileLineSplit[14]);
    var wind_dir_u2 = cleanParameter(fileLineSplit[15]);
  
    record.wind_speed_u1 = wind_speed_u1 != undefined ? wind_speed_u1.trim() : 'undefined';
    record.wind_speed_u2 = wind_speed_u2 != undefined ? wind_speed_u2.trim() : 'undefined';
    record.wind_dir_u1 = wind_dir_u1 != undefined ? wind_dir_u1.trim() : 'undefined';
    record.wind_dir_u2 = wind_dir_u2 != undefined ? wind_dir_u2.trim() : 'undefined';

    return record;
}


function getDateFromJulianDays(year, julianDays){
    var time = new Date(year.toString());

    var splits = julianDays.split(".");
    var days = Number.parseInt(splits[0]);

    time = dateFns.setDayOfYear(time, days);

    var daysFloat = Number.parseFloat(julianDays);
    var hoursDecimal = daysFloat - days;

    var hours = Math.round(hoursDecimal * 24);
    time = dateFns.setHours(time, hours);

    // console.log(year + " days " + julianDays + " to " + time);

    return time;
}


function getRecordFromLine(fileLineSplit, firstParameterIndex, station, year, time){

    // the index start at 0 vs the parameter description
    var sw_down = cleanParameter(fileLineSplit[3]);
    var sw_up = cleanParameter(fileLineSplit[4]);
    var net_radiation = cleanParameter(fileLineSplit[5]);

    var tc_air_1 = cleanParameter(fileLineSplit[6]);
    var tc_air_2 = cleanParameter(fileLineSplit[7]);

    var cs500_air_1 = cleanParameter(fileLineSplit[8]);
    var cs500_air_2 = cleanParameter(fileLineSplit[9]);

    var pressure = cleanParameter(fileLineSplit[16]);

    return {
        station: station != undefined ? station.trim() : '',
        year: year,
        time: dateFns.format(time, dateFormat),
        sw_down: sw_down != undefined ? sw_down.trim() : 'undefined',
        sw_up: sw_up != undefined ? sw_up.trim() : 'undefined',
        net_radiation: net_radiation != undefined ? net_radiation.trim() : 'undefined',
        tc_air_1: tc_air_1 != undefined ? tc_air_1.trim() : 'undefined',
        tc_air_2: tc_air_2 != undefined ? tc_air_2.trim() : 'undefined',
        cs500_air_1: cs500_air_1 != undefined ? cs500_air_1.trim() : 'undefined',
        cs500_air_2: cs500_air_2 != undefined ? cs500_air_2.trim() : 'undefined',
        pressure: pressure != undefined ? pressure : 'undefined',
    };
}
/*

> Number Station Name    Station nickname
> ------------------------------------------
> 0      Swiss Camp 10m    10m
> 1      Swiss Camp        sc
> 2      Crawford Point    cp1
> 3      NASA-U            nasau
> 4      GITS              gits
> 5      Humboldt          hum
> 6      Summit Station    summit
> 7      Tunu North        tunu
> 8      DYE-II            dye
> 9      JAR-1             jar1
> 10     Saddle
> 11     South Dome        sdome
> 12     NASA East         nasae
> 15     NASA South-East   nasase
> 22     Petermann         pet
> 23     NEEM
> 24     East GRIP         egrip
> 30     LAR1
> 31     PE Gun
> 32     PE Blu
> 33     PE Air
>
> The output files have the following output format:
> (NOTE: erroneous values have been assigned the value 999.  Spurious data
> can still occur within the physical bounds of the parameters
> so it is not possible to perfectly filter the data.)
>
> | Column | Name                   | Unit
> |
> +----+----------+------------------------------+---------------------+----------------------------------------+
>   1 | Station Number/ID            | Integer value
>   2 | Year                         | Year
>   3 | Decimal Julian Day           | Day of Year.hour/24 [days]
>   4 | SWin                         | SW_down [W m-2]
>   5 | SWout                        | SW_up [W m-2]
>   6 | Net Radiation                | Net Radiation F [W m-2]
>   7 | Air Temperture-TC Air 1      | TC Air 1 G Air Temperature [degC]
>   8 | Air Temperture-TC Air 2      | TC Air 2 H Air Temperature [degC]
>   9 | Air Temperture-CS500 T Air 1 | CS500 T Air 1 I Air Temperature [degC]
> 10 | Air Temperture-CS500 T Air 2 | CS500 T Air 2 J Air Temperature [degC]
> 11 | Relative Humidity-RH 1       | RH 1 K Relative Humidity [%] **
> 12 | Relative Humidity-RH 2       | RH 2 L Relative Humidity [%] **
> 13 | Windspeed-U1                 | U1 M Wind Speed [m/s]
> 14 | Windspeed-U2                 | U2 N Wind Speed [m/s]
> 15 | Wind Direction-U Dir 1       | U Dir 1 O [deg]
> 16 | Wind Direction-U Dir 2       | U Dir 2 P [deg]
> 17 | Atmos Pressure               | Atmos Pressure Q [mbar]
> 18 | Snow Height 1                | Snow Height 1 R [m]
> 19 | Snow Height 2                | Snow Height 2 S [m]
> 20 | Snow Temperature 1           | T Snow 1 T [degC]
> 21 | Snow Temperature 2           | T Snow 2 U [degC]
> 22 | Snow Temperature 3           | T Snow 3 V [degC]
> 23 | Snow Temperature 4           | T Snow 4 W [degC]
> 24 | Snow Temperature 5           | T Snow 5 X [degC]
> 25 | Snow Temperature 6           | T Snow 6 Y [degC]
> 26 | Snow Temperature 7           | T Snow 7 Z [degC]
> 27 | Snow Temperature 8           | T Snow 8 AA [degC]
> 28 | Snow Temperature 9           | T Snow 9 AB [degC]
> 29 | Snow Temperature 10          | T Snow 10 AC [degC]
> 30 | Battery Voltage              | Battery Voltage [V]
> 31 | SWinMax                      | [W m-2]
> 32 | SWoutMax                     | [W m-2]
> 33 | NetRadMax                    | NetRadMax[W m-2]
> 34 | Max Air Temperture1 (TC)     | Max Air Temperture1 (TC) [degC]
> 35 | Max Air Temperture2 (TC)     | Max Air Temperture2 (TC)[degC]
> 36 | Min Air Temperture1 (TC)     | Min Air Temperture1 (TC)[degC]
> 37 | Min Air Temperture2 (TC)     | Min Air Temperture2 (TC) [degC]
> 38 | Max Windspeed-U1             | Max Windspeed-U1 [m/s]
> 39 | Max Windspeed-U2             | Max Windspeed-U2 [m/s]
> 40 | StdDev Windspeed-U1          | StdDev Windspeed-U1 [m/s]
> 41 | StdDev Windspeed-U2          | StdDev Windspeed-U2 [m/s]
> 42 | Ref Temperature              | Ref Temperature [degC]
> |

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
*/
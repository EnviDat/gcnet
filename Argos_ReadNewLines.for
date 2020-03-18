	Program Argos
c       Converts ARGOS binary data to Campbell measurements
c       Sondy 5-30-95, Boulder 7-3-95
c       Revised Sept 1, 1995
c	Revise 30 April 2007 in Greenland
c	Revised 1.2.2014 inEgg
c       Revised  14.11.2014 Lugano
c       Revised  1.7.2016 Birmensdorf
c       test with new compiler 11.11.2014
c       Revised 24.9.2018 Birmensdorf Derek Houtz
c       Want to count lines read, so I add index+1 for every read
c       and index-1 for every backspace
	Real in(16),binval(16),val(16),nval(16)
	Real out(16)
	integer id,sta,da(7),nn,j,L,index
	Character*20 in1,out1
	Character*1 num(20)
	
        open(3,file='ARGOSLINE.txt')
        read(3,*)L
        close(3)
c       write(*,*)L
        open(3,file='ARGOSLINE.txt',STATUS='REPLACE')	
        
c	print *,'give input file '
c	read(*,'(a)') in1
	CALL GETARG (1, in1) 
	open(1,file=in1)
	
        CALL GETARG (2, out1)
	open(2,file=out1) 
	
	do j=1,L
                read(1,1001,end=5000) (num(kk),kk=1,20)
        end do
	

	index=0
c    loop for x data transmissions
   15   do 25 ii=1,10000000
   
c        print *,ii

c    read first character of id: 0(1463)
111	read(1,1001,end=5000) (num(kk),kk=1,20)
        index = index+1
	if(num(1).eq.'0'.and. num(2).eq.'1'.and.num(3).eq.'4'
     1  .and.num(4).eq.'6'.and.num(5).eq.'3'.and.num(6).eq.' ') then
     
        read(1,1001,end=5000) (num(kk),kk=1,20)
        index = index+1
        if(num(1).eq.' '.and.num(2).eq.' '.and.num(3).eq.' '.and.
     1  num(4).eq.' '.and.num(5).eq.' '.and.num(6).eq.' ') then
     
        read(1,1001,end=5000) (num(kk),kk=1,20)
        index = index+1
        if(num(1).eq.' '.and.num(2).eq.' '.and.num(3).eq.' '.and.
     1  num(4).eq.' '.and.num(5).eq.' '.and.num(6).eq.' ') then

        read(1,1001,end=5000) (num(kk),kk=1,20)
        index = index+1
        if(num(1).eq.' '.and.num(2).eq.' '.and.num(3).eq.' '.and.
     1  num(4).eq.' '.and.num(5).eq.' '.and.num(6).eq.' ') then 
    
	backspace(1)
	backspace(1)
	backspace(1)
	backspace(1)
	index = index-4
	read(1,*) id,sta
	index = index+1
	goto 30
	else
	goto 15
	endif
	else
	goto 15
	endif
	else
	goto 15
	endif
	else
	goto 15
	endif
 1001   format(20a)

   30   continue
  	read(1,1001,end=5000) (num(kk),kk=1,8)
  	index = index+1
  	
c    check for line errors due to satellite transmission	 
        if(num(1).eq.' '.and.num(2).eq.' '       .and.num(3).eq.' '.and.
     1  num(4).eq.' '.and.num(5).eq.' '.and.num(6).eq.' '.and.num(7)
     2  .eq.'2'.and.num(8).eq.'0') then
	backspace(1)
	index = index-1
	goto 40
	else
	goto 15
        endif
   40   continue
        read(1,1002,end=5000) (da(m),m=1,7),(val(n),n=1,4)
        index = index+1
        
c     make sure the year is the same derived from satellite and data logger        
        if(da(1).eq.(val(2)+1)) val(2)=da(1)
        
c    check for line errors due to satellite transmission
        read(1,1001,end=5000) (num(kk),kk=1,6)
        index = index+1
	if(num(1).eq.' '.and.num(2).eq.' '.and.num(3).eq.' '.and.
     1  num(4).eq.' '.and.num(5).eq.' '.and.num(6).eq.' ') then
	backspace(1)
	index = index-1
	goto 45
	else
	goto 15
        endif
   45   read(1,1003,end=5000) (val(n),n=5,8)
        index = index+1
	read(1,1003,end=5000) (val(n),n=9,12)
	index = index+1
	read(1,1003,end=5000) (val(n),n=13,16)
	index = index+1
 1002   format(6x,i4,6(1x,i2),4(f11.0,2x))
 1003   format(28x,4(f11.0,2x))

c   data transmission of 16 data points
	do 50 i=1,16

	binval(i)=val(i)
	Do 100 k=1,16
	In(k)=0.
	if(val(i).ge.(2**(16-k))) then
	In(k)=1.
	val(i)=binval(i) - (2**(16-k))
	binval(i)=val(i)
	else
	endif
  100   continue

	nval(i)=0
	Do 200 k=4,16
	if(in(k).eq.1) then
	nval(i)=nval(i) + (2**(16-k))
	else
	endif
  200   continue        

	if(In(1).eq.1) nval(i)=nval(i)*(-1)
	if(In(2).eq.0.and.In(3).eq.0) out(i)=nval(i)
	if(In(2).eq.0.and.In(3).eq.1) out(i)=nval(i)/10
	if(In(2).eq.1.and.In(3).eq.0) out(i)=nval(i)/100
	if(In(2).eq.1.and.In(3).eq.1) out(i)=nval(i)/1000

   50   continue
c	if(sta.eq.135796) nn=2
c	if(sta.eq.107282) nn=3
c	if(sta.eq.107283) nn=4
c	if(sta.eq.135797) nn=5
c	if(sta.eq.135798) nn=6
c	if(sta.eq.107285) nn=7
c	if(sta.eq.107284) nn=8
c Modified 13.9.2018 Derek Houtz, output to one file for uniformity 
c Want single file to then sort and merge in MATLAB like goes data	
	write(2,2001) (da(m),m=1,7),sta,(out(n),n=1,16)

        
 2001   format(i4,1x,6(i2,1x),I7,f8.0,f8.0,14(f10.3))

   25   continue        

 5000   continue
c We now add the number of lines processed to the previously loaded
c number of lines that have been processed 
	L = L+index
        write(3,*)L
c        print *,'end of Program'
 
	end

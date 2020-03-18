
!*******************************************************************************
!
!  PROGRAM: GOES
!
!  PURPOSE:  Extracts the data from GOES/Campbel Scientific 3 Bytes ASCII files
!		
!*******************************************************************************

       Program GOES
	  
	character*20 in1,out1
	character Chain(138)
	character*37 Station
	character*3 DV(46)
	integer i,j,index,A,B,C,L
	real SF
	real DV0(46)

        open(3,file='GOESLINE.txt')
        read(3,*)L
        close(3)
c       write(*,*)L
        open(3,file='GOESLINE.txt',STATUS='REPLACE')
        
c	print *,'give input file name for '
	CALL GETARG (1, in1)  
	open(1,file=in1) 
	  
c	print *,'give output file name for '
	CALL GETARG (2, out1)
	open(2,file=out1) 
        
        do j=1,L
                read(1,100,end=9999)Station, Chain
        end do


	index = 1
	   do while (index.gt.0)
			read(1,100,end=9999)Station, Chain
			do i=1,46
				DV0(i)=0
				DV(i) = Chain(3*i-2)//Chain(3*i-1)//Chain(3*i)
				A=and(iachar(Chain(3*i-2)),15)
		!		write(*,"(I5)") A
				B=and(iachar(Chain(3*i-1)),63)
				C=and(iachar(Chain(3*i)),63)

				if (((A*64)+B).ge.1008) then
					DV0(i)=(B-48)*64+C+9000
					goto 10
				end if
				
				if (and(A,8).ne.0) then
					SF=-1
				else
					SF=1
				end if

				if (and(A,4).ne.0) then
					SF=SF*0.01
				end if

				if (and(A,2).ne.0) then
					SF = SF*0.1
				end if

				if (and(A,1).ne.0) then
					DV0(i) = 4096
				end if

				DV0(i) = (DV0(i)+(and(B,63)*64)+and(C,63))*SF
			
10				continue
			end do

      
	write(2,201) Station,DV0(1),DV0(2),DV0(3),DV0(4),DV0(5),DV0(6),DV0(7),
     * DV0(8),DV0(9),DV0(10),DV0(11),DV0(12),DV0(13),DV0(14),
     * DV0(15),DV0(16),DV0(17),DV0(18),DV0(19),DV0(20),DV0(21),DV0(22),
     * DV0(23),DV0(24),DV0(25),DV0(26),DV0(27),DV0(28),DV0(29),DV0(30),
     * DV0(31),DV0(32),DV0(33),DV0(34),DV0(35),DV0(36),DV0(37),DV0(38),
     * DV0(39),DV0(40),DV0(41),DV0(42),DV0(43),DV0(44),DV0(45),DV0(46)			

			index=index+1

	   enddo

	   goto 9999

 100	format(A37,1X,138(A1))
 201	format(A8,1x,F4.0,1x,F6.0,1x,f5.0,1x,f4.0,1x,3(f6.3,1x),14(f9.2,1x),
     * 2(f6.1,1x),4(f6.1,1x),f7.1,1x,2(f7.2,1x),16(f9.2,1x))

9998  write(*,*) "Error...  "
	write(*,*) filename," : file does no exist..."

9999  continue
c      write (*,*)index-1," entries."
	   L = L+index-1
	   write(3,*)L
	   close(1)
	   close(2)
	   close(3)

	   END

	   
	


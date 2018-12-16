if "%PROCESSOR_ARCHITECTURE%"=="x86" goto x86
if "%PROCESSOR_ARCHITECTURE%"=="AMD64" goto x64
exit

:x64
dpinst-amd64.exe /A
exit

:x86
dpinst-x86.exe /A
exit

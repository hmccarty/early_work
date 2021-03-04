#################################################
# All code written was made by Harrison McCarty #
# First Created: 8/20/17 Last Updated: 9/25/17  #
#################################################

import gspread
from oauth2client.service_account import ServiceAccountCredentials
from time import gmtime, strftime
import os

def cls():
    os.system('cls' if os.name=='nt' else 'clear')
 
scope = ["https://spreadsheets.google.com/feeds"] #Gets access to Google Sheets Document (the database)
creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json',scope)
client= gspread.authorize(creds)
sheet = client.open("Robotics Sign In 2017-18").sheet1

studentID = "" #Initialize variables
totalMeetings = sheet.cell(2,1).value
countingAttendance = 1
allStudentIDs = sheet.col_values(3)
rowNumber=1
recentAdd = 0

def timeStamp(day, rowNumber): #Funciton used to add exact time to when the indvidual signed in
        time = strftime("%H:%M:%S")
        sheet.update_cell(rowNumber,day,time)
        
def mainFunction(rowNumber,inputStudentID,allStudentIDs,totalMeetings): #Where most of the data is called/updated in the database
        global recentAdd
        day = int(totalMeetings)+5 #Changes what column your on depending on what totalMeetings is set too
        dayCell = sheet.cell(1,int(totalMeetings)+5).value
        for currentStudentID in allStudentIDs:
                if inputStudentID == currentStudentID and rowNumber>1:
                        value = sheet.cell(rowNumber,5).value
                        sheet.update_cell(rowNumber,5,int(value)+1)
                        value = sheet.cell(rowNumber,5).value
                        if dayCell == "": #If cell blank
                                sheet.update_cell(1,day,strftime("%Y-%m-%d"))
                                timeStamp(day, rowNumber)
                        else: #If day has already been registered just add timestamp
                                timeStamp(day, rowNumber)
                        cls()
                        break
                elif  currentStudentID == "": #If student ID isn't on the list, adds it (having some issues with replacing other members)
                        name = str(raw_input("Please Enter Your Name: "))
                        sheet.update_cell(rowNumber,3,inputStudentID)
                        value = sheet.cell(rowNumber,5).value
                        sheet.update_cell(rowNumber,5,1)
                        sheet.update_cell(rowNumber,2,name)
                        if dayCell == "":
                                sheet.update_cell(1,day,strftime("%Y-%m-%d"))
                                timeStamp(day, rowNumber)
                        else:
                                timeStamp(day, rowNumber)
                        cls()
                        recentAdd =1
                        break           
                rowNumber +=1
        rowNumber=1

while countingAttendance == 1:
        inputStudentID = str(raw_input("Enter Student ID or Scan Card then Hit Enter: ")) #Sanitizes input, everything is registered as a string
        if inputStudentID == "Done":
                countingAttendance = 0
                sheet.update_cell(2,1,int(totalMeetings)+1)
                rowNumber=2
                for each_ID in allStudentIDs:
                    value = sheet.cell(rowNumber,5).value
                    attendancePercentage = (float(value))/(float(totalMeetings))
                    sheet.update_cell(rowNumber,4,attendancePercentage)
                    rowNumber += 1
                    
        else:
                mainFunction(rowNumber,inputStudentID,allStudentIDs,totalMeetings)
                if recentAdd == 1:
                    allStudentIDs = sheet.col_values(3)
                    recentAdd =0

print ("All Done!")




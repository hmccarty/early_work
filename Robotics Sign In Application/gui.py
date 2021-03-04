from tkinter import *
from tkinter import ttk
from time import gmtime, strftime
import gspread
from oauth2client.service_account import ServiceAccountCredentials

scope = ["https://spreadsheets.google.com/feeds"] #Gets access to Google Sheets Document (the database)
creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json',scope)
client= gspread.authorize(creds)
sheet = client.open("Robotics Sign In").sheet1
rowNumber =1
allStudentIDs = sheet.col_values(3)
totalMeetings = sheet.cell(2,1).value

def timeStamp(day, rowNumber): #Function used to add exact time to when the indvidual signed in
        time = strftime("%H:%M:%S")
        sheet.update_cell(rowNumber,day,time)
        
def mainFunction(rowNumber,inputStudentID,allStudentIDs,totalMeetings):
    day = int(totalMeetings)+5 #Changes what column you're on depending on what totalMeetings is set too
    dayCell = sheet.cell(1,int(totalMeetings)+5).value
    for currentStudentID in allStudentIDs:
        if inputStudentID == currentStudentID and rowNumber>1:
            value = sheet.cell(rowNumber,5).value
            sheet.update_cell(rowNumber,5,int(value)+1)
            value = sheet.cell(rowNumber,5).value
            attendancePercentage = (float(value))/(float(totalMeetings))
            sheet.update_cell(rowNumber,4,attendancePercentage)
            if dayCell == "": #If cell blank
                sheet.update_cell(1,day,strftime("%Y-%m-%d"))
                timeStamp(day, rowNumber)
            else: #If day has already been registered just add timestamp
                timeStamp(day, rowNumber)
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
                break           
            rowNumber +=1

        rowNumber=1
    
    
root = Tk()
root.title("Robotics Sign In")

mainframe = ttk.Frame(root, padding="3 3 12 12")
mainframe.grid(column=0, row=0, sticky=(N, W, E, S))
mainframe.columnconfigure(0, weight=1)
mainframe.rowconfigure(0, weight=1)

inputStudentID = ""
meters = StringVar()

inputStudentID_entry = ttk.Entry(mainframe, width=7, textvariable=inputStudentID)
inputStudentID_entry.grid(column=2, row=1, sticky=(W, E))

#ttk.Label(mainframe, textvariable=meters).grid(column=2, row=2, sticky=(W, E))
ttk.Button(mainframe, text="Calculate", command=mainFunction).grid(column=3, row=3, sticky=W)

ttk.Label(mainframe, text="Enter Student ID").grid(column=3, row=1, sticky=W)
ttk.Label(mainframe, text="Testing").grid(column=1, row=2, sticky=E)


for child in mainframe.winfo_children(): child.grid_configure(padx=5, pady=5)


root.bind('<Return>', mainFunction)

mainFunction(rowNumber,inputStudentID,allStudentIDs,totalMeetings)
allStudentIDs = sheet.col_values(3)

root.mainloop()

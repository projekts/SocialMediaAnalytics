# SocialMediaAnalytics
Project Name: Social Media Activity Analytics

Requirements: 
- It takes as input a JSON file which could be from a local directory or a web endpoint. Please refer to the included example file "Json.txt", which describes what the Json data format needs to look like.

- It requires a newer browser to run

Instructions: Please run the DataDisplay.html file
 
Assumptions: The JSON file used as input contains social media activity data for a particular brand or product.Each entry in the JSON file is one Social media activity.

Description:A browser UI that takes as input a JSON file from a web endpoint or a local directory.It then displays the social media activities and allows you to easily analyze the data. It does this using adashboard and a fluid user interface. It allows the user to extract the data into an excel format.

Built using: 

Javascript Libraries used:
- Jquery
- D3
- momentjs
- D3pie
- Datatable and extensions for it

Please see the exact files and versions used in the included file "Javascript and CSS versions included.txt". These list the web links to the javascript files where as the application uses these files locally.

- FontAwesome was also used

Functionality:

- Toggle buttons: you can display the dashboard and datatable together or one at a time 

- Clear button: clears everything

Dashboard
- The first pie chart shows total activities the took place based on the three types sentiments provided in JSON as -1,0,1 which translate to negative, neutral and positive social media activities.

- The second pie chart shows the total number of likes on all positive, negative and neutral social media activities.

- The third pie chart shows the total number of shares on all positive, negative and neutral social media activities.

- Note: Please move mouse over the pie in the circle to get the percentage of the pie.

DataTable
- Contains the json social media activity in a table format.

- Contains paging and user can set the number of items to display on one page.

- Contains sorting functionality for each column

- Each column can be reordered and moved to a different position to better view the data

- Each column can be enabled and disabled by using the column visibility button

- All links open in a new window

Search Box: The search box will work on multiple column values and display results

Excel Button: The excel button will export the whole Json file into and excel file

Copy Button: Allows copying the whole JSON file to clip board can be pasted in an excel file


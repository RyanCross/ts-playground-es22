Webflow Technical Interview problem

Given a set of log file with entries that look something like this

[12:21:21 03.19.2024] [DEBUG] [123] - Database connection attempt failed retrying..
[12:21:22 03.19.2024] [INFO] [123] - Database connection active. connection ID
[12:21:22 03.19.2024] [ERROR] [42] - Database could not be reached error code: 1000.


Create a tracker that will parse all log files in a directory and provide 3 functions:

Give a count of all logs of a each type
Return sites with 3 or more errors
Return critical errors (*can’t remember third, so this is what we're going with*)


Curveball: what if the log file was 10 gigs?
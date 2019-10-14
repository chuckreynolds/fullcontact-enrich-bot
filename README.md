# FullContact Enrich API Bot

Gets enriched social data from full contact v3 api via twitter handles

## Usage
- clone && `npm install`
- copy and rename `cp .env-sample .env`
- Get API key from [https://dashboard.fullcontact.com](https://dashboard.fullcontact.com) and add to .env `FCKEY=`
- Get list of twitter handles (1 or many) into a single comma deliminatd string and put into index.js const `twitterHandlesToGrep`
    - With a single column of names in excel, use Data > Remove Duplicates
    - With that new column of unique names, use this equation in another cell to get the single comma deliminatd string: `=TEXTJOIN(",",TRUE,A:A)`
- run `node index.js`
- copy console output. can copy pasta back into excel just import w/ comma deliminated format and you're good to go.

## Support
hahahah. I built this quickly to scratch an itch. Feel free to make an issue or PR though.

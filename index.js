/**
 * Hit FullContact v3 Enrich API with twitter
 * names and get more social info back
 */
// Reqs & Configs
require('dotenv').config() // helps to have when running local
const axios = require('axios') // https://www.npmjs.com/package/axios
const fullcontactKey = process.env.FCKEY // get key from https://dashboard.fullcontact.com

// USER: add comma sep twitter handles with or without the @ symbol
// 411: in excel just get a single column of names on COL A, then do
//      this equatin in another cell to get a list:  =TEXTJOIN(",",TRUE,A:A)
//      Copy that single string in here.
const twitterHandlesToGrep = '@chuckreynolds'

// split up the names in that string to use each
const twitterHandleArray = twitterHandlesToGrep.split(',')

// Function to introduce a delay inside forEach loops cause we need that to not hammer FC
const delayLoop = (fn, delay) => {
    return (x, i) => {
        setTimeout(() => {
            fn(x);
        }, i * delay);
    }
};

// let's loop through this bitch w/ delay added
twitterHandleArray.forEach(delayLoop(function (twitterHandle) {

    // FC requires POST in v3 so Axios works better with these out here as objs
    let axiosData = {
        twitter: twitterHandle
    }
    let axiosConfig = {
        headers: {
            'Authorization': `Bearer ${fullcontactKey}`
        }
    }

    // Post our payload and see what we get back
    axios
        .post('https://api.fullcontact.com/v3/person.enrich', axiosData, axiosConfig)
        .then(response => {
            console.log(`${twitterHandle},${response.data.fullName},${response.data.twitter},${response.data.linkedin},${response.data.facebook}`)
        })
        .catch(function (error) {
            if (error.response.status == 404) {
                console.log(`${twitterHandle},null,null,null,null`)
            } else {
                console.log(`${error.response.status} - ${error.response.statusText}`)
            }
        })

}, 1000)) // end forEach

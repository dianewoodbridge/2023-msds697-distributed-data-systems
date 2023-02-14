//Load data to world_bank_project in msds697.
//mongoimport --db msds697 --collection world_bank_project --file=world_bank_project.json

use msds697
db.world_bank_project.find({})
// Example 1
db.world_bank_project.find({"id":"P130164"})
//Using aggregate(), return documents where "id" is "P130164"



// Example 2
// Return "id" and a non-empty "human_development_project" array
// which represents "mjtheme_namecode" 
// containing only documents which name is Human development




// Example 3
// For each countrycode, return the number of documents in the collection 
// in a format of {"_id" : "code", "count" : value}
db.world_bank_project.find()                               


   
// Eample 4
// Return theme_namecode as an _id and 
// the number of project has the corresponding theme.


                       
// Example 5
// Return the approvalfy in double as approvalfy_num with borrower, and id information. 



                  
// Example 6
// In world_bank_project, 
// 1) find a doucment where totalcommamt is greater than 75000000 and 
// 2) find the unique names of projectdocs’ DocType and the number of projectdocs belonging to the sorted by DocType.
							

					
// Example 7
// Create a collection called country_code using country_codes.json.
//mongoimport --db msds697 --collection country_code --file country_codes.json

// For all the projects whose "countrycode" is "CN", 
// create a field called country_phone_info 
// which includes data from country_code 
// (inclulding "name", "dial_code", "code", and "_id")
db.country_code.find({"code":"CN"})


                 
 								
// Example 8
// For world_bank_project, 
// 1) Find a document where  "countrycode" is "AO” and see its executionStats using cursor.explain("executionStats").


// 2) Create a hashed-index  on “countrycode”.



// 3) Find a document where  "countrycode" is "AO” and see its executionStats using cursor.explain("executionStats").


               
// 4) Drop the index



// Extra -- Return the restaurant_id and its average grade.





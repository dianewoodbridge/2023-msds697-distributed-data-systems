//Load data to world_bank_project in msds697.
//mongoimport --db msds697 --collection world_bank_project --file=world_bank_project.json

use msds697

// Example 1
// Load world_bank_project.json to ”msds697” database’s “world_bank_project” collection and print only “borrower” information.

// Count the number of documents
db.world_bank_project.find().count() // 500

// Display results in an easy-to-read format.
db.world_bank_project.find().pretty()

db.world_bank_project.find({},{"borrower":true}).pretty() //returns _id
// To format the result, you can add the .pretty() to the operation.
db.world_bank_project.find({},{"borrower":1,"_id":0}).pretty() 
// The result from the below query is same as the above.
db.world_bank_project.find({},{"borrower":true,"_id":false}).pretty() 

// For the “world_bank_project” collection, return a document with the smallest approvalfy value.
// Sort and limit
db.world_bank_project.find().sort({"approvalfy":1}).limit(1)

// Example 2
// 1) From “world_bank_project” collection, find the number of documents where their sector1’s Percent is greater than or equal to  60.
db.world_bank_project.find({"sector1.Percent":{$gte:60}}).count()
// 2) From 1), print only “borrower” information.
db.world_bank_project.find({"sector1.Percent":{$gte:60}},{"borrower":true, "_id":false}).pretty()

// Example 3
// Find URLs of document where them1’s Name is “Water resource management” or themecode is 65.
db.world_bank_project.find({$or:[{"theme1.Name":"Water resource management"}, 
    					   {"themecode" : "65"}]},
    					   {"url":1, "_id":0})
    					   
// Example 4
// Find borrowers with impagency is either “MINISTRY OF EDUCATION” or “MINISTRY OF FINANCE”.
db.world_bank_project.find({"impagency":{$in:["MINISTRY OF EDUCATION","MINISTRY OF FINANCE"]}},
						   {"borrower":1, "_id":0})
				     .pretty()
				     
// Example 5
// From the world_bank_project collection, find all the "project_name"s 
// that include "project" sorted by "project_name".
//// case-insensitive and multiline allowed
db.world_bank_project.find({"project_name":{$regex:"\\w*project\\w*", $options:'im'}},
						   {"project_name":1,"_id":0})
					 .sort({"project_name":1})			
						                  

// Example 6
// In world_bank_project, find documents where majorsector_percent is 
// {"Name" : "Health and other social services", "Percent" : NumberInt(100)}
majorsector_percent_input = {
                                "Name" : "Health and other social services", 
                                "Percent" : NumberInt(100)
                             }
db.world_bank_project.find({"majorsector_percent":majorsector_percent_input})


// Example 7
// Return the project_name and its last theme_namecode
// for all project_name s ending with “projects” (case-insensitive). 
db.world_bank_project.find({"project_name":{$regex:"project$", $options:'i'}}).pretty()

db.world_bank_project.find({"project_name":{$regex:"project$", $options:'i'}},
						   {"theme_namecode":{$slice:-1},"project_name":1, "_id":0})
					 .pretty()
					 					             
// Example 8
// Return majorsector_percent and project_name, where majorsector_percent’s 
// Percent is greater than or equal to 70.
db.world_bank_project.find({"majorsector_percent.Percent":{$gte:70}},
                           {"majorsector_percent":true, "project_name":true, "_id":false})
db.world_bank_project.find({"majorsector_percent.Percent":{$gte:70}}, 
                           {"majorsector_percent.$":true, "project_name":true, "_id":false})
                           
                           
// Example 9
// Return projectdocs, project_name for documents 
// which majorsector_percent's Percent is greater than or eqaul to 70.
db.world_bank_project.find({$and:[{"majorsector_percent.Percent":{$gte:70}}]})
db.world_bank_project.find({"majorsector_percent.Percent":{$gte:70}},
                           {"projectdocs.$":true, "project_name":true, "_id":false}) //Error
db.world_bank_project.find({"majorsector_percent.Percent":{$gte:70}},
                           {"projectdocs":{$elemMatch:{}}, 
                           "project_name":true, "_id":false})
                           
// Return projectdocs, project_name for documents 
// which majorsector_percent's Percent is greater than or eqaul to 70.
// Only include project docs if DocType is "PID" and DocDate is 2013.
db.world_bank_project.find({"majorsector_percent.Percent":{$gte:70}},
                           {"projectdocs":{$elemMatch:{"DocType" : "PID", "DocDate":{$regex:"2013$"}}}, 
                            "project_name":true, "_id":false})


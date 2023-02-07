//Load data to world_bank_project in msds697.
//mongoimport --db msds697 --collection world_bank_project --file=world_bank_project.json

use msds697

// Example 1
// Load world_bank_project.json to ”msds697” database’s “world_bank_project” collection and print only “borrower” information.

// Count the number of documents
db.world_bank_project.find().count() // 500

// Display results in an easy-to-read format.
db.world_bank_project.find().pretty()




// For the “world_bank_project” collection, return a document with the smallest approvalfy value.
// Sort and limit




// Example 2
// 1) From “world_bank_project” collection, find the number of documents where their sector1’s Percent is greater than or equal to  60.


// 2) From 1), print only “borrower” information.



// Example 3
// Find URLs of document where them1’s Name is “Water resource management” or themecode is 65.



// Example 4
// Find borrowers with impagency is either “MINISTRY OF EDUCATION” or “MINISTRY OF FINANCE”.


				     
// Example 5
// From the world_bank_project collection, find all the "project_name"s 
// that include "project" sorted by "project_name".
//// case-insensitive and multiline allowed

		
						                  

// Example 6
// In world_bank_project, find documents where majorsector_percent is 
// {"Name" : "Health and other social services", "Percent" : NumberInt(100)}
majorsector_percent_input = {
                                "Name" : "Health and other social services", 
                                "Percent" : NumberInt(100)
                             }


// Example 7
// Return the project_name and its last theme_namecode
// for all project_name s ending with “projects” (case-insensitive). 



					 					             
// Example 8
// Return majorsector_percent and project_name, where majorsector_percent’s 
// Percent is greater than or equal to 70.


                      
// Example 9
// Return projectdocs, project_name for documents 
// which majorsector_percent's Percent is greater than or eqaul to 70.


                          
// Return projectdocs, project_name for documents 
// which majorsector_percent's Percent is greater than or eqaul to 70.
// Only include project docs if DocType is "PID" and DocDate is 2013.



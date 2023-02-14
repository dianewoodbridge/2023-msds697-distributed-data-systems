//Load data to world_bank_project in msds697.
//mongoimport --db msds697 --collection world_bank_project --file=world_bank_project.json

use msds697
db.world_bank_project.find({})
// Example 1
db.world_bank_project.find({"id":"P130164"})
//Using aggregate(), return documents where "id" is "P130164"
db.world_bank_project.aggregate({$match:{"id":"P130164"}})

// Example 2
// Return "id" and a non-empty "human_development_project" array
// which represents "mjtheme_namecode" 
// containing only documents which name is Human development
db.world_bank_project.find({"mjtheme_namecode.name":{$eq:"Human development"}},
                           {"id":true, "mjtheme_namecode":true, "_id":false})
db.world_bank_project.aggregate(
    {$project: {"_id": false, "id": true,
                "human_development_project" : 
                {$filter : {input: "$mjtheme_namecode", 
                            as : "mjtheme_namecode_a",
                            cond: {$eq:["$$mjtheme_namecode_a.name", 
                                        "Human development"]}}},
                }},
     {$project: {"id":true, "human_development_project":true,
                 "size" : {$size : "$human_development_project"}}},        
     {$match :  {"size":{$gt : 0}}},
     {$project: {"size":  false}}
    )

// Example 3
// For each countrycode, return the number of documents in the collection 
// in a format of {"_id" : "code", "count" : value}
db.world_bank_project.find()                               
db.world_bank_project.aggregate({$group:{_id :"$countrycode", count:{$sum:1}}})   
     
// Eample 4
// Return theme_namecode as an _id and 
// the number of project has the corresponding theme.
db.world_bank_project.aggregate({$unwind : "$theme_namecode"},
                                {$group : {_id : "$theme_namecode", 
                                           count:{$sum:1}}},
                               )                         
// Example 5
// Return the approvalfy in double as approvalfy_num with borrower, and id information. 
db.world_bank_project.aggregate({$project: 
                                    {"id" : true,
                                    "borrower" : true, 
                                    "_id" : false,
                                    "approvalfy_num" : {$convert:
                                        {input:"$approvalfy", to:"double"}}
                                    }
                                },
                                {$sort:{"approvalfy_num":-1}})
                                
                      
// Example 6
// In world_bank_project, 
// 1) find a doucment where totalcommamt is greater than 75000000 and 
// 2) find the unique names of projectdocs’ DocType and the number of projectdocs belonging to the sorted by DocType.
//Step 1
db.world_bank_project.aggregate({$match:{ "totalcommamt": {$gte : 75000000}}})

//Step 2					 
db.world_bank_project.aggregate({$match:{"totalcommamt": {$gte : 75000000}}},
								{$project:{"projectdocs":1}})

//Step 3					 
db.world_bank_project.aggregate({$match:{"totalcommamt": {$gte : 75000000}}},
								{$project:{"projectdocs":1}},
								{$unwind:"$projectdocs"})
		
//Step 4						
db.world_bank_project.aggregate({$match:{"totalcommamt": {$gte : 75000000}}},
								{$project:{"projectdocs":1}},
								{$unwind:"$projectdocs"},
								{$group:{"_id":{"DocType":"$projectdocs.DocType"}}}) // _id is required.

//Step 5
db.world_bank_project.aggregate({$match:{"totalcommamt": {$gte : 75000000}}},
								{$project:{"projectdocs":1}},
								{$unwind:"$projectdocs"},
								{$group:{"_id":{"DocType":"$projectdocs.DocType"}, 
								    	 "count": {$sum: 1}}}
								)		
							
//Step 6							    
db.world_bank_project.aggregate({$match:{"totalcommamt": {$gte : 75000000}}},
								{$project:{"projectdocs":1}},
								{$unwind:"$projectdocs"},
								{$group:{"_id":{"DocType":
								                "$projectdocs.DocType"}, 
								    	 "count": {$sum: 1}}},
								{$sort:{"_id.DocType":1}}) 
							
// Example 7
// Create a collection called country_code using country_codes.json.
//mongoimport --db msds697 --collection country_code --file country_codes.json

// For all the projects whose "countrycode" is "CN", 
// create a field called country_phone_info 
// which includes data from country_code 
// (inclulding "name", "dial_code", "code", and "_id")
db.country_code.find({"code":"CN"})
db.world_bank_project.find({"countrycode":"CN"},{"countrycode":true})

db.world_bank_project.aggregate([{$match:{"countrycode":"CN"}},
                                {$lookup:{
                                    from:"country_code",
                                    localField:"countrycode",
                                    foreignField:"code",
                                    as:"country_phone_info"}
                                }]
                               )
                          
 								
// Example 8
// For world_bank_project, 
// 1) Find a document where  "countrycode" is "AO” and see its executionStats using cursor.explain("executionStats").
db.world_bank_project.find({"countrycode" : "AO"}).explain("executionStats") //"nReturned" : 1.0, "totalDocsExamined" : 500.0

// 2) Create a hashed-index  on “countrycode”.
db.world_bank_project.createIndex({"countrycode":"hashed"})

// 3) Find a document where  "countrycode" is "AO” and see its executionStats using cursor.explain("executionStats").
db.world_bank_project.find({"countrycode" : "AO"}).explain("executionStats")	//"nReturned" : 1.0, "totalDocsExamined" : 1.0				
                   
// 4) Drop the index
db.world_bank_project.dropIndex({"countrycode":"hashed"})


// Extra -- Return the restaurant_id and its average grade.
db.business.aggregate({$unwind:"$grades"},
                      {$group:{_id:"$restaurant_id", 
                              'avg_grade': {$avg: "$grades.score"}}},
                      {$project:{"restaurant_id": "$_id", 
                                 'avg_grade':1, 
                                 '_id':0}})
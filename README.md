# NodeJs Restful API with ExpressJS, AngularJS, Bootstrap, Mongoose, MongoJS, MongoDB and Monk

#######################   Init Project 


# Install bower dependencies

```	
Bower:
	1- Navigate to your project

	2- bower init (this will generate the bower.json file in your directory)

	3- To set the path where dependencies will be installed:
	   Manually create a .bowerrc file next to the bower.json file and add the following to it:
	   { "directory" : "public/components" }

	4- // Example to add dependencies
	   bower install bootstrap --save
	   bower install angular --save
	   bower install angular-resource --save
	   bower install angular-route --save

```
# Install npm dependencies

```
npm install

```

To avoid running the node app.js command each change module that restarts the server each update:
	npm i -S nodemon

	Update scripte in package.json:

```
"scripts": {
			 "mongoose": "nodemon mongoose.js",
             "mongojs": "nodemon mongojs.js",
             "mongodb": "nodemon mongodb.js",
             "monk": "nodemon monk.js"
		  }

```
	

To run Mongoose Example

```
npm run mongoose

```



To run MongoJS Example

```
npm run mongojs

```



To run MongoDB Example

```
npm run mongodb

```


To run Monk Example

```
npm run monk

```

http://localhost/


#######################   Init MongoDB Database   


 1- Run script mongod.exe

 2- Test command script:
 $ mongo

 > show dbs

 > use contactlist
   switched to db contactlist

 > db.contactlist.insert({name:'Selmi', email:'test1@test.com', number:'(111) - 111 - 1111'})

 > db.contactlist.find()

 > db.contactlist.find().pretty()

 > db.contactlist.insert([{name:'Selmi', email:'test2@test.com', number:'(111) - 111 - 1111'}, {name:'Seif', email:'test3@test.com', number:'(222) - 222 - 2222'}])

 > db.contactlist.remove({name:'Selmi', email:'test4@test.com', number:'(111) - 111 - 1111'})
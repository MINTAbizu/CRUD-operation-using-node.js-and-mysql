const mysql=require("mysql")
const express=require("express")
var bodyparser=require("body-parser");
var cors=require("cors")



const App=express()
App.use(bodyparser.urlencoded({ extended: true }));
App.use(cors())
const mysqlconnection=mysql.createConnection({
    user:"biruk",
    password:"biruk",
    database:"biruk",
    host:"localhost",
})

mysqlconnection.connect((error)=>{
    if(error){
        console.log(error)
    }
    console.log("server is connected to data base")
})
App.listen(1212,(error)=>{
    if(error){
        console.log(error)
    }
    console.log("server is running on port 1212")
})


// create data base table



//////////////////////////////////////////////////////////////////////////////////////////////
App.get("/company",(req,res)=>{
    let message="table is created"
    let customertable=`CREATE TABLE if not exists customer(
        customer_id int auto_increment,
        name varchar(255) not null,
        PRIMARY KEY(customer_id)
    

        
    )`;


    let addresstable=`CREATE TABLE if not exists address(
        address_id int auto_increment,
        customer_id int(11) not null,
        address varchar(255)not null,
        PRIMARY KEY(address_id),
        FOREIGN KEY(customer_id)  REFERENCES customer(customer_id)


        
    )`;



    let companytable=`CREATE TABLE if not exists company(
        company_id int auto_increment,
        customer_id int(11) not null,
        company varchar(255) not null,
        PRIMARY KEY(company_id),
        FOREIGN KEY(customer_id) REFERENCES  customer(customer_id)
    )`;
    mysqlconnection.query(customertable,(err,result,filed)=>{
        if(err){
            console.log(err)
        }
    })
    mysqlconnection.query(addresstable,(err,result,filed)=>{
        if(err){
            console.log(err)
        }
    });

    mysqlconnection.query(companytable,(err,result,filed)=>{
        if(err){
            if(err){
                console.log(err)
            }
        }
    })
 res.end(message)

});

App.post("/insert",(req,res)=>{
    // let Name=req.body.name
    const {Name,address,company}=req.body;

    // let address=req.body.address
    // let company=req.body.company

    let inserttocutomer= "INSERT INTO customer(name) VALUES(?)"
     let inserttoaddress= "INSERT INTO address( customer_id,address) VALUES(?,?)"
      let inserttocompany= "INSERT INTO company( customer_id,company) VALUES(?,?)"

    mysqlconnection.query(inserttocutomer,[Name],(err,results,filed)=>{
        if(err)console.log(err)


    
        const id =results.insertId;


        console.table(results)

        mysqlconnection.query(inserttoaddress,[id,address],(err,results,filed)=>{
            if(err){
                console.log(err)
            }
           
        })
        mysqlconnection.query(inserttocompany,[id,company],(err,results,filed)=>{
            if(err){
                console.log(err)
            }
        
        })


    console.log(id)
      
    })
    

    console.log(req.body)
})


// App.get("/selectallinfo",(req,res)=>{
//     let selectall="SELECT * FROM customer  JOIN address JOIN company ON customer. customer_id=address. address_id AND customer. customer_id=company.company_id"



//     mysqlconnection.query(selectall,(error,result,filed)=>{
//         if(error){
//             console.log(error)
//         }
//         console.log(result)
//         console.table(result)
//         res.send(result)
//     })
//     // 
// })

App.get("/selectallinfo",(req,res)=>{
    let selectallinfo="SELECT customer.customer_id AS id ,address.address,company.company FROM customer JOIN address JOIN company ON customer.customer_id=address.customer_id AND  customer.customer_id=company.customer_id"

mysqlconnection.query(selectallinfo,(error,result,filed)=>{
    if(error){
        console.log(error)
    }
    console.log(result)
    console.table(result)
    res.send(result)
})
})

App.put("/update",(req,res)=>{
    const {newname,id}=req.body

    let updatedata="UPDATE customer SET name=? WHERE customer_id=?"

    mysqlconnection.query(updatedata,[newname,id],(error,result,filed)=>{
        if(error){
            console.log(error)
        }
        console.log(result)
    })



})


App.delete("/deletinfo",(req,res)=>{
    const {id}=req.body

    let deletcustomer="DELETE customer WHERE  customer_id=?"
    let deletaddress="DELETE address WHERE  customer_id=?"
    let deletcompany="DELETE company WHERE  customer_id=?"


    mysqlconnection.query(deletcompany, [id],(error,result,filed)=>{
        if(error){
            console.log(error)
        }
        console.log(result)
    })

    mysqlconnection.query(deletaddress, [id],(error,result,filed)=>{
        if(error){
            console.log(error)
        }
        console.log(result)
    })
    mysqlconnection.query(deletcustomer, [id],(error,result,filed)=>{
        if(error){
            console.log(error)
        }
        console.log(result)
    })




})
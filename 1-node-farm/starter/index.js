const fs = require('fs');
const http = require('http');
const url  = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules.js/replaceTemplate');
// const { json } = require('stream/consumers');
// So we will call FS to the result(typing) of requiring the FS module. And FS here stands for file system. So by using this module here, we will get access to functions for reading data and writing data right to the file system. So again, calling this function here with this built-in FS module name will then return an object in which there are lots of functions that we can use. And restore that object right into the FS variable that we can then later use.
// -----------------------------------FILES-------------------------
// const hello = "Hello World";
// console.log(hello);

// blocking, synchronous way.
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avacado: ${textIn}\n Created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File Written!");

// non blocking , asynchronous way----------------------------------
// fs.readFile('./txt/startttt.txt', 'utf-8', (err, data1)=>{
//     if(err) return console.log("ERROR ......");
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2)=>{
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3)=>{
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err =>{
//                 console.log("your file has been written.");
//             })
//         })
//     })

// })
// console.log("will read file!");

// console.log("will read file!");
// const hassan = 'my name is nabeel hassan';

// fs.writeFile('./txt/final.txt', `${hassan}`, 'utf-8', err=>{
//     console.log("your file has been written");
// })

// ----------------------------------------SERVER-----------------
// const server = http.createServer((req, res)=>{
//     // console.log(req);
//     res.end("Hello from the server!");
// });

// server.listen(8000, '127.0.0.1', ()=>{
//     console.log("Listening to requests on port 8000");
// })



/*
So, http.createServer and create server will accept a callback function, which will be fired off each time a new request hits our server. And this callback function gets access to two very important and fundamental variables. It is the request variable, and a response variable. And a little bit more about them in a second. So, request, and response, So all we want to do now is to actually send back a response to the client and we do that with res., which is this object here, this response object, .end, and then 'Hello from the server!'. .end, and then 'Hello from the server!'. So that is the response that we're going to send back. So again, each time that a new request hits our server this callback function here will get called, and the callback function will have access to the request object which holds all kinds of stuff like the request url, and a bunch of other stuff. On the other hand, this response object here gives us a lot of tools basically for dealing with the response, so for sending out the response. The simplest one is .end, and this end here, the naming of this method will make a bit more sense a bit later.
*/

// ---------------------------routing-----------------
// const server = http.createServer((req, res)=>{
//     // console.log(req);
//     // console.log(req.url);
//     const pathName = req.url;
//     if(pathName === '/' || pathName === '/overview')
//     {
//         res.end("This is the overview.")
//     }else if(pathName === '/product'){
//         res.end("This is the product.")
//     }else{
//         res.writeHead(404, {
//             'Content-type': 'text/html',
//             'my-own-header': 'hello-world'
//         });
//         res.end("<h1>Page not found!</h1> ");
//     }
//     // res.end("Hello from the server!");
// });

// server.listen(8000, '127.0.0.1', ()=>{
//     console.log("Listening to requests on port 8000");
// })

// -------------------BUILDING A VERY SIMPLE API---------------
// const data = fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data)=>{
//             // we have the data in json format we have to first parse this data
//             const productData = JSON.parse(data);
//             // console.log(productData);
//             // res.writeHead(200, { 'Content-type': 'application/json'})
//             // res.end(data);
//         });
// const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
// const dataObj = JSON.parse(data);
// // we are using this synchronous version of file reading becoz it is the top level code and it happens just once at the start of the execution of the program. it is not related to the callbacks happening inside the server.
// const server = http.createServer((req, res)=>{
//     // console.log(req);
//     // console.log(req.url);
//     const pathName = req.url;
//     if(pathName === '/' || pathName === '/overview')
//     {
//         res.end("This is the overview.")
//     }else if(pathName === '/product'){
//         res.end("This is the product.")
//     }else if(pathName === '/api'){
//         // So what we want to do now is to actually read the datafrom this file here, then parse JSON into JavaScript,and then send back that result to the client.
//         // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data)=>{
//         //     // we have the data in json format we have to first parse this data
//         //     const productData = JSON.parse(data);
//         //     // console.log(productData);
//         //     res.writeHead(200, { 'Content-type': 'application/json'})
//         //     res.end(data);
//         // });
//         // res.end('api');
//         res.writeHead(200, {'Content-type': 'application/json'})
//         res.end(data);
//     }else{
//         res.writeHead(404, {
//             'Content-type': 'text/html',
//             'my-own-header': 'hello-world'
//         });
//         res.end("<h1>Page not found!</h1> ");
//     }
//     // res.end("Hello from the server!");
// });

// server.listen(8000, '127.0.0.1', ()=>{
//     console.log("Listening to requests on port 8000");
// })


// -------------------------------FILLING OUT THE HTML TEMPLATES-----------------------
// we will read the templates here only becoz there is no need to read the templates again and again just read it once in the starting synchronously.
// const replaceTemplate = (temp, product) =>{
//     let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//     output = output.replace(/{%IMAGE%}/g, product.image);
//     output = output.replace(/{%PRICE%}/g, product.price);
//     output = output.replace(/{%FROM%}/g, product.from);
//     output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//     output = output.replace(/{%QUANTITY%}/g, product.quantity);
//     output = output.replace(/{%DESCRIPTION%}/g, product.description);
//     output = output.replace(/{%ID%}/g, product.id);

//     if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

//     return output;
// }
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
/*
And again, keep in mind that we can do with the synchronized version because we are in the top level code. We just only executed once, right at the beginning when we load up these applications. So we could not do this inside of this createServer callback function, okay? Because this one is called each time there is a request. And if we have one million requests at the same time, then we could block the code one million times, once for each request.
*/
/*
Well, remember that in data object, we have an array of all the objects that are in data.JSON. So, all of these five objects, all in JavaScript objects, because we already parsed this data with just a string. Okay? So data object again is an array of at this point, five objects. So what we have to do is to basically loop through this array, and for each of them, replace the placeholders in the template with the actual data from the current product, okay? Make sense? So, let's put that in code. So data object, we're gonna loop through it with a map because we want to return something and that something, we will save into a new array, so let's call that one the cardsHtml, Okay? And so I'm sure you are familiar with the map method, okay? So what map does is accepts a callback function and this callback function gets as an argument the current element, so the element of the current loop and whatever we return here will then be saved into an array, okay? So let's say we're looping over an array with five elements which is the case here, and for each element, we will return something, and that something will then be put into the same position but in this new cardsHtml array. So, what will we do in each of these iterations? Well, we want to replace the placeholders, right? And so I'm actually gonna go ahead and create a function for that and that will be called replaceTemplate. Okay? And replaceTemplate will take in the card HTML
*/
const dataObj = JSON.parse(data);
const slugs = dataObj.map(el => slugify(el.productName, { lower: true}));
console.log(slugs);

const server = http.createServer((req, res)=>{

    // console.log(req.url);
    // console.log(url.parse(req.url), true);
    // const pathName = req.url;
    const {query, pathname} = url.parse(req.url, true);
    // overview page
    if(pathname === '/' || pathname === '/overview')
    {
        res.writeHead(200, {'Content-type': 'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        // console.log(cardsHtml);
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
        // product page
    }else if(pathname === '/product')
    {
        // console.log(query);
        res.writeHead(200, { 'Content-type': 'text/html'})
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
        // api
    }else if(pathname === '/api')
    {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
        // not found
    }else{
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }
});

server.listen(8000, '127.0.0.1', ()=>{
    console.log("Listening to request on port 8000.");
})



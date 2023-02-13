const Product = require('../models/Product')
const {asyncWrapper} = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')
//const paramsFunction = require('./uploadS3Helper')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectsCommand, S3KeyFilterFilterSensitiveLog} = require("@aws-sdk/client-s3")
const sha256 = require('crypto-js/sha256');
const Base64 = require('crypto-js/enc-base64')
const Hex = require('crypto-js/enc-hex')
require('dotenv').config()

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
})

const getNewestProducts = asyncWrapper(async (req, res) =>{
        const products = await Product.aggregate([
            { $unwind: '$attributes'},
            {$group: {_id: '$_id',
            colors:{
                $push:'$attributes.color'
            },
            variants:{
                $push:'$attributes'
            },
            price: {
                $push: '$price'
            },
            name: {
                $push: '$name'
            }
            }},
            {$unwind: '$variants'},
            {$project: {variants:1, colors:1, price:1, name:1}},
            {$sort: {'variants.createdAt':-1, _id:1}},
            {$limit: 4}
            
        ])
        res.status(200).json({products})  
})

const getAllProductsByCategory = asyncWrapper(async (req, res) =>{
        const category = req.params.category
        const dateOrder = req.query.dateOrder
        const priceOrder = req.query.priceOrder
        const scrollPageValue = req.query.scrollPage || 0
        const skipValue = scrollPageValue * 4
        if(dateOrder){
            const products = await Product.aggregate([
                {$match: {category: category}},
                { $unwind: '$attributes'},
                {$group: {_id: '$_id',
                colors:{
                    $push:'$attributes.color'
                },
                variants:{
                    $push:'$attributes'
                },
                price: {
                    $push: '$price'
                },
                name: {
                    $push: '$name'
                }
                }},
                {$unwind: '$variants'},
                {$project: {variants:1, colors:1, price:1, name:1}},
                {$sort: {'variants.createdAt':Number(dateOrder), _id:1}},
                {$skip: skipValue},
                {$limit: 4},
                
            ])
            const productsCount = await Product.aggregate([
                {$match: {category: category}},
                { $unwind: '$attributes'},
                {$group: {_id: '$_id',
                colors:{
                    $push:'$attributes.color'
                },
                variants:{
                    $push:'$attributes'
                },
                price: {
                    $push: '$price'
                },
                name: {
                    $push: '$name'
                }
                }},
                {$unwind: '$variants'},
                {$project: {variants:1, colors:1, price:1, name:1}},
                {$sort: {'variants.createdAt':Number(dateOrder), _id:1}}
                
            ])
            const number = productsCount.length
            res.status(200).json({products, number})
        } else if(priceOrder){
            const products = await Product.aggregate([
                {$match: {category: category}},
                { $unwind: '$attributes'},
                {$group: {_id: '$_id',
                colors:{
                    $push:'$attributes.color'
                },
                variants:{
                    $push:'$attributes'
                },
                price: {
                    $push: '$price'
                },
                name: {
                    $push: '$name'
                }
                }},
                {$unwind: '$variants'},
                {$project: {variants:1, colors:1, price:1, name:1}},
                {$sort: {'price':Number(priceOrder), _id:1}},
                {$skip: skipValue},
                {$limit: 4},
                
            ])
            const productsCount = await Product.aggregate([
                {$match: {category: category}},
                { $unwind: '$attributes'},
                {$group: {_id: '$_id',
                colors:{
                    $push:'$attributes.color'
                },
                variants:{
                    $push:'$attributes'
                },
                price: {
                    $push: '$price'
                },
                name: {
                    $push: '$name'
                }
                }},
                {$unwind: '$variants'},
                {$project: {variants:1, colors:1, price:1, name:1}},
                {$sort: {'price':Number(priceOrder), _id:1}}
            ])
            const number = productsCount.length
            res.status(200).json({products, number})
        } else{
            const products = await Product.aggregate([
                {$match: {category: category}},
                { $unwind: '$attributes'},
                {$group: {
                _id: '$_id',
                colors:{
                    $push:'$attributes.color'
                },
                variants:{
                    $push:'$attributes'
                },
                price: {
                    $push: '$price'
                },
                name: {
                    $push: '$name'
                }
                }},
                {$unwind: '$variants'},
                {$project: {variants:1, colors:1, price:1, name:1, count:1}},
                {$sort: {'variants.createdAt':1, _id:1}},
                {$skip: skipValue},
                {$limit: 4},
            ])
            const productsCount = await Product.aggregate([
                {$match: {category: category}},
                { $unwind: '$attributes'},
                {$group: {
                _id: '$_id',
                colors:{
                    $push:'$attributes.color'
                },
                variants:{
                    $push:'$attributes'
                },
                price: {
                    $push: '$price'
                },
                name: {
                    $push: '$name'
                }
                }},
                {$unwind: '$variants'},
                {$project: {variants:1, colors:1, price:1, name:1, count:1}},
                {$sort: {'variants.createdAt':1, _id:1}}
            ])
            const number = productsCount.length
            res.status(200).json({products, number})
        }
        
})

const getAllProductsByCategoryAndSubCategory = asyncWrapper(async (req, res) =>{
    const category = req.params.category
    const subCategory = req.params.subCategory
    const dateOrder = req.query.dateOrder
    const priceOrder = req.query.priceOrder
    const scrollPageValue = req.query.scrollPage || 0
    const skipValue = scrollPageValue * 4
        if(dateOrder){
            const products = await Product.aggregate([
                {$match: {category: category, subCategory: subCategory}},
                { $unwind: '$attributes'},
                {$group: {_id: '$_id',
                colors:{
                    $push:'$attributes.color'
                },
                variants:{
                    $push:'$attributes'
                },
                price: {
                    $push: '$price'
                },
                name: {
                    $push: '$name'
                }
                }},
                {$unwind: '$variants'},
                {$project: {variants:1, colors:1, price:1, name:1}},
                {$sort: {'variants.createdAt':Number(dateOrder), _id:1}},
                {$skip: skipValue},
                {$limit: 4},
                
            ])
            const productsCount = await Product.aggregate([
                {$match: {category: category, subCategory: subCategory}},
                { $unwind: '$attributes'},
                {$group: {_id: '$_id',
                colors:{
                    $push:'$attributes.color'
                },
                variants:{
                    $push:'$attributes'
                },
                price: {
                    $push: '$price'
                },
                name: {
                    $push: '$name'
                }
                }},
                {$unwind: '$variants'},
                {$project: {variants:1, colors:1, price:1, name:1}},
                {$sort: {'variants.createdAt':Number(dateOrder), _id:1}}
                
            ])
            const number = productsCount.length
            res.status(200).json({products, number})
        } else if(priceOrder){
            const products = await Product.aggregate([
                {$match: {category: category, subCategory: subCategory}},
                { $unwind: '$attributes'},
                {$group: {_id: '$_id',
                colors:{
                    $push:'$attributes.color'
                },
                variants:{
                    $push:'$attributes'
                },
                price: {
                    $push: '$price'
                },
                name: {
                    $push: '$name'
                }
                }},
                {$unwind: '$variants'},
                {$project: {variants:1, colors:1, price:1, name:1}},
                {$sort: {'price':Number(priceOrder), _id:1}},
                {$skip: skipValue},
                {$limit: 4},
                
            ])
            const productsCount = await Product.aggregate([
                {$match: {category: category, subCategory: subCategory}},
                { $unwind: '$attributes'},
                {$group: {_id: '$_id',
                colors:{
                    $push:'$attributes.color'
                },
                variants:{
                    $push:'$attributes'
                },
                price: {
                    $push: '$price'
                },
                name: {
                    $push: '$name'
                }
                }},
                {$unwind: '$variants'},
                {$project: {variants:1, colors:1, price:1, name:1}},
                {$sort: {'price':Number(priceOrder), _id:1}}
            ])
            const number = productsCount.length
            res.status(200).json({products, number})
        } else{
            const products = await Product.aggregate([
                {$match: {category: category, subCategory: subCategory}},
                { $unwind: '$attributes'},
                {$group: {
                _id: '$_id',
                colors:{
                    $push:'$attributes.color'
                },
                variants:{
                    $push:'$attributes'
                },
                price: {
                    $push: '$price'
                },
                name: {
                    $push: '$name'
                }
                }},
                {$unwind: '$variants'},
                {$project: {variants:1, colors:1, price:1, name:1, count:1}},
                {$sort: {'variants.createdAt':1, _id:1}},
                {$skip: skipValue},
                {$limit: 4},
            ])
            const productsCount = await Product.aggregate([
                {$match: {category: category, subCategory: subCategory}},
                { $unwind: '$attributes'},
                {$group: {
                _id: '$_id',
                colors:{
                    $push:'$attributes.color'
                },
                variants:{
                    $push:'$attributes'
                },
                price: {
                    $push: '$price'
                },
                name: {
                    $push: '$name'
                }
                }},
                {$unwind: '$variants'},
                {$project: {variants:1, colors:1, price:1, name:1, count:1}},
                {$sort: {'variants.createdAt':1, _id:1}}
            ])
            const number = productsCount.length
            res.status(200).json({products, number})
        }
})
const getAllProductsByCategorySubCategoryAndSubSubCateogry = asyncWrapper(async (req, res) =>{
    const category = req.params.category
    const subCategory = req.params.subCategory
    const subSubCategory = req.params.subSubCategory
    const dateOrder = req.query.dateOrder
    const priceOrder = req.query.priceOrder
    const scrollPageValue = req.query.scrollPage || 0
    const skipValue = scrollPageValue * 4
        if(dateOrder){
            const products = await Product.aggregate([
                {$match: {category: category, subCategory: subCategory, subSubCategory:subSubCategory}},
                { $unwind: '$attributes'},
                {$group: {_id: '$_id',
                colors:{
                    $push:'$attributes.color'
                },
                variants:{
                    $push:'$attributes'
                },
                price: {
                    $push: '$price'
                },
                name: {
                    $push: '$name'
                }
                }},
                {$unwind: '$variants'},
                {$project: {variants:1, colors:1, price:1, name:1}},
                {$sort: {'variants.createdAt':Number(dateOrder), _id:1}},
                {$skip: skipValue},
                {$limit: 4},
                
            ])
            const productsCount = await Product.aggregate([
                {$match: {category: category, subCategory: subCategory, subSubCategory:subSubCategory}},
                { $unwind: '$attributes'},
                {$group: {_id: '$_id',
                colors:{
                    $push:'$attributes.color'
                },
                variants:{
                    $push:'$attributes'
                },
                price: {
                    $push: '$price'
                },
                name: {
                    $push: '$name'
                }
                }},
                {$unwind: '$variants'},
                {$project: {variants:1, colors:1, price:1, name:1}},
                {$sort: {'variants.createdAt':Number(dateOrder), _id:1}}
                
            ])
            const number = productsCount.length
            res.status(200).json({products, number})
        } else if(priceOrder){
            const products = await Product.aggregate([
                {$match: {category: category, subCategory: subCategory, subSubCategory:subSubCategory}},
                { $unwind: '$attributes'},
                {$group: {_id: '$_id',
                colors:{
                    $push:'$attributes.color'
                },
                variants:{
                    $push:'$attributes'
                },
                price: {
                    $push: '$price'
                },
                name: {
                    $push: '$name'
                }
                }},
                {$unwind: '$variants'},
                {$project: {variants:1, colors:1, price:1, name:1}},
                {$sort: {'price':Number(priceOrder), _id:1}},
                {$skip: skipValue},
                {$limit: 4},
                
            ])
            const productsCount = await Product.aggregate([
                {$match: {category: category, subCategory: subCategory, subSubCategory:subSubCategory}},
                { $unwind: '$attributes'},
                {$group: {_id: '$_id',
                colors:{
                    $push:'$attributes.color'
                },
                variants:{
                    $push:'$attributes'
                },
                price: {
                    $push: '$price'
                },
                name: {
                    $push: '$name'
                }
                }},
                {$unwind: '$variants'},
                {$project: {variants:1, colors:1, price:1, name:1}},
                {$sort: {'price':Number(priceOrder), _id:1}}
            ])
            const number = productsCount.length
            res.status(200).json({products, number})
        } else{
            const products = await Product.aggregate([
                {$match: {category: category, subCategory: subCategory, subSubCategory:subSubCategory}},
                { $unwind: '$attributes'},
                {$group: {
                _id: '$_id',
                colors:{
                    $push:'$attributes.color'
                },
                variants:{
                    $push:'$attributes'
                },
                price: {
                    $push: '$price'
                },
                name: {
                    $push: '$name'
                }
                }},
                {$unwind: '$variants'},
                {$project: {variants:1, colors:1, price:1, name:1, count:1}},
                {$sort: {'variants.createdAt':1, _id:1}},
                {$skip: skipValue},
                {$limit: 4},
            ])
            const productsCount = await Product.aggregate([
                {$match: {category: category, subCategory: subCategory, subSubCategory:subSubCategory}},
                { $unwind: '$attributes'},
                {$group: {
                _id: '$_id',
                colors:{
                    $push:'$attributes.color'
                },
                variants:{
                    $push:'$attributes'
                },
                price: {
                    $push: '$price'
                },
                name: {
                    $push: '$name'
                }
                }},
                {$unwind: '$variants'},
                {$project: {variants:1, colors:1, price:1, name:1, count:1}},
                {$sort: {'variants.createdAt':1, _id:1}}
            ])
            const number = productsCount.length
            res.status(200).json({products, number})
        }
})

const getProductByIds = asyncWrapper(async (req, res, next) => {
    const productId = req.params.productId
    const variantId = req.params.variantId
    const product = await Product.aggregate([
        {$match: {_id: ObjectId(productId)}},
        {$unwind: '$attributes'},
        {$match: {'attributes._id': ObjectId(variantId)}}
    ])

    if(!product){
        return next(createCustomError(`No product with id: ${productId} and variant id: ${variantId}`, 404))
    }
    res.status(201).json({product})
})
const getProductById = asyncWrapper(async (req, res, next) =>{
        const productID = req.params.id
        const product = await Product.aggregate([
            {$match: {_id: ObjectId(productID)}}
        ])
        if(!product){
            return next(createCustomError(`No Product with id : ${productID}`, 404))
        }
        res.status(201).json({product})
})

const searchProductByName = asyncWrapper(async (req, res, next) =>{
    const productName = req.params.name
    const product = await Product.findOne({name: productName})
    if(!product){
        return next(createCustomError(`No products with name : ${productName}`, 404))
    }
    res.status(201).json({product})
})

const createProduct = asyncWrapper(async (req,res) =>{
        const product = await Product.create(req.body)
        res.status(201).json({product})
})

function encode(input, message){
    const output = sha256(input + message);
    const finalOutput = Hex.stringify(output)
    return finalOutput
}

const createProductPhoto = asyncWrapper(async (req,res) =>{
    let files = req.files
    let params = files.map(file =>{
        try{
            return {
                Bucket: bucketName,
                Key: encode(file.originalname, new Date()),
                Body: file.buffer,
                ContentType: file.mimetype
            }
        }catch(err){
            console.log(err)
        }
    })
    
    console.log(params)
    let commands = params.map((command) =>{
        try{
            return {
                Key: command.Key
            }
        }catch(err){
            console.log(err)
        }
    })

    await Promise.all(
        params.map((param) => s3.send(new PutObjectCommand(param)))
    )

    console.log(commands)
    let urls = [];

    for(let i=0; i<commands.length; i++){
        try{
            urls[i] = 'https://simply-learn-s3r.s3.eu-central-1.amazonaws.com/' + commands[i].Key
        }catch(err){
            console.log(err)
        }
    }

    if(urls.length<5){
        for(let i=urls.length; i<5; i++ ){
            urls[i]='empty'
        }
    }

    const product = await Product.create({
        name:req.body.name,
        price: req.body.price,
        category: req.body.category,
        subCategory: req.body.subCategory,
        subSubCategory: req.body.subSubCategory,
        attributes:[{
            color: req.body.color,
            mainImageUrl: urls[0],
            secondaryImages:[
                urls[1],
                urls[2],
                urls[3],
                urls[4]
            ],
            sizes:[
                {value:'XS', quantity:req.body.sizeXS},
                {value:'S', quantity:req.body.sizeS},
                {value:'M', quantity:req.body.sizeM},
                {value:'L', quantity:req.body.sizeL},
                {value:'XL', quantity:req.body.sizeXL},
                {value:'XXL', quantity:req.body.sizeXXL}
            ],
            createdAt: new Date(),
            updatedAt: new Date()
            
        }]

    })
    res.status(201).json({product})
})

const updateProductPhotosAndSizes = asyncWrapper(async (req,res) =>{
    const productId = req.body.productId
    const variantId = req.body.variantId
    const variant = await Product.aggregate([
        {$match: {_id: ObjectId(productId)}},
        {$unwind: '$attributes'},
        {$match: {'attributes._id': ObjectId(variantId)}},
        {$project: {'attributes.mainImageUrl':1, 'attributes.secondaryImages':1, _id:0}},
        
    ])

    let mystring = variant[0].attributes.mainImageUrl
    mystring = mystring.replace('https://simply-learn-s3r.s3.eu-central-1.amazonaws.com/','');
    console.log(mystring)

    let urlsDelete = [];
    let secondaryImages = variant[0].attributes.secondaryImages
    for(let i=0; i<secondaryImages.length; i++){
        urlsDelete[i] = secondaryImages[i].replace('https://simply-learn-s3r.s3.eu-central-1.amazonaws.com/','')
        console.log(urlsDelete[i])
    }
    urlsDelete.push(mystring)
    console.log(urlsDelete.length)

    let commandsDelete = urlsDelete.map((command) =>{
        try{
            return {
                Key: command
            }
        }catch(err){
            console.log(err)
        }
    })

    const bucketParams = {
        Bucket: bucketName,
        Delete: {
          Objects: commandsDelete,
        },
      };

    const run = async () => {
        try {
          const data = await s3.send(new DeleteObjectsCommand(bucketParams));
          return data;
        } catch (err) {
          console.log("Error", err);
        }
      };

    run();

    //Add new pictures to s3 bucket

    let files = req.files
    let params = files.map(file =>{
        try{
            return {
                Bucket: bucketName,
                Key: encode(file.originalname, new Date()),
                Body: file.buffer,
                ContentType: file.mimetype               
            }
        }catch(err){
            console.log(err)
        }
    })
    
    console.log(params)
    let commands = params.map((command) =>{
        try{
            return {
                Key: command.Key
            }
        }catch(err){
            console.log(err)
        }
    })

    await Promise.all(
        params.map((param) => s3.send(new PutObjectCommand(param)))
    )

    console.log(commands)
    let urls = [];

    for(let i=0; i<commands.length; i++){
        try{
            urls[i] = 'https://simply-learn-s3r.s3.eu-central-1.amazonaws.com/' + commands[i].Key
        }catch(err){
            console.log(err)
        }
    }
    const mainImageUrl = urls.shift()

    if(urls.length<4){
        for(let i=urls.length; i<4; i++ ){
            urls[i]='empty2'
        }
    }
    
    console.log(urls[1])
    const product = await Product.updateMany(
        {_id:productId, 'attributes._id':variantId},
        {$set: {'attributes.$.mainImageUrl': mainImageUrl}}
        
    )

    const secondaryImagesUpdate = await Product.updateMany(
        {_id:productId, 'attributes._id':variantId},
        {$set: {'attributes.$.secondaryImages': urls}},
        {upsert:false}
    )
    
    let sizeArray = []
    sizeArray[0] = { productSize: 'XS', quantity: req.body.XS}
    sizeArray[1] = { productSize: 'S',quantity: req.body.S}
    sizeArray[2] = { productSize: 'M',quantity: req.body.M}
    sizeArray[3] = { productSize: 'L',quantity: req.body.L}
    sizeArray[4] = { productSize: 'XL',quantity: req.body.XL}
    sizeArray[5] = { productSize: 'XXL',quantity:req.body.XXL}

    for(let i=0; i<sizeArray.length; i++){
        const product = await Product.findOneAndUpdate(
            {_id:productId, 'attributes._id':variantId},
            {$inc: {'attributes.$.sizes.$[v].quantity': + sizeArray[i].quantity}},
            {arrayFilters: [{'v.value':sizeArray[i].productSize}],
                upsert: true,
                new: true
            }
        )
    }   

    res.status(200).json({ message: 'ok' });
    
})


const createProductVariant = asyncWrapper(async (req, res, next) =>{
        const productID = req.params.id
        let files = req.files
    let params = files.map(file =>{
        try{
            return {
                Bucket: bucketName,
                Key: encode(file.originalname, new Date()),
                Body: file.buffer,
                ContentType: file.mimetype
            }
        }catch(err){
            console.log(err)
        }
    })
    
    console.log(params)
    let commands = params.map((command) =>{
        try{
            return {
                Key: command.Key
            }
        }catch(err){
            console.log(err)
        }
    })

    await Promise.all(
        params.map((param) => s3.send(new PutObjectCommand(param)))
    )

    console.log(commands)
    let urls = [];

    for(let i=0; i<commands.length; i++){
        try{
            urls[i] = 'https://simply-learn-s3r.s3.eu-central-1.amazonaws.com/' + commands[i].Key
        }catch(err){
            console.log(err)
        }
    }

    if(urls.length<5){
        for(let i=urls.length; i<5; i++ ){
            urls[i]='empty'
        }
    }
        let data = {
            color: req.body.color,
            mainImageUrl: urls[0],
            secondaryImages:[
                urls[1],
                urls[2],
                urls[3],
                urls[4]
            ],
            sizes:[
                {value:'XS', quantity:req.body.sizeXS},
                {value:'S', quantity:req.body.sizeS},
                {value:'M', quantity:req.body.sizeM},
                {value:'L', quantity:req.body.sizeL},
                {value:'XL', quantity:req.body.sizeXL},
                {value:'XXL', quantity:req.body.sizeXXL}
            ],
            createdAt: new Date(),
            updatedAt: new Date()
        }
        console.log(data)
        const product = await Product.findOneAndUpdate(
            {_id: productID},  
            {$push: {attributes:data}},
            { new: true })
        if(!product){
            return next(createCustomError(`No Product with id: ${productID}`, 404))
        }
        res.status(200).json({product})
})


const deleteProduct = asyncWrapper(async (req, res, next) =>{
        const{id:productId} = req.params
        const variant = await Product.aggregate([
            {$match: {_id: ObjectId(productId)}},
            {$unwind: '$attributes'},
            {$project: {'attributes.mainImageUrl':1, 'attributes.secondaryImages':1, _id:0}},
            
        ])
        console.log(variant.length)
        let urlsDelete = [];
        let ulrLenght= 0;    
        for(let i=0; i<variant.length; i++){              
            let mystring = variant[i].attributes.mainImageUrl
            mystring = mystring.replace('https://simply-learn-s3r.s3.eu-central-1.amazonaws.com/','');
           
            let secondaryImages = variant[i].attributes.secondaryImages
            for(let j=0; j<secondaryImages.length; j++){
                urlsDelete[ulrLenght + j] = secondaryImages[j].replace('https://simply-learn-s3r.s3.eu-central-1.amazonaws.com/','')
            }
            urlsDelete.push(mystring)
            ulrLenght = urlsDelete.length
        }

        for(let i =0; i<urlsDelete.length; i++){
            console.log(urlsDelete[i])
        }

        let commandsDelete = urlsDelete.map((command) =>{
            try{
                return {
                    Key: command
                }
            }catch(err){
                console.log(err)
            }
        })
    
        const bucketParams = {
            Bucket: bucketName,
            Delete: {
              Objects: commandsDelete,
            },
          };
    
        const run = async () => {
            try {
              const data = await s3.send(new DeleteObjectsCommand(bucketParams));
              return data; 
            } catch (err) {
              console.log("Error", err);
            }
          };
    
        run();

        const product = await Product.findOneAndDelete({_id:productId})
        if(!product){
            return next(createCustomError(`No Product with id: ${productId}`, 404))
        }
        res.status(200).json({product})
})

const deleteVariant = asyncWrapper(async (req, res, next) => {
    const productId = req.params.productId
    const variantId = req.params.variantId

    const variant = await Product.aggregate([
        {$match: {_id: ObjectId(productId)}},
        {$unwind: '$attributes'},
        {$match: {'attributes._id': ObjectId(variantId)}},
        {$project: {'attributes.mainImageUrl':1, 'attributes.secondaryImages':1, _id:0}},
        
    ])

    let mystring = variant[0].attributes.mainImageUrl
    mystring = mystring.replace('https://simply-learn-s3r.s3.eu-central-1.amazonaws.com/','');
    console.log(mystring)

    let urlsDelete = [];
    let secondaryImages = variant[0].attributes.secondaryImages
    for(let i=0; i<secondaryImages.length; i++){
        urlsDelete[i] = secondaryImages[i].replace('https://simply-learn-s3r.s3.eu-central-1.amazonaws.com/','')
        console.log(urlsDelete[i])
    }
    urlsDelete.push(mystring)
    console.log(urlsDelete.length)

    let commandsDelete = urlsDelete.map((command) =>{
        try{
            return {
                Key: command
            }
        }catch(err){
            console.log(err)
        }
    })

    const bucketParams = {
        Bucket: bucketName,
        Delete: {
          Objects: commandsDelete,
        },
      };

    const run = async () => {
        try {
          const data = await s3.send(new DeleteObjectsCommand(bucketParams));
          return data; // For unit tests.
        } catch (err) {
          console.log("Error", err);
        }
      };

    run();

    const product = await Product.updateOne(
        {_id:productId},
        {$pull: {attributes: {_id: variantId}}}
    )
    res.status(200).json({product})
})

const updateSizeQuantityCart = asyncWrapper(async (req, res, next) => {

    for(let i=0; i<req.body.products.length; i++){
    const product = await Product.findOneAndUpdate(
        {_id:req.body.products[i].productId, 'attributes._id':req.body.products[i].variantId},
        {$inc: {'attributes.$.sizes.$[v].quantity': - req.body.products[i].quantity}},
        {arrayFilters: [{'v.value':req.body.products[i].productSize}],
            upsert: true,
            new: true
        }
    )
    }
    res.status(200).json({ message: 'ok' });
    console.log('okay')
})


module.exports = {
    getNewestProducts,
    getAllProductsByCategory,
    getAllProductsByCategoryAndSubCategory,
    getAllProductsByCategorySubCategoryAndSubSubCateogry,
    createProduct,
    getProductById,
    getProductByIds,
    searchProductByName,
    deleteProduct,
    deleteVariant,
    createProductPhoto,
    createProductVariant,
    updateSizeQuantityCart,
    updateProductPhotosAndSizes
}
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');
const controller = require('../controllers/api')
const multer = require('multer');
const __basedir = __dirname;
const path = require('path');
require('dotenv').config();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


// Swagger set up
const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Juridico API",
            version: "1.0.0",
            description:
                "Documentation for SDK API",
        },
        servers: [
            {
                url: "http://localhost:4516/api/",
                description: "Local Server"
            },
            {
                url: "http://54.92.141.233:4516/api/",
                description: "Development Server"
            }
        ]
    },
    apis: ["./docs/*.yaml"]
};

const swaggerSpec = swaggerJSDoc(options);


const destination = path.join(__basedir, "../", 'public/tmp/kyc')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination); // Absolute path. Folder must exist, will not be created for you.
    },
    filename: function (req, file, cb) {
        console.log('file',file)
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
    onFileUploadStart: function (file) {
        console.log(file.fieldname + ' is starting ...')
    },
    onFileUploadData: function (file, data) {
        console.log(data.length + ' of ' + file.fieldname + ' arrived')
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
    }
  })

const upload = multer({ storage: storage });


/* GET users listing. */
router.get('/printschema', function(req, res, next) {
   const schema = {
        name : "",
        lastname : "",
        secondLastname : "",
        dob : "",
        idType : "",
        idNumber : "",
        idExpirationDate : "",
        countryOB : "",
        nationality : "",
        sex : "",
        homePhone : "",
        cellPhone : "",
        fax : "",
        email : "",
        secundaryEmail : "",
        profession : "",
        maritalStatus : "",
        countryResidence : "",
        province : "",
        canton : "",
        distrit : "",
        poBox : "",
        address : "",
        //laboral info
        businessName : "",
        businessOccupation : "",
        businessNature : "",
        businessPhone : "",
        businessRevenue : "",
        businessCurrency : "",
        businessAddress : "",
        //political info
        pep : "",
        usTaxPayer : "",
        fatcaTin : "",
        crsTin : "",
        crsAddress : "",
        fepClient: "" ,
        //origin of the founds
        foundOrigin: [],
        heritageName: "",
        heritageRelationship: "",
        heritageAmount: "",
        pensionAmount: "",
        pensionDate: "",
        movingFoundsName: "",
        movingFoundsCurrency: "",
        movingFoundsAmount: "",
        movingFoundsDetail: "",
        otherDetail: "",
        thirtPartyFounds: "",
        thirdPartyPicture: "",
        activities: [],
        activitiesValidation: "",
        //Banking references
        bankingReference : [],
        mainClients : [],
        products : [],
        creditCardLimit : "",
        creditCardCurrency : "",
        accountCurrency : "",
        savingAccountCurrency: "" ,
        highAccountCurrency: ""   ,
        //Expected Activity
        expectedProducts : [],
        productDesc : "",
        estimateCreditAmount : "",
        estimateCreditCurrency : "",
        estimateDebitAmount : "",
        estimateDebitCurrency : "",
        otherProductDesc: "",
        //Files
        workDocPic :"",
        idPicFront :"",
       certificationPatrimonialPic: "",
       identificationRepresentativePic: "",
        idPicBack :"",
        publicService :""  ,
        Signature: {},
        //Metadata
        metadata: {
            interactions: [] //login
        },
        revisions: [],
        createdAt: moment(),
        updatedAt: "",
        transactionID: "",
   }
  res.json(schema);
});

router.get('/migrateFromFile', controller.migrateFromFile);

router.get('/getUserById', function(req, res, next) {
    res.send('respond with a resource');
  });

router.get('/getCustomerInformation/:carisId', controller.getCustomerInfo);
router.get('/getLaboralInfo/:carisId', controller.getLaboralInfo);
router.get('/getPoliticalInfo/:carisId', controller.getPoliticalInfo);
router.get('/getfoundOrigin/:carisId', upload.any(), controller.getfoundOrigin);
router.get('/getBankingReference/:carisId', controller.getBankingReference);
router.get('/getExpectedActivity/:carisId', controller.getExpectedActivity);
router.get('/getFiles/:carisId', controller.getFiles);
router.get('/getSignature/:carisId', controller.getSignature);
router.get('/getCountStatus/', controller.getCountStatus);
router.get('/getKYCInfo/:carisId', controller.getKYCSettings);

router.get('/getAllKYC/', controller.getAllKYC);
router.get('/getAllByPending/', controller.getAllByPending);
router.get('/getAllByInProgress/', controller.getAllByInProgress);
router.get('/getAllByInReview/', controller.getAllByInReview);
router.get('/getAllByApproved/', controller.getAllByApproved);
router.get('/getAllByDone/', controller.getAllByDone);
router.get('/getAllByOpened/', controller.getAllByOpened);
router.get('/getAllBySigned/', controller.getAllBySigned);
router.get('/getAllByRejected/', controller.getAllByRejected);
router.get('/getAllByUserId/:userId', controller.getAllByRejected);



router.post('/setCustomerInformation', controller.setCustomerInfo);
router.post('/setLaboralInfo', controller.setCustomerInfo);
// router.post('/setCustomerInformation', controller.setCustomerInfo);
router.post('/setPoliticalInfo', controller.setPoliticalInfo);
router.post('/setfoundOrigin', upload.any(), controller.setfoundOrigin);
router.post('/setFoundOriginsFiles', upload.any(), controller.setFoundOriginsFiles);
router.post('/setBankingReference', controller.setBankingReference);
router.post('/setExpectedActivity', controller.setExpectedActivity);
router.post('/setFiles', upload.any(), controller.setFiles);
router.post('/setSignature', controller.setSignature);
router.post('/setOwner', controller.setOwner);

router.delete('/deleteDoc/:carisId/:doc', controller.deletePicture)

router.post('/setStatus', controller.setStatus);
router.post('/setRevision', controller.setRevision);
router.post('/setRejects', controller.setRejects);

router.get('/getKYClistByStatus', controller.getKYCStatusList)
router.get('/getAllByOwner/:owner', controller.getAllByOwner)
router.get('/getPDFdata/:carisId', controller.getAllPDF)
router.get('/getAllAttached/:carisId', controller.getAllAttached)

router.get('/getAdditionalSigners/:carisId', controller.getAdditionalSigners);
router.post('/setAdditionalSigners', controller.setAdditionalSigners);



router.post('/login', controller.getLogin);

router.get('/getAdditionalLoginDetails/:carisId', controller.getAdditionalLoginDetails);

router.get('/getPrimaryCustomerInformation/:carisId', controller.getPrimaryCustomerInfo);

router.post('/setPrimaryCustomerInformation', controller.setPrimaryCustomerInfo);

router.get('/getPartners/:carisId', controller.getPartners);
router.post('/setPartners', controller.setPartners);
router.get('/migrateExcelToMongo', controller.processExcelDataToMongo)
router.get('/migrateRepresentativeExcelToMongo', controller.processRepresentativesFromExcel)





router.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(swaggerSpec, { explorer: true }));

module.exports = router;

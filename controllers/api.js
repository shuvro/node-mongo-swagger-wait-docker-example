const _ = require('lodash');
const mongoose = require('mongoose');
const kycJuridicoSchema = require('../schema/kyc');
const moment = require('moment');
const uuidv4 = require('uuid/v4');
const customersData = require('../dataload/customer-data/somedir/index')
const representativeData = require('../dataload/customer-data/somedir/representatives')
const ba64 = require('ba64');
const loginFilters = {
    carisId: 1,
    _id: -1,
    metadata: 1,
    name: 1,
    email: 1
};
const getLogin = async (req, res) => {
    let objResponse = {};
    objResponse.success = false;
    objResponse.message = 'user not found svc';
    // console.log('req.body',req.body)
    if (!req.body.legalId)
        return res.json(objResponse);

    let KYC = mongoose.model('KYC', kycJuridicoSchema);
    try {
        // let lastname = `/^${}$/i`;
        // let lastname = new RegExp(["^", req.body.lastname, "$"].join(""), "i");

        let legalId = req.body.legalId.toString();
        let rst = await KYC.find({legalId: legalId}).select(loginFilters).exec();
        objResponse.success = false;

        if (rst.length > 0) {
            console.log('rst.metadata.firstSeen', rst)
            if (rst[0].metadata && rst[0].metadata.firstSeen === undefined) {
                console.log('here')
                saveAndUpdateObj(rst[0].carisId, {"metadata.firstSeen": moment()})
            }

            objResponse.success = true;
            objResponse.message = 'user found';
            objResponse.carisId = rst[0].carisId;
            objResponse.name = rst[0].name;
            objResponse.email = rst[0].email;
        } else {
            objResponse.success = false;
            objResponse.message = 'user not found';
        }
        res.json(objResponse);
    } catch (e) {
        console.log('db error', e)
    }

}

const getPrimaryCustomerInfo = async (req, res) => {
    let objResponse = {};
    objResponse.success = false;
    objResponse.message = 'user no9t found svc';

    let params = {
        legalId: 1,
        companyRegistrationName: 1,
        tradeName: 1,
        constitutionDate: 1,
        typeOfLegalEntity: 1,
        typeOfLegalEntityOther: 1,
        typeOfEconomicActivity: 1,
        economicActivityDetail: 1,

        companyFound: 1,
        companyCountryResidence: 1,
        companyProvince: 1,
        companyCanton: 1,
        companyDistrit: 1,
        companyPoBox: 1,
        companyAddress: 1,

        additionalRepresentative: 1,
        partners: 1,

        _id: -1,
        status: 1
    };
    // console.log('req.body',req.body)
    if (!req.params.carisId)
        return res.json(objResponse);

    let KYC = mongoose.model('KYC', kycJuridicoSchema);

    try {
        let rst = await KYC.find({carisId: req.params.carisId}).select(params).exec();
        objResponse.success = false;

        if (rst.length > 0) {
            objResponse.success = true;
            objResponse.message = 'user found';
            objResponse.data = rst[0];
        } else {
            objResponse.success = false;
            objResponse.message = 'user not found';
        }

        console.log('objResponse', objResponse)
        res.json(objResponse);
    } catch (e) {
        console.log('db error', e)
    }
}

const getCustomerInfo = async (req, res) => {
    let objResponse = {};
    objResponse.success = false;
    objResponse.message = 'user not found svc';

    let params = {
        name: 1,
        lastname: 1,
        secondLastname: 1,
        dob: 1,
        idType: 1,
        idNumber: 1,
        idExpirationDate: 1,
        countryOB: 1,
        nationality: 1,
        sex: 1,
        homePhone: 1,
        cellPhone: 1,
        fax: 1,
        email: 1,
        secundaryEmail: 1,
        profession: 1,
        occupation: 1,
        maritalStatus: 1,
        countryResidence: 1,
        province: 1,
        canton: 1,
        distrit: 1,
        poBox: 1,
        address: 1,
        additionalRepresentative: 1,
        _id: -1,
        status: 1
    }
    // console.log('req.body',req.body)
    if (!req.params.carisId)
        return res.json(objResponse);

    let KYC = mongoose.model('KYC', kycJuridicoSchema);

    try {
        let rst = await KYC.find({carisId: req.params.carisId}).select(params).exec();
        objResponse.success = false;

        if (rst.length > 0) {
            objResponse.success = true;
            objResponse.message = 'user found';
            objResponse.data = rst[0];
        } else {
            objResponse.success = false;
            objResponse.message = 'user not found';
        }

        console.log('objResponse', objResponse)
        res.json(objResponse);
    } catch (e) {
        console.log('db error', e)
    }
}

const getKYCSettings = async (req, res) => {
    let objResponse = {};
    objResponse.success = false;
    objResponse.message = 'user not found svc';

    let params = {
        status: 1,
        metadata: 1,
        revisions: 1,
        owner: 1,
        rejects: 1,
        createdAt: 1,
        updatedAt: 1,
        _id: -1
    }
    // console.log('req.body',req.body)
    if (!req.params.carisId)
        return res.json(objResponse);

    let KYC = mongoose.model('KYC', kycJuridicoSchema);

    try {
        let rst = await KYC.find({carisId: req.params.carisId}).select(params).exec();
        objResponse.success = false;

        if (rst.length > 0) {
            objResponse.success = true;
            objResponse.message = 'user found';
            objResponse.data = rst[0];
        } else {
            objResponse.success = false;
            objResponse.message = 'user not found';
        }

        console.log('objResponse', objResponse)
        res.json(objResponse);
    } catch (e) {
        console.log('db error', e)
    }
}

const getLaboralInfo = async (req, res) => {
    let objResponse = {};
    objResponse.success = false;
    objResponse.message = 'user not found svc';

    let params = {
        businessName: 1,
        businessOccupation: 1,
        businessNature: 1,
        businessPhone: 1,
        businessRevenue: 1,
        businessCurrency: 1,
        businessAddress: 1,
    }
    // console.log('req.body',req.body)
    if (!req.params.carisId)
        return res.json(objResponse);

    let KYC = mongoose.model('KYC', kycJuridicoSchema);

    try {
        let rst = await KYC.find({carisId: req.params.carisId}).select(params).exec();
        objResponse.success = false;

        if (rst.length > 0) {
            objResponse.success = true;
            objResponse.message = 'user found';
            objResponse.data = rst[0];
        } else {
            objResponse.success = false;
            objResponse.message = 'user not found';
        }
        res.json(objResponse);
    } catch (e) {
        console.log('db error', e)
    }
}
const getPoliticalInfo = async (req, res) => {
    let objResponse = {};
    objResponse.success = false;
    objResponse.message = 'user not found svc';

    let params = {
        pep: 1,
        usTaxPayer: 1,
        fatcaTin: 1,
        crsTin: 1,
        crsAddress: 1,
        crsTin1: 1,
        crsAddress1: 1,
        crsTin2: 1,
        crsAddress2: 1,
        fepClient: 1,
        gin: 1,
        fepName: 1,
        fepTIN: 1,
        fepAddress: 1,
    }
    // console.log('req.body',req.body)
    if (!req.params.carisId)
        return res.json(objResponse);

    let KYC = mongoose.model('KYC', kycJuridicoSchema);

    try {
        let rst = await KYC.find({carisId: req.params.carisId}).select(params).exec();
        objResponse.success = false;

        if (rst.length > 0) {
            objResponse.success = true;
            objResponse.message = 'user found';
            objResponse.data = rst[0];
        } else {
            objResponse.success = false;
            objResponse.message = 'user not found';
        }
        res.json(objResponse);
    } catch (e) {
        console.log('db error', e)
    }
}
const getfoundOrigin = async (req, res) => {
    console.log('here -> getfoundOrigin')
    // console.log(req)
    let objResponse = {};
    objResponse.success = false;
    objResponse.message = 'user not found svc';

    let params = {
        foundOrigin: 1,
        heritageName: 1,
        heritageRelationship: 1,
        heritageAmount: 1,
        pensionAmount: 1,
        pensionDate: 1,
        movingFoundsName: 1,
        movingFoundsCurrency: 1,
        movingFoundsAmount: 1,
        movingFoundsDetail: 1,
        otherDetail: 1,
        thirtPartyFounds: 1,
        thirdPartyPicture: 1,
        activities: 1,
        activitiesValidation: 1,
    }
    // console.log('req.body',req.body)
    if (!req.params.carisId)
        return res.json(objResponse);

    let KYC = mongoose.model('KYC', kycJuridicoSchema);

    try {
        let rst = await KYC.find({carisId: req.params.carisId}).select(params).exec();
        objResponse.success = false;

        if (rst.length > 0) {
            objResponse.success = true;
            objResponse.message = 'user found';
            objResponse.data = rst[0];
        } else {
            objResponse.success = false;
            objResponse.message = 'user not found';
        }
        res.json(objResponse);
    } catch (e) {
        console.log('db error', e)
    }
}
const getBankingReference = async (req, res) => {
    let objResponse = {};
    objResponse.success = false;
    objResponse.message = 'user not found svc';

    let params = {
        bankingReference: 1,
        mainClients: 1,
        products: 1,
        creditCardLimit: 1,
        creditCardCurrency: 1,
        accountCurrency: 1,
        accountCurrency1: 1,
        accountCurrency2: 1,
        savingAccountCurrency: 1,
        savingAccountCurrency1: 1,
        savingAccountCurrency2: 1,
        highAccountCurrency: 1,
        highAccountCurrency1: 1,
        highAccountCurrency2: 1,
    }
    // console.log('req.body',req.body)
    if (!req.params.carisId)
        return res.json(objResponse);

    let KYC = mongoose.model('KYC', kycJuridicoSchema);

    try {
        let rst = await KYC.find({carisId: req.params.carisId}).select(params).exec();
        objResponse.success = false;

        if (rst.length > 0) {
            objResponse.success = true;
            objResponse.message = 'user found';
            objResponse.data = rst[0];
        } else {
            objResponse.success = false;
            objResponse.message = 'user not found';
        }
        res.json(objResponse);
    } catch (e) {
        console.log('db error', e)
    }
}
const getAdditionalLoginDetails = async (req, res) => {
    let objResponse = {};
    objResponse.success = false;
    objResponse.message = 'user not found svc';
    let params = {
        companyRegistrationName: 1,
        additionalRepresentative: 1
    }
    if (!req.params.carisId)
        return res.json(objResponse);

    let KYC = mongoose.model('KYC', kycJuridicoSchema);

    try {
        let rst = await KYC.find({carisId: req.params.carisId}).select(params).exec();
        objResponse.success = false;

        if (rst.length > 0) {
            objResponse.success = true;
            objResponse.message = 'user found';
            objResponse.data = rst[0];
        } else {
            objResponse.success = false;
            objResponse.message = 'user not found';
        }
        res.json(objResponse);
    } catch (e) {
        console.log('db error', e)
    }
}
const getExpectedActivity = async (req, res) => {
    let objResponse = {};
    objResponse.success = false;
    objResponse.message = 'user not found svc';

    let params = {
        expectedProducts: 1,
        productDesc: 1,
        estimateCreditAmount: 1,
        estimateCreditCurrency: 1,
        estimateDebitAmount: 1,
        estimateDebitCurrency: 1,
        otherProductDesc: 1,
    }
    // console.log('req.body',req.body)
    if (!req.params.carisId)
        return res.json(objResponse);

    let KYC = mongoose.model('KYC', kycJuridicoSchema);

    try {
        let rst = await KYC.find({carisId: req.params.carisId}).select(params).exec();
        objResponse.success = false;

        if (rst.length > 0) {
            objResponse.success = true;
            objResponse.message = 'user found';
            objResponse.data = rst[0];
        } else {
            objResponse.success = false;
            objResponse.message = 'user not found';
        }
        res.json(objResponse);
    } catch (e) {
        console.log('db error', e)
    }
}
const getFiles = async (req, res) => {
    let objResponse = {};
    objResponse.success = false;
    objResponse.message = 'user not found svc';

    let params = {
        workDocPic: 1,
        idPicFront: 1,
        certificationPatrimonialPic: 1,
        identificationRepresentativePic: 1,
        idPicBack: 1,
        publicService: 1,
    }
    // console.log('req.body',req.body)
    if (!req.params.carisId)
        return res.json(objResponse);

    let KYC = mongoose.model('KYC', kycJuridicoSchema);

    try {
        let rst = await KYC.find({carisId: req.params.carisId}).select(params).exec();
        objResponse.success = false;

        if (rst.length > 0) {
            objResponse.success = true;
            objResponse.message = 'user found';
            objResponse.data = rst[0];
        } else {
            objResponse.success = false;
            objResponse.message = 'user not found';
        }
        console.log(objResponse.data)
        res.json(objResponse);
    } catch (e) {
        console.log('db error', e)
    }
}
const getSignature = async (req, res) => {
    let objResponse = {};
    objResponse.success = false;
    objResponse.message = 'user not found svc';

    let params = {
        signature: 1
    }
    // console.log('req.body',req.body)
    if (!req.params.carisId)
        return res.json(objResponse);

    let KYC = mongoose.model('KYC', kycJuridicoSchema);

    try {
        let rst = await KYC.find({carisId: req.params.carisId}).select(params).exec();
        objResponse.success = false;

        if (rst.length > 0) {
            objResponse.success = true;
            objResponse.message = 'user found';
            objResponse.data = rst[0];
        } else {
            objResponse.success = false;
            objResponse.message = 'user not found';
        }
        res.json(objResponse);
    } catch (e) {
        console.log('db error', e)
    }
}

const saveAndUpdateObj = async (carisId, data) => {
    let KYC = mongoose.model('KYC', kycJuridicoSchema);
    //Never update customer carisId
    // delete data.carisId;
    // console.log('carisId',carisId)
    try {
        const update = await KYC.findOneAndUpdate({carisId: carisId}, {$set: data}, {new: true});
        // console.log('upadate', update)
    } catch (err) {
        // res.json({success: false, err: err});
        console.log('saveAndUpdateObj err', err)
        return false;
    }
}

const deletePicture = async (req, res) => {
    let KYC = mongoose.model('KYC', kycJuridicoSchema);
    //Never update customer carisId
    // delete data.carisId;
    // console.log('carisId',carisId)
    const data = {};
    data[req.params.doc] = {}

    try {
        const update = await KYC.update({carisId: req.params.carisId}, {"$pull": {[`${req.params.doc}`]: {"filename": req.body.imageName}}}, {
            safe: true,
            multi: true
        });
        // const update = await KYC.findOneAndUpdate({carisId: req.params.carisId}, {$set: data}, {new: true});
        return res.json({success: true});
        // console.log('upadate', update)
    } catch (err) {
        // res.json({success: false, err: err});
        console.log('deletePicture err', err)
        return res.json({success: false, action: 'setCustomerInfo', message: err});
    }
}

const setCustomerInfo = async (req, res) => {
    const data = req.body
    const carisId = data.carisId;
    data.status = 'opened';
    const save = await saveAndUpdateObj(carisId, data).catch(err => {
        console.log('err')
        return res.json({success: false, action: 'setCustomerInfo', message: err});
    })

    await saveAndUpdateObj(carisId, {"metadata.latestStep": 'customerInfo', 'metadata.latestSeen': moment()})


    res.json({success: true});
}


const setPrimaryCustomerInfo = async (req, res) => {
    const data = req.body
    const carisId = data.carisId;
    data.status = 'opened';
    const save = await saveAndUpdateObj(carisId, data).catch(err => {
        console.log('err')
        return res.json({success: false, action: 'setPrimaryCustomerInfo', message: err});
    })

    await saveAndUpdateObj(carisId, {"metadata.latestStep": 'customerInfo', 'metadata.latestSeen': moment()})
    res.json({success: true});
}


const setLaboralInfo = async (req, res) => {
    const data = req.body
    const carisId = data.carisId;
    const save = await saveAndUpdateObj(carisId, data).catch(err => {

        return res.json({success: false, action: 'setLaboralInfo', message: err});
    })

    await saveAndUpdateObj(carisId, {"metadata.latestStep": 'laboralInfo', 'metadata.latestSeen': moment()})

    res.json({success: true});
}

const setPoliticalInfo = async (req, res) => {
    const data = req.body
    const carisId = data.carisId;
    const save = await saveAndUpdateObj(carisId, data).catch(err => {

        return res.json({success: false, action: 'setPoliticalInfo', message: err});
    })

    await saveAndUpdateObj(carisId, {"metadata.latestStep": 'politicalInfo', 'metadata.latestSeen': moment()});

    res.json({success: true});
}


const setfoundOrigin = async (req, res) => {
    console.log('here setfoundOrigin');

    const data = req.body

    // console.log(req)

    const carisId = data.carisId;
    // console.log('data',data)
    // const files = req.files;
    // let thirdPartyPictures = [];

    // if (files && files.length > 0) {
    //     files.map(file => {
    //         let fieldName = file.fieldname;
    //         if (fieldName.includes('thirdPartyPicture')) {
    //             let fileDetails = {
    //                 filename: file.filename,
    //                 path: file.path,
    //                 size: file.size,
    //                 timestamp: moment()
    //             };
    //             thirdPartyPictures.push(fileDetails)
    //         }
    //     });
    //     // data.thirdPartyPicture = {
    //     //     filename: files[0].filename,
    //     //     path: files[0].path,
    //     //     size: files[0].size,
    //     //     timestamp: moment()
    //     // }
    // }
    // data['thirdPartyPicture'] = thirdPartyPictures;

    let foundOrigin = [];
    if (data.foundOrigin) {
        foundOrigin = JSON.parse(data.foundOrigin);
        data.foundOrigin = foundOrigin;
    }

    let activities = [];
    if (data.activities) {
        activities = JSON.parse(data.activities);
        data.activities = activities;
    }

    const save = await saveAndUpdateObj(carisId, data).catch(err => {

        return res.json({success: false, action: 'setfoundOrigin', message: err});
    })

    await saveAndUpdateObj(carisId, {"metadata.latestStep": 'foundOrigins', 'metadata.latestSeen': moment()});

    res.json({success: true});
}

const setBankingReference = async (req, res) => {
    const data = req.body
    const carisId = data.carisId;
    // console.log('data',data)
    const save = await saveAndUpdateObj(carisId, data).catch(err => {

        return res.json({success: false, action: 'setBankingReference', message: err});
    })

    await saveAndUpdateObj(carisId, {"metadata.latestStep": 'bankingInfo', 'metadata.latestSeen': moment()});

    res.json({success: true});
}

const setExpectedActivity = async (req, res) => {
    const data = req.body
    const carisId = data.carisId;
    // data.metadata.latestStep  = 'expectedActivity';
    const save = await saveAndUpdateObj(carisId, data).catch(err => {

        return res.json({success: false, action: 'setExpectedActivity', message: err});
    })

    await saveAndUpdateObj(carisId, {"metadata.latestStep": 'bankingInfo', 'metadata.latestSeen': moment()})

    res.json({success: true});
}

const setFiles = async (req, res) => {
    const data = req.body
    const carisId = data.carisId;
    const files = req.files;

    console.log('files', files)
    let workDocPic = {};
    let idPicFront = {};
    let certificationPatrimonialPic = {};
    let identificationRepresentativePic = {};
    let idPicBack = {};
    let publicService = {};

    if (files && files.length > 0) {
        files.map(file => {
            // console.log('file---->', file)
            let fieldName = file.fieldname
            if (fieldName.includes('workDocPic')) {
                workDocPic = {
                    filename: file.filename,
                    path: file.path,
                    size: file.size,
                    mimetype: file.mimetype,
                    timestamp: moment()
                }
                // workDocPic.push(fileDetails)
            } else if (fieldName.includes('idPicFront')) {
                idPicFront = {
                    filename: file.filename,
                    path: file.path,
                    size: file.size,
                    mimetype: file.mimetype,
                    timestamp: moment()
                }
                // idPicFront.push(fileDetails)
            } else if (fieldName.includes('certificationPatrimonialPic')) {
                certificationPatrimonialPic = {
                    filename: file.filename,
                    path: file.path,
                    size: file.size,
                    mimetype: file.mimetype,
                    timestamp: moment()
                }
                // certificationPatrimonialPic.push(fileDetails)
            } else if (fieldName.includes('identificationRepresentativePic')) {
                identificationRepresentativePic = {
                    filename: file.filename,
                    path: file.path,
                    size: file.size,
                    mimetype: file.mimetype,
                    timestamp: moment()
                }
                // identificationRepresentativePic.push(fileDetails)
            } else if (fieldName.includes('idPicBack')) {
                idPicBack = {
                    filename: file.filename,
                    path: file.path,
                    size: file.size,
                    mimetype: file.mimetype,
                    timestamp: moment()
                }
                // idPicBack.push(fileDetails)
            } else if (fieldName.includes('publicService')) {
                publicService = {
                    filename: file.filename,
                    path: file.path,
                    size: file.size,
                    mimetype: file.mimetype,
                    timestamp: moment()
                }
                // publicService.push(fileDetails)
            }
        });

    }
    let dataArray = {}
    if (!(_.isEmpty(workDocPic))) {
        dataArray = {
            workDocPic: workDocPic
        };
    } else if (!_.isEmpty(idPicFront)) {
        dataArray = {
            idPicFront: idPicFront
        };
        // data['idPicFront'] = idPicFront;
    } else if (!_.isEmpty(certificationPatrimonialPic)) {
        dataArray = {
            certificationPatrimonialPic: certificationPatrimonialPic
        };
        // data['certificationPatrimonialPic'] = certificationPatrimonialPic;
    } else if (!_.isEmpty(identificationRepresentativePic)) {
        dataArray = {
            identificationRepresentativePic: identificationRepresentativePic
        };
        // data['identificationRepresentativePic'] = identificationRepresentativePic;
    } else if (!_.isEmpty(idPicBack)) {
        dataArray = {
            idPicBack: idPicBack
        };
        // data['idPicBack'] = idPicBack;
    } else if (!_.isEmpty(publicService)) {
        dataArray = {
            publicService: publicService
        };
        // data['publicService'] = publicService;
    }
    // console.log('data', data)

    let KYC = mongoose.model('KYC', kycJuridicoSchema);
    try {
        const update = await KYC.findOneAndUpdate({carisId: carisId}, {$push: dataArray}, {new: true});
    } catch (err) {
        console.log('saveAndUpdateObj err', err)
        return res.json({success: false, action: 'setFiles', message: err});
    }
    await saveAndUpdateObj(carisId, {"metadata.latestStep": 'files', 'metadata.latestSeen': moment()})

    res.json({success: true});
}

const setFoundOriginsFiles = async (req, res) => {
    const data = req.body
    const carisId = data.carisId;
    const files = req.files;

    console.log('files', files)
    let thirdPartyPicture = {};
    if (files && files.length > 0) {
        files.map(file => {
            // console.log('file---->', file)
            let fieldName = file.fieldname
            if (fieldName.includes('thirdPartyPicture')) {
                thirdPartyPicture = {
                    filename: file.filename,
                    path: file.path,
                    size: file.size,
                    mimetype: file.mimetype,
                    timestamp: moment()
                }
            }
        });
    }
    let dataArray = {}
    if (!(_.isEmpty(thirdPartyPicture))) {
        dataArray = {
            thirdPartyPicture: thirdPartyPicture
        };
    }
    let KYC = mongoose.model('KYC', kycJuridicoSchema);
    try {
        const update = await KYC.findOneAndUpdate({carisId: carisId}, {$push: dataArray}, {new: true});
    } catch (err) {
        console.log('saveAndUpdateObj err', err)
        return res.json({success: false, action: 'setFoundOrigins', message: err});
    }
    await saveAndUpdateObj(carisId, {"metadata.latestStep": 'files', 'metadata.latestSeen': moment()})

    return res.json({success: true});
}

const setSignature = async (req, res) => {
    const data = req.body
    const carisId = data.carisId;
    const externalId = uuidv4();
    const filename = `signature-${carisId}-${externalId}`;
    const signatureImg = `public/tmp/kyc/${filename}`;
    const img = ba64.writeImageSync(signatureImg, data.signature);
    data.signature = {
        filename: filename,
        path: signatureImg,
        size: 0,
        timestamp: moment()
    }

    data.status = 'signed';
    // data.metadata.signatureDate = moment();
    const save = await saveAndUpdateObj(carisId, data).catch(err => {
        return res.json({success: false, action: 'setSignature', message: err});
    })

    await saveAndUpdateObj(carisId, {
        "metadata.latestStep": 'signature',
        'metadata.latestSeen': moment(),
        'metadata.signatureDate': moment()
    })

    res.json({success: true});
}


const migrateFromFile = async (req, res) => {


    customersData.customers.map(async (customer) => {
        let carisId = uuidv4();
        // console.log('carisId', carisId);
        // console.log('customer', customer);
        let genero = (customer['Género'] == 'F') ? 'Mujer' : 'Hombre';
        // let currency = (customer['Género']=='F') ? 'Mujer' : 'Hombre';
        let currency = 'colones';
        switch (customer['Moneda Ingreso']) {
            case 'USD':
                currency = 'dolares';
            case 'EUR':
                currency = 'euros';
        }
        let isPep = (customer['Desc. PEP'] == 'No Aplica') ? false : true;
        let isTin = (customer['TIN'] == 'N/A') ? false : true;
        let isThirdParty = (customer['Maneja Fondos Ter.'] == 'No') ? false : true;

        let user = {
            name: customer.Nombre,
            lastname: customer['Primer Apellido'],
            secondLastname: customer['Segundo Apellido'],
            dob: customer['Fecha Nacimiento'],
            idType: customer['Desc ID.'],
            idNumber: customer['Número Identificación'],
            idExpirationDate: customer['Fecha Vencimiento'],
            countryOB: customer['Pais Nacimiento'],
            nationality: customer['Nacionalidad'],
            sex: genero,
            homePhone: customer['Telefono Residencia'],
            cellPhone: customer['Celular'],
            fax: customer['Fax'],
            email: customer['Email'],
            secundaryEmail: "",
            profession: customer['Desc. Profesión'],
            maritalStatus: customer['Estado Civil'],
            countryResidence: customer['País'],
            province: customer['Provincia'],
            canton: customer['Cantón'],
            distrit: customer['Distrito'],
            poBox: customer['Apartado Postal'],
            address: customer['Dirección'],
            //laboral info
            businessName: customer['Ocupación'],
            businessOccupation: "",
            businessNature: customer['Naturaleza del Negocio'],
            businessPhone: "",
            businessRevenue: customer['Ingreso Deventado'],
            businessCurrency: currency,
            businessAddress: customer['Ocupación'],
            //political info
            pep: isPep,
            usTaxPayer: "",
            fatcaTin: isTin,
            crsTin: "",
            crsAddress: "",
            fepClient: "",
            //origin of the founds
            foundOrigin: [customer['Origen Fondo']],
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
            thirtPartyFounds: isThirdParty,
            thirdPartyPicture: "",
            activities: [],
            activitiesValidation: "",
            //Banking references
            bankingReference: [],
            mainClients: [],
            products: [],
            creditCardLimit: "",
            creditCardCurrency: "",
            accountCurrency: "",
            savingAccountCurrency: "",
            highAccountCurrency: "",
            //Expected Activity
            expectedProducts: [],
            productDesc: "",
            estimateCreditAmount: "",
            estimateCreditCurrency: "",
            estimateDebitAmount: "",
            estimateDebitCurrency: "",
            otherProductDesc: "",
            //Files
            workDocPic: "",
            idPicFront: "",
            certificationPatrimonialPic: "",
            identificationRepresentativePic: "",
            idPicBack: "",
            publicService: "",
            signature: {},
            //Metadata
            metadata: {
                interactions: [] //login
            },
            revisions: [],
            carisId: carisId,
            status: 'pending'
        }
        let KYC = mongoose.model('KYC', kycJuridicoSchema);
        const kyc = new KYC(user);

        try {
            let new_kyc = await kyc.save();
            return new_kyc;
        } catch (e) {
            console.log('error creating new_kyc log', e)
        }
        // console.log(user)
    })

    // const save = await saveAndUpdateObj(carisId, data).catch(err=>{
    //     return res.json({success: false, action: 'setFiles' ,message:err});
    // })


    res.json({success: true});
}


const getCountStatus = async (req, res) => {
    let KYC = mongoose.model('KYC', kycJuridicoSchema);
    //Never update customer carisId
    // delete data.carisId;

    try {
        const pending = await KYC.count({"status": "pending"});
        const all = await KYC.count();
        const inProgress = await KYC.count({"status": "inProgress"});
        const inReview = await KYC.count({"status": "waitingreview"});
        const approved = await KYC.count({"status": "approved"});
        const done = await KYC.count({"status": "done"});
        const opened = await KYC.count({"status": "opened"});
        const signed = await KYC.count({"status": "signed"}); //waiting for aproval
        const rejected = await KYC.count({"status": "reject"}); //waiting for aproval

        const data = {
            all: all,
            pending: pending,
            inProgress: inProgress,
            inReview: inReview,
            approved: approved,
            done: done,
            opened: opened,
            signed: signed,
            rejected: rejected
        }

        res.json({success: true, data: data});


    } catch (err) {
        res.json({success: false, err: err});
    }
}

const displayFilters = () => {
    return {
        additionalRepresentative: 1,
        name: 1,
        lastname: 1,
        secondLastname: 1,
        nationality: 1,
        idNumber: 1,
        cellPhone: 1,
        email: 1,
        status: 1,
        carisId: 1,
        _id: 0,
        metadata: 1,
        createdAt: 1,
        updatedAt: 1
    }
}

const setPDFfilters = {
    name: 1,
    lastname: 1,
    secondLastname: 1,
    dob: 1,
    idType: 1,
    idNumber: 1,
    idExpirationDate: 1,
    countryOB: 1,
    nationality: 1,
    sex: 1,
    homePhone: 1,
    cellPhone: 1,
    fax: 1,
    email: 1,
    secundaryEmail: 1,
    profession: 1,
    maritalStatus: 1,
    countryResidence: 1,
    province: 1,
    canton: 1,
    distrit: 1,
    poBox: 1,
    address: 1,
    //laboral info
    businessName: 1,
    businessOccupation: 1,
    businessNature: 1,
    businessPhone: 1,
    businessRevenue: 1,
    businessCurrency: 1,
    businessAddress: 1,
    //political info
    pep: 1,
    usTaxPayer: 1,
    fatcaTin: 1,
    crsTin: 1,
    crsAddress: 1,
    fepClient: 1,
    //origin of the founds
    foundOrigin: 1,
    heritageName: 1,
    heritageRelationship: 1,
    heritageAmount: 1,
    pensionAmount: 1,
    pensionDate: 1,
    movingFoundsName: 1,
    movingFoundsCurrency: 1,
    movingFoundsAmount: 1,
    movingFoundsDetail: 1,
    otherDetail: 1,
    thirtPartyFounds: 1,
    thirdPartyPicture: 1,
    activities: 1,
    activitiesValidation: 1,
    //Banking references
    bankingReference: 1,
    mainClients: 1,
    products: 1,
    creditCardLimit: 1,
    creditCardCurrency: 1,
    accountCurrency: 1,
    savingAccountCurrency: 1,
    highAccountCurrency: 1,
    //Expected Activity
    expectedProducts: 1,
    productDesc: 1,
    estimateCreditAmount: 1,
    estimateCreditCurrency: 1,
    estimateDebitAmount: 1,
    estimateDebitCurrency: 1,
    otherProductDesc: 1,
    //Files
    workDocPic: 1,
    idPicFront: 1,
    certificationPatrimonialPic: 1,
    identificationRepresentativePic: 1,
    idPicBack: 1,
    publicService: 1,
    signature: 1,
    //Aditional Signers
    aditionalSigners: 1,
    //Metadata

    createdAt: 1,
    updatedAt: 1,
    _id: 0,
}

const setAttachedFiltesr = {
    workDocPic: 1,
    idPicFront: 1,
    certificationPatrimonialPic: 1,
    identificationRepresentativePic: 1,
    idPicBack: 1,
    publicService: 1,
    signature: 1,
    thirdPartyPicture: 1,
    _id: 0
}

const convertToArray = async (list) => {
    let array = [];
    let listArray = JSON.parse(JSON.stringify(list));
    for (let i = 0; i < listArray.length; i++) {
        let rep = listArray[i].additionalRepresentative;
        if (rep.length > 0) {
            for (let j = 0; j < rep.length; j++) {
                let data = rep[j];
                data['metadata'] = listArray[i].metadata;
                data['createdAt'] = listArray[i].createdAt;
                data['updatedAt'] = listArray[i].updatedAt;
                array.push(data)
            }
        }
    }
    return array;
};
const getAllKYC = async (req, res) => {
    let KYC = mongoose.model('KYC', kycJuridicoSchema);
    try {
        const list = await KYC.find().select(displayFilters()).exec();
        let result = await convertToArray(list);
        res.json({success: true, data: result});
    } catch (err) {
        res.json({success: false, err: err});
    }
}

const getAllPDF = async (req, res) => {
    let KYC = mongoose.model('KYC', kycJuridicoSchema);
    try {
        const list = await KYC.find({carisId: req.params.carisId}).select(setPDFfilters).exec();
        res.json({success: true, data: list});
    } catch (err) {
        res.json({success: false, err: err});
    }
}

const getAllAttached = async (req, res) => {
    let KYC = mongoose.model('KYC', kycJuridicoSchema);
    try {
        const list = await KYC.find({carisId: req.params.carisId}).select(setAttachedFiltesr).exec();
        res.json({success: true, data: list});
    } catch (err) {
        res.json({success: false, err: err});
    }
}

const getAllByStatus = async (status) => {
    let KYC = mongoose.model('KYC', kycJuridicoSchema);
    try {
        const list = await KYC.find({"status": status}).select(displayFilters()).exec();
        return list;
    } catch (err) {
        res.json({success: false, err: err});
    }
}

const getAllByPending = async (req, res) => {

    try {
        const list = await getAllByStatus('pending');
        let result = await convertToArray(list);
        res.json({success: true, data: result});
        // res.json({success: true, data: list});
    } catch (err) {
        res.json({success: false, err: err});
    }
}

const getAllByRejected = async (req, res) => {

    try {
        const list = await getAllByStatus('reject');
        let result = await convertToArray(list);
        res.json({success: true, data: result});
        // res.json({success: true, data: list});
    } catch (err) {
        res.json({success: false, err: err});
    }
}

const getAllByInProgress = async (req, res) => {

    try {
        const list = await getAllByStatus('inProgress');
        let result = await convertToArray(list);
        res.json({success: true, data: result});
        // res.json({success: true, data: list});
    } catch (err) {
        res.json({success: false, err: err});
    }
}

const getAllByInReview = async (req, res) => {

    try {
        const list = await getAllByStatus('inReview');
        let result = await convertToArray(list);
        res.json({success: true, data: result});
        // res.json({success: true, data: list});
    } catch (err) {
        res.json({success: false, err: err});
    }
}

const getAllByApproved = async (req, res) => {

    try {
        const list = await getAllByStatus('approved');
        let result = await convertToArray(list);
        res.json({success: true, data: result});
        // res.json({success: true, data: list});
    } catch (err) {
        res.json({success: false, err: err});
    }
}

const getAllByDone = async (req, res) => {

    try {
        const list = await getAllByStatus('done');
        let result = await convertToArray(list);
        res.json({success: true, data: result});
        // res.json({success: true, data: list});
    } catch (err) {
        res.json({success: false, err: err});
    }
}

const getAllByOpened = async (req, res) => {

    try {
        const list = await getAllByStatus('opened');
        let result = await convertToArray(list);
        res.json({success: true, data: result});
        // res.json({success: true, data: list});
    } catch (err) {
        res.json({success: false, err: err});
    }
}

const getAllBySigned = async (req, res) => {

    try {
        const list = await getAllByStatus('signed');
        let result = await convertToArray(list);
        res.json({success: true, data: result});
        // res.json({success: true, data: list});
    } catch (err) {
        res.json({success: false, err: err});
    }
}

// const setStatus = async (req, res) =>{
//     const data = req.body
//     const carisId = data.carisId;
//     // data.metadata.latestStep  = 'expectedActivity';
//     const save = await saveAndUpdateObj(carisId, data).catch(err=>{

//         return res.json({success: false, action: 'setStatus' ,message:err});
//     })

//     // await saveAndUpdateObj(carisId, {"metadata.latestStep": 'bankingInfo' , 'metadata.latestSeen':moment()})

//     res.json({success: true});
// }

const setOwner = async (req, res) => {
    const data = req.body
    const carisId = data.carisId;
    // data.metadata.latestStep  = 'expectedActivity';
    const save = await saveAndUpdateObj(carisId, data).catch(err => {

        return res.json({success: false, action: 'setStatus', message: err});
    })

    // await saveAndUpdateObj(carisId, {"metadata.latestStep": 'bankingInfo' , 'metadata.latestSeen':moment()})

    res.json({success: true});
}


const getFiltersByDate = (params) => {
    let filter = {};
    if (params && params.hasDate) {
        // let pf = params.from;
        // let rpf =  pf.replace("-", "/")
        let from = moment(params.dates.from, "DD-MM-YYYY").toDate();
        let to = moment(params.dates.to, "DD-MM-YYYY").endOf('day').toDate();
        filter = {
            createdAt: {
                $gte: from,
                $lte: to
            }
        }
    }

    return filter;
}


const getKYCStatusList = async function (req, res) {

    const fields = getRegularFields();
    const params = {};
    params.hasData = req.params.hasDate;
    params.dateFrom = req.params.dateFrom;
    params.dateTo = req.params.dateTo;

    const filter = getFiltersByDate(params);
    const status = req.params.status;

    filter.status = status;

    let KYC = mongoose.model('KYC', kycJuridicoSchema);
    try {
        const list = await KYC.find(getFiltersByDate()).select(displayFilters()).exec();
        res.json({success: true, data: list});
    } catch (err) {
        res.json({success: false, err: err});
    }
}

const getKYCStatusListCount = async function (req, res) {

    const filter = {};
    const status = req.params.status;

    filter.status = status;
    // console.log('here')
    let KYC = mongoose.model('KYC', kycJuridicoSchema);

    try {
        const list = await KYC.countDocuments(filter);
        res.json({success: true, data: list});
    } catch (err) {
        console.log('getKYCStatusListCount err', err)
        res.json({success: false, err: err});
    }
}

const setStatus = async (req, res) => {
    const data = req.body
    const carisId = data.carisId;
    // data.metadata.latestStep  = 'expectedActivity';
    data.updatedAt = moment()
    const save = await saveAndUpdateObj(carisId, data).catch(err => {

        return res.json({success: false, action: 'setStatus', message: err});
    })

    // await saveAndUpdateObj(carisId, {"metadata.latestStep": 'bankingInfo' , 'metadata.latestSeen':moment()})

    res.json({success: true});
}

const setRevision = async (req, res) => {
    const data = req.body
    const carisId = data.carisId;

    data.status = 'waitingClient';

    let KYC = mongoose.model('KYC', kycJuridicoSchema);
    //Never update customer carisId
    // delete data.carisId;
    console.log('setRevision data', data)
    try {
        const update = await KYC.findOneAndUpdate({carisId: carisId}, {
            $push: {revisions: JSON.parse(data.message)},
            $set: {
                status: 'inProgress',
                updatedAt: moment()
            },
        }, {new: true});
        console.log('upadate', update)
    } catch (err) {
        // res.json({success: false, err: err});
        console.log('saveAndUpdateObj err', err)
        return false;
    }
    // await saveAndUpdateObj(carisId, {"metadata.latestStep": 'bankingInfo' , 'metadata.latestSeen':moment()})

    res.json({success: true});
}

const setRejects = async (req, res) => {
    const data = req.body
    const carisId = data.carisId;

    // data.status = 'waitingClient';

    let KYC = mongoose.model('KYC', kycJuridicoSchema);
    //Never update customer carisId
    // delete data.carisId;
    console.log('setRejects data', data)
    try {
        const update = await KYC.findOneAndUpdate({carisId: carisId}, {
            $push: {rejects: JSON.parse(data.message)},
            $set: {
                status: 'reject',
                owner: data.agent,
                updatedAt: moment()
            },
        }, {new: true});
    } catch (err) {
        // res.json({success: false, err: err});
        console.log('saveAndUpdateObj err', err)
        return false;
    }
    // await saveAndUpdateObj(carisId, {"metadata.latestStep": 'bankingInfo' , 'metadata.latestSeen':moment()})

    res.json({success: true});
}

const getAllByOwner = async (req, res) => {
    const owner = req.params.owner;
    let KYC = mongoose.model('KYC', kycJuridicoSchema);
    try {
        const list = await KYC.find({"owner": owner}).select(displayFilters()).exec();
        // return list;
        res.json({success: true, list: list});
    } catch (err) {
        console.log('err', err)
        res.json({success: false, err: err});
    }
}
const setAdditionalSigners = async (req, res) => {
    const data = req.body
    const carisId = data.carisId;
    // console.log('data',data)
    const save = await saveAndUpdateObj(carisId, data).catch(err => {

        return res.json({success: false, action: 'setAdditionalSigners', message: err});
    })
    await saveAndUpdateObj(carisId, {"metadata.latestStep": 'additionalSigners', 'metadata.latestSeen': moment()});
    res.json({success: true});
}

const getAdditionalSigners = async (req, res) => {
    let objResponse = {};
    objResponse.success = false;
    objResponse.message = 'user not found svc';

    let params = {
        additionalSigners: 1
    }

    if (!req.params.carisId)
        return res.json(objResponse);

    let KYC = mongoose.model('KYC', kycJuridicoSchema);

    try {
        let rst = await KYC.find({carisId: req.params.carisId}).select(params).exec();
        objResponse.success = false;

        if (rst.length > 0) {
            objResponse.success = true;
            objResponse.message = 'user found';
            objResponse.data = rst[0];
        } else {
            objResponse.success = false;
            objResponse.message = 'user not found';
        }
        res.json(objResponse);
    } catch (e) {
        console.log('db error', e)
    }
}

const getPartners = async (req,res) => {
    let objResponse = {};
    objResponse.success = false;
    objResponse.message = 'Partner not found svc';

    let params = {
        partners: 1,
        _id: -1,
        status: 1
    };
    // console.log('req.body',req.body)
    if (!req.params.carisId)
        return res.json(objResponse);

    let KYC = mongoose.model('KYC', kycJuridicoSchema);

    try {
        let rst = await KYC.find({carisId: req.params.carisId}).select(params).exec();
        objResponse.success = false;

        if (rst.length > 0) {
            objResponse.success = true;
            objResponse.message = 'user found';
            objResponse.data = rst[0];
        } else {
            objResponse.success = false;
            objResponse.message = 'user not found';
        }

        console.log('objResponse', objResponse)
        res.json(objResponse);
    } catch (e) {
        console.log('db error', e)
    }
};

const setPartners = async (req, res) => {
    const data = req.body
    const carisId = data.carisId;
    data.status = 'opened';
    const save = await saveAndUpdateObj(carisId, data).catch(err => {
        console.log('err')
        return res.json({success: false, action: 'setPartners', message: err});
    })
    await saveAndUpdateObj(carisId, {"metadata.latestStep": 'partners', 'metadata.latestSeen': moment()})
    res.json({success: true});
};

const processExcelDataToMongo = async (req, res) => {

    customersData.customers.map(async (customer) => {
        let carisId = uuidv4();

        let user = {
            additionalRepresentative: [],

            //political info
            pep : '',
            usTaxPayer : '',
            fatcaTin : '',
            crsTin : '',
            crsAddress : "",
            fepClient: "" ,
            gin: "",
            fepName: "",
            fepTIN: "",
            fepAddress: "",
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
            thirdPartyPicture: [],
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
            additionalSigners: [],
            productDesc : "",
            estimateCreditAmount : "",
            estimateCreditCurrency : "",
            estimateDebitAmount : "",
            estimateDebitCurrency : "",
            otherProductDesc: "",
            //Files
            workDocPic :[],
            idPicFront :[],
            certificationPatrimonialPic: [],
            identificationRepresentativePic: [],
            idPicBack :[],
            publicService :[]  ,
            signature: {},
            //Aditional Signers
            aditionalSigners: {},
            revisions: [],
            rejects: [],
            transactionID: "",


            legalId: customer['legalId'],
            companyRegistrationName: customer['companyRegistrationName'],
            tradeName: "",
            constitutionDate: customer['constitutionDate'],
            typeOfLegalEntity: "",
            typeOfEconomicActivity: customer['typeOfEconomicActivity'],
            economicActivityDetail: "",

            companyFound: true,
            companyCountryResidence: customer['companyCountryResidence'],
            companyProvince: customer['companyProvince'],
            companyCanton: "",
            companyDistrit: customer['companyDistrit'],
            companyPoBox: "",
            companyAddress: "",

            partners: [],
            carisId: carisId,
            status: 'pending',

            excelPartnerId: customer['partner']
        }
        let KYC = mongoose.model('KYC', kycJuridicoSchema);
        const kyc = new KYC(user);

        try {
            return await kyc.save();
        } catch (e) {
            console.log('error creating new_kyc log', e)
        }
    })

    res.json({success: true});

};
const processRepresentativesFromExcel = async (req, res) => {
    representativeData.representatives.map(async (customer) => {
        let excelPartnerId = customer['PARTNER'];
        let params = {
            additionalRepresentative: 1
        };
        let representative = {
            name : "",
            lastname : customer['NOM_CONTACTO'],
            secondLastname : "",
            dob : "",
            idType : "",
            idNumber : customer['ID_CONTACTO'],
            idExpirationDate : customer['FEC_VENC_ID'],
            countryOB : "",
            nationality : "CR",
            sex : "",
            homePhone : customer['TEL_CONTACTO1'],
            cellPhone : customer['TEL_CONTACTO2'],
            fax : "",
            email : customer['MAIL_CONTACTO'],
            secundaryEmail : "",
            profession : "",
            occupation : "",
            maritalStatus : "",
            countryResidence : "",
            province : "",
            canton : "",
            distrit : "",
            poBox : "",
            address : "",
        };
        let additionalRepresentative = [];
        let KYC = mongoose.model('KYC', kycJuridicoSchema);

        let rst = await KYC.find({excelPartnerId: excelPartnerId}).select(params).lean().exec();
        additionalRepresentative = rst[0].additionalRepresentative;

        let rep = additionalRepresentative.find(el => el.name === customer['NOM_CONTACTO'])
        _.remove(additionalRepresentative, function (e) {
            return e.name === customer['NOM_CONTACTO'];
        });
        if (rep) {

            Object.assign(rep, {
                name : "",
                lastname : customer['NOM_CONTACTO'],
                secondLastname : "",
                dob : "",
                idType : "",
                idNumber : customer['ID_CONTACTO'],
                idExpirationDate : customer['FEC_VENC_ID'],
                countryOB : "",
                nationality : "CR",
                sex : "",
                homePhone : customer['TEL_CONTACTO1'],
                cellPhone : customer['TEL_CONTACTO2'],
                fax : "",
                email : customer['MAIL_CONTACTO'],
                secundaryEmail : "",
                profession : "",
                occupation : "",
                maritalStatus : "",
                countryResidence : "",
                province : "",
                canton : "",
                distrit : "",
                poBox : "",
                address : "",
            });
            additionalRepresentative.push(rep);
            // additionalRepresentative.push(representative)
        }
        let data = {
            additionalRepresentative: additionalRepresentative
        };

        try {
            await KYC.findOneAndUpdate({excelPartnerId: excelPartnerId}, {$set: data}, {new: true});
        } catch (e) {
            console.log('error creating new_kyc log', e)
        }

    });
};

module.exports = {
    getLogin: getLogin,
    getCustomerInfo: getCustomerInfo,
    setCustomerInfo: setCustomerInfo,
    getPrimaryCustomerInfo: getPrimaryCustomerInfo,
    setPrimaryCustomerInfo: setPrimaryCustomerInfo,
    getPartners: getPartners,
    setPartners: setPartners,
    getLaboralInfo: getLaboralInfo,
    getPoliticalInfo: getPoliticalInfo,
    getfoundOrigin: getfoundOrigin,
    getBankingReference: getBankingReference,
    getExpectedActivity: getExpectedActivity,
    getFiles: getFiles,
    getSignature: getSignature,
    setSignature: setSignature,
    setFiles: setFiles,
    setExpectedActivity: setExpectedActivity,
    setBankingReference: setBankingReference,
    setfoundOrigin: setfoundOrigin,
    setPoliticalInfo: setPoliticalInfo,
    setLaboralInfo: setLaboralInfo,
    migrateFromFile: migrateFromFile,
    getCountStatus: getCountStatus,
    getAllKYC: getAllKYC,
    getAllByPending: getAllByPending,
    getAllByInProgress: getAllByInProgress,
    getAllByInReview: getAllByInReview,
    getAllByApproved: getAllByApproved,
    getAllByDone: getAllByDone,
    getAllByOpened: getAllByOpened,
    setStatus: setStatus,
    deletePicture: deletePicture,
    getKYCStatusList: getKYCStatusList,
    getKYCStatusListCount: getKYCStatusListCount,
    getAllBySigned: getAllBySigned,
    getKYCSettings: getKYCSettings,
    setOwner: setOwner,
    setRevision: setRevision,
    setRejects: setRejects,
    getAllByRejected: getAllByRejected,
    getAllByOwner: getAllByOwner,
    getAllPDF: getAllPDF,
    getAllAttached: getAllAttached,
    getAdditionalSigners: getAdditionalSigners,
    setAdditionalSigners: setAdditionalSigners,
    setFoundOriginsFiles: setFoundOriginsFiles,
    getAdditionalLoginDetails: getAdditionalLoginDetails,
    processExcelDataToMongo: processExcelDataToMongo,
    processRepresentativesFromExcel: processRepresentativesFromExcel
}

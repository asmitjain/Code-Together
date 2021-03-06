"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Database = /** @class */ (function () {
    function Database(collectionName) {
        var _this = this;
        this.MongoClient = require('mongodb').MongoClient;
        this.dbName = 'omega';
        this.collectionName = collectionName;
        var secrets;
        var uri;
        if (!process.env.URI) {
            secrets = require('../secrets.json');
            uri = secrets.uri;
        }
        else {
            uri = process.env.URI;
        }
        this.client = new this.MongoClient(uri, { useUnifiedTopology: true }, { useNewUrlParser: true });
        // Open up a connection to the client.
        // The connection is asynchronous, but we can't call await directly
        // in the constructor, which cannot be async. So, we use "IIFE". Explanation below.
        /* from https://anthonychu.ca/post/async-await-typescript-nodejs/
    
          Async/Await and the Async IIFE
    
          The await keyword can only be used inside of a function
          marked with the async keyword. [...] One way to do this is
          with an "async IIFE" (immediately invoked function
          expression)...
    
           (async () => {
           // code goes here
           })();
    
        */
        (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.connect()["catch"](function (err) {
                            console.log(err);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    //PUT Functions
    Database.prototype.putProject = function (projectName, projectDescription, projectWorkers, projectProgress, projectLinks, projectNumWorkers, projectButtons) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        return [4 /*yield*/, collection.updateOne({ projectName: projectName }, {
                                $set: {
                                    projectDescription: projectDescription,
                                    projectWorkers: projectWorkers,
                                    projectProgress: projectProgress,
                                    projectLinks: projectLinks,
                                    projectNumWorkers: projectNumWorkers,
                                    projectButtons: projectButtons
                                }
                            }, { upsert: true })];
                    case 1:
                        result = _a.sent();
                        console.log('result = ' + result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.putProfile = function (profileID, firstName, lastName, about, bio, email, links, password, project, skills) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        return [4 /*yield*/, collection.updateOne({ profileID: profileID }, {
                                $set: {
                                    profileEmail: email,
                                    profilePassword: password,
                                    firstName: firstName,
                                    lastName: lastName,
                                    profileBio: bio,
                                    profileAbout: about,
                                    profileProjects: project,
                                    profileLinks: links,
                                    skills: skills
                                }
                            }, { upsert: true })];
                    case 1:
                        result = _a.sent();
                        console.log('result = ' + result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.updateProfile = function (firstName, lastName, bio, about, project, links, skills) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        return [4 /*yield*/, collection.updateOne({ lastName: lastName }, {
                                $set: {
                                    firstName: firstName,
                                    profileBio: bio,
                                    profileAbout: about,
                                    profileProjects: project,
                                    profileLinks: links,
                                    skills: skills
                                }
                            })];
                    case 1:
                        result = _a.sent();
                        console.log('result of updateProfile DB operation= ' + result);
                        return [2 /*return*/];
                }
            });
        });
    };
    //GET Functions
    Database.prototype.getProject = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        return [4 /*yield*/, collection.findOne({ projectName: key })];
                    case 1:
                        result = _a.sent();
                        //We want to return the whole JSON, not sure if that's what result.value is
                        if (result) {
                            return [2 /*return*/, result];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.getProfile = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        return [4 /*yield*/, collection.findOne({ lastName: key })];
                    case 1:
                        result = _a.sent();
                        //We want to return the whole JSON, not sure if that's what result.value is
                        if (result) {
                            return [2 /*return*/, result];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //DEL Functions
    Database.prototype.delProject = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        console.log("Deleting project with name: " + key);
                        return [4 /*yield*/, collection.deleteOne({ projectName: key })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.delProfile = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        console.log("Deleting profile with last name: " + key);
                        return [4 /*yield*/, collection.deleteOne({ lastName: key })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //OTHER Functions
    Database.prototype.find = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, projects, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        projects = [];
                        return [4 /*yield*/, collection.find({ profileID: null }).toArray().then(function (items) {
                                console.log("Successfully found " + items.length + " documents.");
                                // console.log(items);
                                projects.push(items);
                                return items;
                            })];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            console.log('result is not null');
                            return [2 /*return*/, projects[0]];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.projectSearch = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, projects, projectResult, profiles, profileResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        projects = [];
                        console.log('Searching for projects/profiles with name: ' + key);
                        return [4 /*yield*/, collection.find({ projectName: key }).toArray().then(function (projList) {
                                console.log("Successfully found " + projList.length + " projects.");
                                // console.log(items);
                                projects.push(projList);
                                return projList;
                            })];
                    case 1:
                        projectResult = _a.sent();
                        console.log('projectResult: ' + projectResult);
                        profiles = [];
                        return [4 /*yield*/, collection.find({ lastName: key }).toArray().then(function (profList) {
                                console.log("Successfully found " + profList.length + " profiles.");
                                // console.log(items);
                                profiles.push(profList);
                                return profList;
                            })];
                    case 2:
                        profileResult = _a.sent();
                        console.log('profileResult: ' + profileResult);
                        //Check if 0 projects found, must have been a profile. If 0 profiles found, then invalid search
                        if (projectResult.length !== 0) {
                            console.log('result is a project');
                            return [2 /*return*/, projects[0]];
                        }
                        else if (profileResult.length !== 0) {
                            console.log('result is a profile');
                            return [2 /*return*/, profiles[0]];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //isFound function
    Database.prototype.isFoundProj = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('isFound: key = ' + key);
                        return [4 /*yield*/, this.getProject(key)];
                    case 1:
                        v = _a.sent();
                        console.log('is found result = ' + v);
                        if (v === null) {
                            return [2 /*return*/, false];
                        }
                        else {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.isFoundProf = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('isFound: key = ' + key);
                        return [4 /*yield*/, this.getProfile(key)];
                    case 1:
                        v = _a.sent();
                        console.log('is found result = ' + v);
                        if (v === null) {
                            return [2 /*return*/, false];
                        }
                        else {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Database;
}());
exports.Database = Database;

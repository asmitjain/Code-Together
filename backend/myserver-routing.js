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
var http = require('http');
var url = require('url');
var express = require('express');
var MyServer = /** @class */ (function () {
    function MyServer(db) {
        var _this = this;
        // Server stuff: use express instead of http.createServer
        this.server = express();
        this.port = process.env.PORT || 8080;
        this.router = express.Router();
        this.theDatabase = db;
        // from https://enable-cors.org/server_expressjs.html
        this.router.use(function (request, response, next) {
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        // Serve static pages from a particular path.
        this.server.use(express.static('html'));
        // this.server.use('/', express.static('../html'));
        // this.server.use('/html', express.static(__dirname + '/html'));
        this.server.use('/counter', this.router);
        this.router.get('/users/:userId/create', this.createHandler.bind(this));
        this.router.get('/users/:userId/read', [this.errorHandler.bind(this), this.readHandler.bind(this)]);
        this.router.get('/users/:userId/update', [this.errorHandler.bind(this), this.updateHandler.bind(this)]);
        this.router.get('/users/:userId/delete', [this.errorHandler.bind(this), this.deleteHandler.bind(this)]);
        this.router.get('*', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                response.send(JSON.stringify({ result: 'command-not-found' }));
                return [2 /*return*/];
            });
        }); });
    }
    MyServer.prototype.errorHandler = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.theDatabase.isFound(request.params['userId'] + '-' + request.query.name)];
                    case 1:
                        value = _a.sent();
                        if (!value) {
                            response.write(JSON.stringify({ result: 'error' }));
                            response.end();
                        }
                        else {
                            next();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.createHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createCounter(request.params['userId'] + '-' + request.query.name, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.readHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readCounter(request.params['userId'] + '-' + request.query.name, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.updateHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateCounter(request.params['userId'] + '-' + request.query.name, request.query.value, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.deleteHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deleteCounter(request.params['userId'] + '-' + request.query.name, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.listen = function (port) {
        this.server.listen(port);
    };
    MyServer.prototype.createCounter = function (name, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("creating counter named '" + name + "'");
                        return [4 /*yield*/, this.theDatabase.put(name, 0)];
                    case 1:
                        _a.sent();
                        response.write(JSON.stringify({
                            result: 'created',
                            name: name,
                            value: 0
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.errorCounter = function (name, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                response.write(JSON.stringify({ result: 'error' }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    MyServer.prototype.readCounter = function (name, response) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.theDatabase.get(name)];
                    case 1:
                        value = _a.sent();
                        response.write(JSON.stringify({
                            result: 'read',
                            name: name,
                            value: value
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.updateCounter = function (name, value, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.theDatabase.put(name, value)];
                    case 1:
                        _a.sent();
                        response.write(JSON.stringify({
                            result: 'updated',
                            name: name,
                            value: value
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.deleteCounter = function (name, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.theDatabase.del(name)];
                    case 1:
                        _a.sent();
                        response.write(JSON.stringify({
                            result: 'deleted',
                            value: name
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MyServer;
}());
exports.MyServer = MyServer;

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
var ClientRepository_1 = require("App/Repositories/ClientRepository");
var PersonalTransformer_1 = require("App/Transformers/PersonalTransformer");
var ProfileSetupValidator_1 = require("App/Validators/ProfileSetupValidator");
var ProfileStatusRepository_1 = require("App/Repositories/ProfileStatusRepository");
var PersonalInformationsController = /** @class */ (function () {
    function PersonalInformationsController() {
    }
    PersonalInformationsController.prototype.show = function (_a) {
        var auth = _a.auth, response = _a.response, transform = _a.transform;
        return __awaiter(this, void 0, void 0, function () {
            var user, client, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        user = auth.user;
                        return [4 /*yield*/, ClientRepository_1["default"].query().where('id', user.profile_id).first()];
                    case 1:
                        client = _d.sent();
                        _c = (_b = response).resource;
                        return [4 /*yield*/, transform.item(client, PersonalTransformer_1["default"])];
                    case 2: return [2 /*return*/, _c.apply(_b, [_d.sent()])];
                }
            });
        });
    };
    PersonalInformationsController.prototype.set = function (_a) {
        var auth = _a.auth, request = _a.request, response = _a.response;
        return __awaiter(this, void 0, void 0, function () {
            var data, user, client, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, request.validate(ProfileSetupValidator_1["default"])];
                    case 1:
                        _b.sent();
                        data = request.only(['first_name', 'last_name', 'photo', 'country', 'description']);
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        user = auth.user;
                        return [4 /*yield*/, ClientRepository_1["default"].findBy('id', user === null || user === void 0 ? void 0 : user.profile_id)];
                    case 3:
                        client = _b.sent();
                        client.first_name = data.first_name,
                            client.last_name = data.last_name,
                            client.photo = data.photo,
                            client.country = data.country,
                            client.description = data.description;
                        client.profile_status = 'inProgress-professional';
                        return [4 /*yield*/, (client === null || client === void 0 ? void 0 : client.save())];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, response.ok("Personal information successfully saved")];
                    case 5:
                        e_1 = _b.sent();
                        return [2 /*return*/, response.badRequest('Invalid Profile Request')];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PersonalInformationsController.prototype.update = function (_a) {
        var auth = _a.auth, request = _a.request, response = _a.response;
        return __awaiter(this, void 0, void 0, function () {
            var data, user, client, unders, _i, unders_1, value, status, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = request.only(['first_name', 'last_name', 'photo', 'country', 'description', 'website']);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 10, , 11]);
                        user = auth.user;
                        return [4 /*yield*/, ClientRepository_1["default"].findByOrFail('id', user.profile_id)];
                    case 2:
                        client = _b.sent();
                        client.first_name = data.first_name,
                            client.last_name = data.last_name,
                            client.photo = data.photo,
                            client.country = data.country,
                            client.description = data.description;
                        return [4 /*yield*/, (client === null || client === void 0 ? void 0 : client.save())];
                    case 3:
                        _b.sent();
                        if (!data.website) return [3 /*break*/, 9];
                        unders = ['Occupation', 'Skill', 'Education'];
                        _i = 0, unders_1 = unders;
                        _b.label = 4;
                    case 4:
                        if (!(_i < unders_1.length)) return [3 /*break*/, 7];
                        value = unders_1[_i];
                        return [4 /*yield*/, ProfileStatusRepository_1["default"].query().where('client_id', user.profile_id).where('under', value).first()];
                    case 5:
                        status = _b.sent();
                        if (!status) {
                            return [2 /*return*/, response.badRequest('Please fillup' + ' ' + ("" + value) + ' ' + 'information')];
                        }
                        _b.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        client.profile_status = 'inProgress-linkedAccounts';
                        client.personal_website = data.website;
                        return [4 /*yield*/, (client === null || client === void 0 ? void 0 : client.save())];
                    case 8:
                        _b.sent();
                        return [2 /*return*/, response.ok("Website information successfully saved")];
                    case 9: return [2 /*return*/, response.ok("Personal information successfully saved")];
                    case 10:
                        e_2 = _b.sent();
                        return [2 /*return*/, response.badRequest('Invalid Profile Request')];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    PersonalInformationsController.prototype.draftProfile = function (_a) {
        var auth = _a.auth, request = _a.request, response = _a.response;
        return __awaiter(this, void 0, void 0, function () {
            var data, user, client, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = request.only(['first_name', 'last_name', 'photo', 'description']);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        user = auth.user;
                        return [4 /*yield*/, ClientRepository_1["default"].findBy('id', user === null || user === void 0 ? void 0 : user.profile_id)];
                    case 2:
                        client = _b.sent();
                        client.first_name = data.first_name,
                            client.last_name = data.last_name,
                            client.photo = data.photo,
                            client.description = data.description;
                        client.profile_status = 'inProgress-personal';
                        return [4 /*yield*/, (client === null || client === void 0 ? void 0 : client.save())];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, response.ok("Personal information successfully saved to draft")];
                    case 4:
                        e_3 = _b.sent();
                        return [2 /*return*/, response.badRequest('Invalid Profile Request')];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PersonalInformationsController.prototype.draftProfessional = function (auth, request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var data, user, client, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = request.only(['website']);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        user = auth.user;
                        return [4 /*yield*/, ClientRepository_1["default"].findBy('id', user === null || user === void 0 ? void 0 : user.profile_id)];
                    case 2:
                        client = _a.sent();
                        if (!!data.website) return [3 /*break*/, 4];
                        client.profile_status = 'inProgress-professional';
                        return [4 /*yield*/, (client === null || client === void 0 ? void 0 : client.save())];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, response.ok("Professional information successfully saved into draft")];
                    case 4:
                        client.personal_website = data.website,
                            client.profile_status = 'inProgress-professional';
                        return [4 /*yield*/, (client === null || client === void 0 ? void 0 : client.save())];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, response.ok("Professional information successfully saved into draft")];
                    case 6:
                        e_4 = _a.sent();
                        return [2 /*return*/, response.badRequest('Invalid Professional Request')];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return PersonalInformationsController;
}());
exports["default"] = PersonalInformationsController;

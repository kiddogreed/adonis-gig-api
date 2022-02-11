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
var LanguageRepository_1 = require("App/Repositories/LanguageRepository");
var LanguageTransformer_1 = require("App/Transformers/LanguageTransformer");
var LanguagesController = /** @class */ (function () {
    function LanguagesController() {
    }
    LanguagesController.prototype.show = function (_a) {
        var auth = _a.auth, transform = _a.transform, response = _a.response;
        return __awaiter(this, void 0, void 0, function () {
            var user, language, _b, _c, e_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        user = auth.user;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, LanguageRepository_1["default"].query().where('client_id', user.profile_id)];
                    case 2:
                        language = _d.sent();
                        _c = (_b = response).resource;
                        return [4 /*yield*/, transform.collection(language, LanguageTransformer_1["default"])];
                    case 3: return [2 /*return*/, _c.apply(_b, [_d.sent()])];
                    case 4:
                        e_1 = _d.sent();
                        return [2 /*return*/, response.badRequest("Invalid language request")];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    LanguagesController.prototype.set = function (_a) {
        var auth = _a.auth, request = _a.request, response = _a.response;
        return __awaiter(this, void 0, void 0, function () {
            var user, language, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user = auth.user;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, LanguageRepository_1["default"].create({
                                client_id: user === null || user === void 0 ? void 0 : user.profile_id,
                                level: request.input('level'),
                                language_name: request.input('language')
                            })];
                    case 2:
                        language = _b.sent();
                        return [4 /*yield*/, language.save()];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, response.ok("Language information successfully saved")];
                    case 4:
                        e_2 = _b.sent();
                        return [2 /*return*/, response.badRequest("Invalid language request")];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    LanguagesController.prototype.update = function (_a) {
        var params = _a.params, request = _a.request, response = _a.response;
        return __awaiter(this, void 0, void 0, function () {
            var language, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, LanguageRepository_1["default"].find(params.Id)];
                    case 1:
                        language = _b.sent();
                        language.level = request.input('level'),
                            language.language_name = request.input('language');
                        return [4 /*yield*/, (language === null || language === void 0 ? void 0 : language.save())];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, response.ok('Language successfully updated')];
                    case 3:
                        e_3 = _b.sent();
                        return [2 /*return*/, response.badRequest("Invalid language request")];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LanguagesController.prototype.destroy = function (_a) {
        var params = _a.params, response = _a.response;
        return __awaiter(this, void 0, void 0, function () {
            var language, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, LanguageRepository_1["default"].findOrFail(params.Id)];
                    case 1:
                        language = _b.sent();
                        return [4 /*yield*/, language["delete"]()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, response.ok('Language successfully deleted')];
                    case 3:
                        e_4 = _b.sent();
                        return [2 /*return*/, response.badRequest("Invalid language request")];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return LanguagesController;
}());
exports["default"] = LanguagesController;

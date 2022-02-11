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
var SkillRepository_1 = require("App/Repositories/SkillRepository");
var SkillTransformer_1 = require("App/Transformers/SkillTransformer");
var SkillNameRepository_1 = require("App/Repositories/SkillNameRepository");
var SkillNameTransformer_1 = require("App/Transformers/SkillNameTransformer");
var SkillsController = /** @class */ (function () {
    function SkillsController() {
    }
    SkillsController.prototype.show = function (_a) {
        var response = _a.response, transform = _a.transform;
        return __awaiter(this, void 0, void 0, function () {
            var skill, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, SkillNameRepository_1["default"].all()];
                    case 1:
                        skill = _d.sent();
                        _c = (_b = response).resource;
                        return [4 /*yield*/, transform.collection(skill, SkillNameTransformer_1["default"])];
                    case 2: return [2 /*return*/, _c.apply(_b, [_d.sent()])];
                }
            });
        });
    };
    SkillsController.prototype.index = function (_a) {
        var auth = _a.auth, response = _a.response, transform = _a.transform;
        return __awaiter(this, void 0, void 0, function () {
            var user, skill, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        user = auth.user;
                        return [4 /*yield*/, SkillRepository_1["default"].query().where('client_id', user.profile_id)];
                    case 1:
                        skill = _d.sent();
                        _c = (_b = response).resource;
                        return [4 /*yield*/, transform.collection(skill, SkillTransformer_1["default"])];
                    case 2: return [2 /*return*/, _c.apply(_b, [_d.sent()])];
                }
            });
        });
    };
    SkillsController.prototype.set = function (_a) {
        var auth = _a.auth, request = _a.request, response = _a.response;
        return __awaiter(this, void 0, void 0, function () {
            var user, data, _i, data_1, value, skill, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user = auth.user;
                        data = request.input(["data"]);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, , 8]);
                        _i = 0, data_1 = data;
                        _b.label = 2;
                    case 2:
                        if (!(_i < data_1.length)) return [3 /*break*/, 6];
                        value = data_1[_i];
                        return [4 /*yield*/, SkillRepository_1["default"].create({
                                client_id: user.profile_id,
                                skill_id: value.skill_id,
                                skill_name: value.skill_name
                            })];
                    case 3:
                        skill = _b.sent();
                        return [4 /*yield*/, skill.save()];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/, response.ok('Skill information saved')];
                    case 7:
                        e_1 = _b.sent();
                        return [2 /*return*/, response.badRequest('Invalid Skill Request')];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    SkillsController.prototype.update = function (_a) {
        var request = _a.request, response = _a.response, params = _a.params;
        return __awaiter(this, void 0, void 0, function () {
            var skill, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, SkillRepository_1["default"].findByOrFail('id', params.Id)];
                    case 1:
                        skill = _b.sent();
                        skill.skill_id = request.input('skill_id');
                        skill.level = request.input('level');
                        return [4 /*yield*/, (skill === null || skill === void 0 ? void 0 : skill.save())];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, response.ok('Skill information saved')];
                    case 3:
                        e_2 = _b.sent();
                        return [2 /*return*/, response.badRequest('Invalid Skill Request')];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SkillsController.prototype.destroy = function (_a) {
        var response = _a.response, params = _a.params;
        return __awaiter(this, void 0, void 0, function () {
            var skill, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, SkillRepository_1["default"].findByOrFail('id', params.Id)];
                    case 1:
                        skill = _b.sent();
                        return [4 /*yield*/, skill["delete"]()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, response.ok('Skill information deleted')];
                    case 3:
                        e_3 = _b.sent();
                        return [2 /*return*/, response.badRequest('Invalid Skill Request')];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return SkillsController;
}());
exports["default"] = SkillsController;

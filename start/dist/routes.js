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
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
var Route_1 = require("@ioc:Adonis/Core/Route");
var Env_1 = require("@ioc:Adonis/Core/Env");
Route_1["default"].get('/', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, { messsage: "DOC GIG API (" + Env_1["default"].get('NODE_ENV') + ")" }];
    });
}); });
Route_1["default"].post('/auth', 'AuthController.login');
Route_1["default"].post('/auth/logout', 'AuthController.logout');
Route_1["default"].get('/categories', 'CategoriesController.index');
Route_1["default"].post('/categories', 'CategoriesController.set');
Route_1["default"].put('/categories/:id', 'CategoriesController.update');
Route_1["default"].get('/certification', 'CertificationsController.index').middleware('auth:api');
Route_1["default"].post('/certification', 'CertificationsController.set').middleware('auth:api');
Route_1["default"].put('/certification/:Id', 'CertificationsController.update').middleware('auth:api');
Route_1["default"]["delete"]('/certification/:Id', 'CertificationsController.destroy').middleware('auth:api');
Route_1["default"].get('/education', 'EducationsController.index').middleware('auth:api');
Route_1["default"].post('/education', 'EducationsController.set').middleware('auth:api');
Route_1["default"].put('/education/:Id', 'EducationsController.update').middleware('auth:api');
Route_1["default"]["delete"]('/education/:Id', 'EducationsController.destroy').middleware('auth:api');
Route_1["default"].post('/gig', 'GigsController.set').middleware('auth:api');
Route_1["default"].get('/gig/category', 'GigsController.gigCategory').middleware('auth:api');
Route_1["default"].get('/gig/sub-category', 'GigsController.subCategory').middleware('auth:api');
Route_1["default"].get('/gig/description', 'GigDescriptionsController.show').middleware('auth:api');
Route_1["default"].post('/gig/description', 'GigDescriptionsController.set').middleware('auth:api');
Route_1["default"].put('/gig/:Id/description', 'GigDescriptionsController.update').middleware('auth:api');
Route_1["default"].get('/gig/faq', 'GigFaqsController.show').middleware('auth:api');
Route_1["default"].post('/gig/faq', 'GigFaqsController.set').middleware('auth:api');
Route_1["default"].put('/gig/:Id/faq', 'GigFaqsController.update').middleware('auth:api');
Route_1["default"]["delete"]('/gig/:Id/faq', 'GigFaqsController.destroy').middleware('auth:api');
Route_1["default"].get('/gig/requirement', 'GigRequirementsController.index').middleware('auth:api');
Route_1["default"].post('/gig/requirement', 'GigRequirementsController.set').middleware('auth:api');
Route_1["default"].put('/gig/question/:Id/requirement', 'GigRequirementsController.question').middleware('auth:api');
Route_1["default"].put('/gig/answer/:Id/requirement', 'GigRequirementsController.choice').middleware('auth:api');
Route_1["default"].post('/gig/faq/answer', 'GigFaqAnswerController.set').middleware('auth:api');
Route_1["default"].put('/gig/:Id/faq/answer', 'GigFaqAnswerController.update').middleware('auth:api');
Route_1["default"]["delete"]('/gig/:Id/faq/answer', 'GigFaqAnswerController.destroy').middleware('auth:api');
Route_1["default"].get('/language', 'LanguagesController.show').middleware('auth:api');
Route_1["default"].post('/language', 'LanguagesController.set').middleware('auth:api');
Route_1["default"].put('/language/:Id', 'LanguagesController.update').middleware('auth:api');
Route_1["default"]["delete"]('/language/:Id', 'LanguagesController.destroy').middleware('auth:api');
Route_1["default"].get('/linked', 'linkAccountsController.index').middleware('auth:api');
Route_1["default"].post('/linked', 'linkAccountsController.set').middleware('auth:api');
Route_1["default"].post('/linked/sample', 'linkAccountsController.link').middleware('auth:api');
Route_1["default"].get('/occupation', 'OccupationsController.index').middleware('auth:api');
Route_1["default"].post('/occupation', 'OccupationsController.set').middleware('auth:api');
Route_1["default"].put('/occupation/:Id', 'OccupationsController.update').middleware('auth:api');
Route_1["default"]["delete"]('/occupation/:Id', 'OccupationsController.destroy').middleware('auth:api');
Route_1["default"].get('/profile', 'PersonalInformationsController.show').middleware('auth:api');
Route_1["default"].post('/profile', 'PersonalInformationsController.set').middleware('auth:api');
Route_1["default"].put('/profile', 'PersonalInformationsController.update').middleware('auth:api');
Route_1["default"].put('/profile/type', 'ProfileSetupController.profileSetupType').middleware('auth:api');
Route_1["default"].get('/security', 'SecurityController.show').middleware('auth:api');
Route_1["default"].put('/security', 'SecurityController.update').middleware('auth:api');
Route_1["default"].post('/signup', 'SignUpController.signup');
Route_1["default"].post('/signup/verify', 'SignUpController.register');
Route_1["default"].get('/skill', 'SkillsController.index').middleware('auth:api');
Route_1["default"].post('/skill', 'SkillsController.set').middleware('auth:api');
Route_1["default"].put('/skill/:Id', 'SkillsController.update').middleware('auth:api');
Route_1["default"]["delete"]('/skill/:Id', 'SkillsController.destroy').middleware('auth:api');
Route_1["default"].get('/skill/name', 'SkillsController.show').middleware('auth:api');
Route_1["default"].post('two_factor/enable', 'TwoFactorAuthenticationsController.enable').middleware('auth:api');
Route_1["default"].post('two_factor/disable', 'TwoFactorAuthenticationsController.disable').middleware('auth:api');
Route_1["default"].post('two_factor/verify', 'TwoFactorAuthenticationsController.verify').middleware('auth:api');
Route_1["default"].post('two_factor/auth', 'TwoFactorAuthenticationsController.authenticate').middleware('auth:api');
Route_1["default"].get('/github/redirect', 'linkAccountsController.redirect').middleware('auth:api');
//Route.get('/facebook/authenticated', 'linkAccountsController.redirect').middleware('auth:api')
Route_1["default"].get('/github/authenticated', 'linkAccountsController.callback').middleware('auth:api');

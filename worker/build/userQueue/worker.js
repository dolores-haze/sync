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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userWorker = void 0;
var apiClient_1 = require("../services/apiClient");
var syncService_1 = require("../services/syncService");
var userService_1 = require("../services/userService");
var userWorker = function (job, done) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, users, errors;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4, apiClient_1.fetchUsers()];
            case 1:
                _a = _b.sent(), users = _a.users, errors = _a.errors;
                if (errors.length > 0) {
                    return [2, errors];
                }
                return [2, storeUsers(job, users)];
        }
    });
}); };
exports.userWorker = userWorker;
var storeUsers = function (job, users) { return __awaiter(void 0, void 0, void 0, function () {
    var sync, response, processed, total, _i, users_1, u, user, update, error_1, newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, syncService_1.createSync()];
            case 1:
                sync = _a.sent();
                response = { syncId: sync.id, errors: [] };
                processed = 0;
                total = users.length;
                _i = 0, users_1 = users;
                _a.label = 2;
            case 2:
                if (!(_i < users_1.length)) return [3, 12];
                u = users_1[_i];
                u.sync_id = response.syncId;
                return [4, userService_1.generateInternalUser(u)];
            case 3:
                user = _a.sent();
                console.log('syncID', response.syncId);
                console.log('user', user);
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 10]);
                return [4, userService_1.updateUser(user)];
            case 5:
                update = _a.sent();
                console.log('update', update);
                return [3, 10];
            case 6:
                error_1 = _a.sent();
                console.log('error', error_1);
                if (!(error_1.message === "User with email " + u.email + " does not exist")) return [3, 8];
                return [4, userService_1.createUser(user)];
            case 7:
                newUser = _a.sent();
                console.log('create', newUser);
                return [3, 9];
            case 8:
                response.errors.push({ external_id: "" + u.id, message: error_1.message });
                _a.label = 9;
            case 9: return [3, 10];
            case 10:
                processed++;
                job.reportProgress({
                    syncId: response.syncId,
                    errors: response.errors,
                    processed: processed,
                    total: total
                });
                _a.label = 11;
            case 11:
                _i++;
                return [3, 2];
            case 12:
                console.log('response', response);
                return [2, Promise.resolve(response)];
        }
    });
}); };

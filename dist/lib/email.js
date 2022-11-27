"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class EmailSend {
    sendEmail(email, url) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("EMAIL!:", email);
            let pass = process.env.NODEMAILER_PASS;
            let emailPas = process.env.NODEMAILER_EMAIL;
            console.log("pass: ", pass);
            console.log("emailPas: ", emailPas);
            let transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: emailPas,
                    pass: pass //process.env.NODEMAILER_PASS,
                },
                tls: { rejectUnauthorized: false },
                secure: false, // true for 465, false for other ports
            });
            try {
                let info = yield transporter.sendMail({
                    from: "slava91petrushin@yandex.ru",
                    to: email,
                    html: url,
                });
                console.log("INFO: ", info);
                return true;
            }
            catch (error) {
                console.log("ERROR: ", error);
                return false;
            }
        });
    }
}
exports.Email = new EmailSend();

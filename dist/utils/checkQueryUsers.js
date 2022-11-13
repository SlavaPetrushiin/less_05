"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkQueryUsers = void 0;
const DEFAULT_QUERY = {
    searchLoginTerm: "",
    searchEmailTerm: "",
    pageNumber: "1",
    pageSize: "10",
    sortBy: "createdAt",
    sortDirection: "desc"
};
var FIELDS_FOR_SORTBY;
(function (FIELDS_FOR_SORTBY) {
    FIELDS_FOR_SORTBY["id"] = "id";
    FIELDS_FOR_SORTBY["login"] = "login";
    FIELDS_FOR_SORTBY["email"] = "email";
    FIELDS_FOR_SORTBY["createdAt"] = "createdAt";
})(FIELDS_FOR_SORTBY || (FIELDS_FOR_SORTBY = {}));
function checkQueryUsers(req, res, next) {
    let { pageNumber, pageSize, searchEmailTerm, searchLoginTerm, sortBy, sortDirection } = req.query;
    if (!searchEmailTerm) {
        req.query.searchEmailTerm = DEFAULT_QUERY.searchEmailTerm;
    }
    if (!searchLoginTerm) {
        req.query.searchLoginTerm = DEFAULT_QUERY.searchLoginTerm;
    }
    if (!pageNumber || isNaN(parseInt(pageNumber, 10))) {
        req.query.pageNumber = DEFAULT_QUERY.pageNumber;
    }
    if (!pageSize || isNaN(parseInt(pageSize, 10))) {
        req.query.pageSize = DEFAULT_QUERY.pageSize;
    }
    if (!sortBy || !Object.values(FIELDS_FOR_SORTBY).includes(sortBy)) {
        req.query.sortBy = DEFAULT_QUERY.sortBy;
    }
    if (!sortDirection || sortDirection != "asc" && sortDirection != "desc") {
        req.query.sortDirection = DEFAULT_QUERY.sortDirection;
    }
    next();
}
exports.checkQueryUsers = checkQueryUsers;

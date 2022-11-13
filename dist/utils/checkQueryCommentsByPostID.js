"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkQueryCommentsByPostID = void 0;
const DEFAULT_QUERY = {
    pageNumber: "1",
    pageSize: "10",
    sortBy: "createdAt",
    sortDirection: "desc"
};
function checkQueryCommentsByPostID(req, res, next) {
    let { pageNumber, pageSize, sortBy, sortDirection } = req.query;
    if (!pageNumber || isNaN(parseInt(pageNumber, 10))) {
        req.query.pageNumber = DEFAULT_QUERY.pageNumber;
    }
    if (!pageSize || isNaN(parseInt(pageSize, 10))) {
        req.query.pageSize = DEFAULT_QUERY.pageSize;
    }
    if (!sortBy) {
        req.query.sortBy = DEFAULT_QUERY.sortBy;
    }
    if (!sortDirection || sortDirection != "asc" && sortDirection != "desc") {
        req.query.sortDirection = DEFAULT_QUERY.sortDirection;
    }
    next();
}
exports.checkQueryCommentsByPostID = checkQueryCommentsByPostID;

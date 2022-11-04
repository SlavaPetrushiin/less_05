"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkQueryPostsAndBlogs = void 0;
const DEFAULT_QUERY = {
    searchNameTerm: "",
    pageNumber: "1",
    pageSize: "10",
    sortBy: "createdAt",
    sortDirection: "desc"
};
function checkQueryPostsAndBlogs(req, res, next) {
    let { searchNameTerm, pageNumber, pageSize, sortBy, sortDirection } = req.query;
    if (!searchNameTerm) {
        req.query.searchNameTerm = DEFAULT_QUERY.searchNameTerm;
    }
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
exports.checkQueryPostsAndBlogs = checkQueryPostsAndBlogs;

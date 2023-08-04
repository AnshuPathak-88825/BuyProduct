class ApiFeature {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }
  search() {
    const keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find(keyword);
    return this;
  }
  filter() {
    // copy value of querystr not passing referrence
    const queryCopy = { ...this.querystr };
    const removeField = ["keyword", "page", "limit"];
    removeField.forEach((key) => {
      delete queryCopy[key];
    });
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  pagination(ResultPerpage) {
    const currentPage = Number(this.querystr.page) || 1;
    const skip = (currentPage - 1) * ResultPerpage;
    this.query = this.query.limit(ResultPerpage).skip(skip);
    return this;
  }
}
module.exports = ApiFeature;

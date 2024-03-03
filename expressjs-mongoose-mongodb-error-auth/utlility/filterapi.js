const movies = require("./../model/moviemodel");
// query=movies.find() querystr=req.query
class filterapi {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }
  filter() {
    let query = JSON.stringify(this.querystr);
    query = query.replace(/\b(gte|lte|gt|lt)\b/g, (el) => `$${el}`);
    const querystr = JSON.parse(query);
   
    const exclude = ["sort", "limit", "field", "page"];
    exclude.forEach((el) => {
      delete querystr[el];
    });
  //  console.log(querystr);
    this.query = this.query.find(querystr);
  //  console.log(this);
    // if(!(this.query)) return next(err);
    return this;
  }
  sort() {
    if (this.querystr.sort) {
      let sortquery = this.querystr.sort;
      sortquery = sortquery.split(",").join(" ");
   
      this.query = this.query.sort(sortquery);
      return this;
    }
    return this;
  }
  limitFields() {
    if (this.querystr.field) {
      let field = this.querystr.field;
      field = field.split(",").join(" ");
      this.query = this.query.select(field);
      return this;
    } else {
      this.query = this.query.select("-__v");
    
      return this;
    }
  }
  paginate() {
    if (this.querystr.page || this.query.limit) {
  
      const page = this.querystr.page * 1 || 1;
      const limit = this.querystr.limit * 1 || 10;
      const skip = (page - 1) * limit;
    
      if (skip > limit) {
        return res.status(404).json(responsefunction("succes", data));
      }
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }

    return this;
  }
}
module.exports = filterapi;

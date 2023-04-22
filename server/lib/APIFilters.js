class APIFilters {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // The queryString is an object i.e., {category: 'Laptops'} or {keyword: 'shure'}

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: 'i', //case insensitive
          },
        }
      : {};

    // keyword = {name: {'$regex': 'shure', '$options': 'i'}}

    this.query = this.query.find({ ...keyword });

    return this;
  }

  filter() {
    const queryCopy = { ...this.queryString };

    const removeFields = ['keyword', 'page'];
    removeFields.forEach((field) => delete queryCopy[field]);

    // {price: {$gte: 100, $lte: 1000 }}

    let output = {};
    let prop = '';

    for (let key in queryCopy) {
      // console.log('key', key);
      if (!key.match(/\b(gt|gte|lt|lte)/)) {
        output[key] = queryCopy[key];
      } else {
        prop = key.split('[')[0];

        let operator = key.match(/\[(.*)\]/)[1];

        if (!output[prop]) {
          output[prop] = {};
        }

        output[prop][`$${operator}`] = queryCopy[key];
      }
    }
    this.query = this.query.find(output);
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);

    return this;
  }
}

export default APIFilters;

class SuccessResponse {
  constructor(data, code = 200) {
    this.result = data;
    this.statusCode = code;
  }
}

class SuccessArrayResponse {
  constructor(data, count, code = 200) {
    this.results = data;
    this.count = count;
    this.statusCode = code;
  }
}

class LikeResponse {
  constructor(msg = "message", code = 200) {
    this.results = msg;
    this.statusCode = code;
  }
}



module.exports = { SuccessResponse, SuccessArrayResponse, LikeResponse };

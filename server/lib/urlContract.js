/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/5/18 上午1:33
 * @Filename: urlContract.js
 * @Function: do nothing >_>
 */

const { Contract, Context } = require("fabric-contract-api");

const Url = require("./ledger/url");
const UrlList = require("./ledger/urlList");

class UniformResourceLocatorContext extends Context {
  constructor() {
    super();

    this.urlList = new UrlList(this);
  }
}

class UniformResourceLocatorContract extends Contract {
  constructor() {
    super("org.eer.url");
  }

  createContext() {
    return new UniformResourceLocatorContext();
  }

  async instantiate(ctx) {
    // init
    console.log("Instantiate the AccessControl Contract");
  }

  // async ...
}

module.exports = UniformResourceLocatorContract;

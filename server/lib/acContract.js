/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/5/18 上午1:32
 * @Filename: acContract.js
 * @Function: do nothing >_>
 */

const { Contract, Context } = require("fabric-contract-api");

const AccessControl = require("./ledger/ac");
const AccessControlList = require("./ledger/acList");

class AccessControlContext extends Context {
  constructor() {
    super();

    this.acList = new AccessControlList(this);
  }
}

class AccessControlContract extends Contract {
  constructor() {
    super("org.eer.ac");
  }

  createContext() {
    return new AccessControlContext();
  }

  async instantiate(ctx) {
    // init
    console.log("Instantiate the AccessControl Contract");
  }

  // async ...
}

module.exports = AccessControlContract;

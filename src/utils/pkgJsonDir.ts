import { dirname } from "path";
import { constants, promises } from "fs";

const getPkgJsonDir = async () => {
  for (let path of module.paths) {
    try {
      let prospectivePkgJsonDir = dirname(path);
      await promises.access(path, constants.F_OK);
      return prospectivePkgJsonDir;
    } catch (e) {
      // console.log(2, e);
    }
  }
};

export default getPkgJsonDir

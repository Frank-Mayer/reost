import { existsSync, promises as fs } from "fs";
import { join } from "path";
import { yahp } from "@frank-mayer/yahp";

// eslint-disable-next-line space-before-function-paren
const fromDir = async (startPath) => {
  if (!existsSync(startPath)) {
    return;
  }

  const files = await fs.readdir(startPath);
  for (let i = 0; i < files.length; i++) {
    const filename = join(startPath, files[i]);
    const stat = await fs.lstat(filename);
    if (stat.isDirectory()) {
      await fromDir(filename);
    } else if (filename.endsWith(".yahp")) {
      console.debug(`Found input file ${filename}`);
      const source = await fs.readFile(filename, "utf-8");
      console.debug(`${filename} read`);
      const out = await yahp(source);
      console.debug(`${filename} parsed`);
      const newFileName = filename.substring(0, filename.length - 4) + "html";
      await fs.writeFile(newFileName, out);
      console.debug(`${newFileName} written`);
    }
  }
};

await fromDir("./src");

import { join } from "path";
import {
  existsSync,
  readdirSync,
  lstatSync,
  readFileSync,
  writeFileSync,
} from "fs";
import { yahp } from "@frank-mayer/yahp";

const fromDir = async(startPath, filter) => {
  if (!existsSync(startPath)) {
    console.error("no dir ", startPath);
    return;
  }

  const files = readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    const filename = join(startPath, files[i]);
    const stat = lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter); // recursion
    } else if (filename.endsWith(filter)) {
      console.debug("processing", filename);
      await yahp(readFileSync(filename, "utf8"))
        .then((html) => {
          writeFileSync(filename, html);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
};

fromDir("./dist", ".html");

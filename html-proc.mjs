import { existsSync, promises as fs } from "fs";
import { join } from "path";
import { yahp } from "@frank-mayer/yahp";
import showdown from "showdown";

const md = new showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  noHeaderId: true,
  parseImgDimensions: true,
  ghCodeBlocks: true,
  emoji: true,
  underline: true,
});

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
      await fs.writeFile(
        filename.substring(0, filename.length - 4) + "html",
        await yahp(await fs.readFile(filename, "utf-8"))
      );
    } else if (filename.endsWith(".md")) {
      console.debug(`Found input file ${filename}`);
      await fs.writeFile(
        filename.substring(0, filename.length - 2) + "html",
        md.makeHtml(await fs.readFile(filename, "utf-8"))
      );
    }
  }
};

await fromDir("./src");

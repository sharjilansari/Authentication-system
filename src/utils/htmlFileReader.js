import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; // Required for ES module path handling

// Equivalent to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const replacePlaceholders = (html, data) => {
    return html.replace(/{{verificationLink}}/g, data.verificationLink)
}

const htmlContentReader = (filePath, verificationLink) => {
    const htmlTemplatePath = path.join(__dirname, filePath);
    let htmlContent = fs.readFileSync(htmlTemplatePath, "utf-8");
    htmlContent = replacePlaceholders(htmlContent, {verificationLink})
    return htmlContent;
}

export { htmlContentReader };
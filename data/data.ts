import { importExcelSheet } from "../importExcelSheet";

const fileName = "allergy_menu.xlsx";
const excelTab = "Menu November 4th";
const menu = importExcelSheet(fileName, excelTab);

module.exports = menu;

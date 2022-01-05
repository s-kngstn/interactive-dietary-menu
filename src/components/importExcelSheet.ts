// @ts-check
/**
 * This functions dependencies are xlsx + lodash
 * This function contains an optional parameter for the length of the output, with the default being the length of the excel sheets row
 */

 export const importExcelSheet = (
  fileName: string,
  sheetTab: string,
  menuItems?: number
) => {
  let XLSX;
  if (typeof require !== "undefined") XLSX = require("xlsx");
  const _ = require("lodash");
  const workbook = XLSX.readFile(fileName);
  const numberOfCols = 5;
  const numberOfRows = _.size(workbook.Sheets[sheetTab]) / numberOfCols - 1.75; // 1.75 accounts for extra unwanted information in the sheetsJS object.
  if (menuItems === undefined) menuItems = numberOfRows;

  const MENU_ITEMS = [];
  const dishIndex = 0;
  const courseIndex = 1;
  const integralIndex = 2;
  const removableIndex = 3;
  const priceIndex = 4;

  for (let colNumber = 2; colNumber < menuItems + 2; colNumber++) {
    const excelCells = [
      `A${colNumber}`,
      `B${colNumber}`,
      `C${colNumber}`,
      `D${colNumber}`,
      `E${colNumber}`
    ];
    const cellCols = excelCells.map((item) => {
      const excelSheetItems = workbook.Sheets[sheetTab][item].w;
      return excelSheetItems;
    });

    if (cellCols[integralIndex] === "-") {
      cellCols[integralIndex] = [];
    } else {
      const integral = cellCols[integralIndex];
      const integralArr = integral.split(",");
      cellCols[integralIndex] = integralArr;
    }

    if (cellCols[removableIndex] === "-") {
      cellCols[removableIndex] = [];
    } else {
      const removable = cellCols[removableIndex];
      const removableArr = removable.split(",");
      cellCols[removableIndex] = removableArr;
    }

    interface Menu {
      dishName: string;
      course: string;
      integral: string[];
      removable: string[];
      price: string;
    }

    const menuObject: Menu = {
      dishName: cellCols[dishIndex],
      course: cellCols[courseIndex],
      integral: cellCols[integralIndex],
      removable: cellCols[removableIndex],
      price: cellCols[priceIndex],
    };

    MENU_ITEMS.push(menuObject);
  }

  return MENU_ITEMS;
};


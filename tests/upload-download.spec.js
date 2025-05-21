import { test, expect } from '@playwright/test'
import ExcelJS from 'exceljs'

async function writeToExcel(params) {
    const workbook = new ExcelJS.Workbook()
    const worksheet = await workbook.xlsx.readFile(params.sheetPath)
    const sheetName = worksheet.getWorksheet(params.sheetName)
    const myObject = await readFromExcel(sheetName, params.searchText)

    const currentCell = sheetName.getCell(myObject.row, myObject.col + params.colOffset)
    currentCell.value = params.updatedText

    // for git commit, i am writing into new file
    await workbook.xlsx.writeFile(params.sheetPath)
}

async function readFromExcel(sheetName, searchText) {
    let myObject = { row: -1, col: -1 }
    sheetName.eachRow((row) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                console.log(`${searchText} found in row ${row.number} & column ${colNumber}`)
                myObject.row = row.number
                myObject.col = colNumber
            }
        })
    })
    return myObject
}

test('upload and download', async ({ page }) => {
    // variables
    const sheetPath = 'downloadedExcel.xlsx'
    const sheetName = 'Sheet1'
    const searchText = 'Mango'
    const updatedText = 100

    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html', { waitUntil: 'domcontentloaded' })

    // Download the file and save as excel
    const downloadPromise = page.waitForEvent('download')
    await page.getByText('Download').click() // click the download button
    const download = await downloadPromise // wait for download event to complete
    await download.saveAs(sheetPath) // save the file

    // Read the file and update the value
    await writeToExcel({ sheetPath, sheetName, searchText, updatedText, colOffset: 2 })

    // Upload the file and check if the value is updated
    await page.locator('#fileinput').setInputFiles(sheetPath)

    // Assert the value in page, is updated
    const locatorForSearchText = page.getByText(searchText)
    const locatorForIdentifiedRow = page.getByRole('row').filter({ has: locatorForSearchText })

    expect(await locatorForIdentifiedRow.getByRole('cell', { name: updatedText }).textContent()).toContain(
        updatedText.toString(),
    )
})

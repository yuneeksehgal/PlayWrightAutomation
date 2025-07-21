
//https://github.com/zerostep-ai/zerostep?tab=readme-ov-file

const { test, expect } = require('@playwright/test');
import { ai } from "@zerostep/playwright"
import { only } from "node:test";

test("AI Test capability",async({page})=>
{
  const aiArgs = {page,test}
  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
  const discountPrice = await ai("What is the Discount price of Tomato",aiArgs)
  expect(discountPrice).toEqual("26")
  const price = await ai("What is the Price of Tomato",aiArgs)
  expect(price).toEqual("37")
  const diff = await ai("What is the value difference between price and Discounr price of tomato",aiArgs)
  expect(diff).toEqual("11")

  await page.goto("https://rahulshettyacademy.com/dropdownsPractise/")
  const blinkingText = await ai("Get blinkingText in the page",aiArgs)
  expect(blinkingText).toEqual("Free Access to InterviewQues/ResumeAssistance/Material")
  const firstValue = await ai('Split ${blinkingText} with "/" and give 0th index value',aiArgs)
  console.log(firstValue)
  expect(firstValue).toEqual("Free Access to InterviewQues")
  

})

test.only('Login into Client site using AI', async ({ page }) => {
  await page.goto('https://www.breadcrumbs.app/')

  // An object with page and test must be passed into every call
  const aiArgs = { page, test }

  await ai('Click "Log in" button from top nav', aiArgs)
  await page.waitForTimeout(8_000)
  await ai('Enter "yuneek@breadcrumbs.app" as Email', aiArgs)
  await ai('Enter "Testing1@3" as Password', aiArgs)
  await ai('Click Continue', aiArgs)
  await page.waitForTimeout(8_000)
  await ai('Click "New Report" button', aiArgs)
  await ai('Wait for "Resolution Below Recommended Settings" modal to appear', aiArgs)
  await ai('Click "OK" button', aiArgs)

})

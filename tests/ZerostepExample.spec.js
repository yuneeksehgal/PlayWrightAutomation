
//https://github.com/zerostep-ai/zerostep?tab=readme-ov-file

const { test, expect } = require('@playwright/test');
import { ai } from "@zerostep/playwright"

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
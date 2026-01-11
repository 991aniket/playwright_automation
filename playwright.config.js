
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', 
  // in this file we will tell what test 
  // are present and those test will get execute 
  // ./tests point to test at project level
  // If want to run specificly one test then write
  //'./tests/fileName.spec.js'
  //overall we will trigerr configuration file 
  // in that test director it will execute the file 


  // timeouts - By default timeout for 
  //each test is 30 sec 
  //If you want to Override it 

  timeout:40*1000, // components , Variable, Test

  //time out for Assertion level 
  //Expects Timeout 
expect:{
  timeout:5*1000,
},
reporter: 'html',

  use:{
        // which browser to use we can define here 

        browserName :'chromium',
        headless:false,
        screenshot:'only-on-failure',
        trace:'on-all-retries',
  },
});


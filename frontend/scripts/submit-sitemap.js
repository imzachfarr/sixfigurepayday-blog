#!/usr/bin/env node

/**
 * Script to submit sitemap to search engines
 * This helps with favicon re-crawling and SEO
 */

const https = require('https');
const http = require('http');

const sitemapUrl = 'https://sixfigurepayday.com/sitemap.xml';

// Google Search Console (you'll need to replace with your actual verification code)
const googleVerificationCode = 'your-google-verification-code';

// Bing Webmaster Tools (you'll need to replace with your actual verification code)
const bingVerificationCode = 'your-bing-verification-code';

async function submitToGoogle() {
  console.log('Submitting sitemap to Google Search Console...');
  
  const options = {
    hostname: 'www.google.com',
    port: 443,
    path: `/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    method: 'GET'
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      console.log(`Google submission status: ${res.statusCode}`);
      resolve(res.statusCode);
    });

    req.on('error', (error) => {
      console.error('Google submission error:', error);
      reject(error);
    });

    req.end();
  });
}

async function submitToBing() {
  console.log('Submitting sitemap to Bing Webmaster Tools...');
  
  const options = {
    hostname: 'www.bing.com',
    port: 443,
    path: `/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    method: 'GET'
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      console.log(`Bing submission status: ${res.statusCode}`);
      resolve(res.statusCode);
    });

    req.on('error', (error) => {
      console.error('Bing submission error:', error);
      reject(error);
    });

    req.end();
  });
}

async function main() {
  try {
    console.log('Starting sitemap submission...');
    
    await submitToGoogle();
    await submitToBing();
    
    console.log('Sitemap submission completed!');
    console.log('\nNext steps:');
    console.log('1. Add your site to Google Search Console');
    console.log('2. Add your site to Bing Webmaster Tools');
    console.log('3. Submit your sitemap through their web interfaces');
    console.log('4. Request re-crawling of your favicon');
    
  } catch (error) {
    console.error('Error submitting sitemap:', error);
  }
}

if (require.main === module) {
  main();
}

module.exports = { submitToGoogle, submitToBing }; 
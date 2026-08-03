const fs = require("fs");
const out = "d:/CoxfutureWork/denmaq/services/services.html";

const parts = [];

// HEAD
parts.push(`<!DOCTYPE html>
<html lang="en">
<head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-W84YRZJ05S"><\/script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","G-W84YRZJ05S");<\/script>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Digital Marketing &amp; IT Services | SEO, PPC, Web &amp; App Development | Denmaq</title>
    <meta name="description" content="Denmaq offers full-service digital marketing and IT solutions including SEO, Google Ads, social media marketing, web development, mobile app development, and custom software. Get a free consultation today.">
    <meta property="og:title" content="Digital Marketing &amp; IT Services | Denmaq">
    <meta property="og:description" content="From SEO and Google Ads to custom web and app development, Denmaq delivers measurable digital results for businesses worldwide.">
    <meta property="og:type" content="website">
    <link rel="canonical" href="https://denmaq.com/services/services.html">
    <link rel="icon" type="image/png" href="../img/favicon.png">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Outfit:wght@100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/app.css">
<\/head>
<body>`);

fs.appendFileSync(out, "", "utf8"); // create/clear
fs.writeFileSync(out, parts.join("\n"), "utf8");
console.log("head done");

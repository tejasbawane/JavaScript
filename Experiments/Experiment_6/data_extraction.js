let text = "This is Tejas Bawane, contact me at tejas.bawane.batch2024@sitnagpur.siu.edu.in. Welcome to our website!";

//email validation
let email = "student@example.com";
let emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log("Valid email address",emailregex.test(email));

//data extraction
let emails = text.match(/[^\s@]+@[^@\s]+\.[^@\s]+/g);
console.log("Extracted Emails:", emails);

//string functions
console.log("Uppercase", text.toUpperCase());
console.log("Lowercase", text.toLowerCase());
console.log("Contains 'Welcome':",text.includes("Welcome"));
console.log("Text Length", text.length);

//text analysis
let words = text.split(/\s+/);
console.log("Number of Words:", words.length);

//count occurrences of "email"
let count = (text.match(/email/gi) || []).length;
console.log("Occurrences of 'email':",count);
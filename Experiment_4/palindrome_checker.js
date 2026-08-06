let welcome = function() {
    console.log("Welcome to the Palindrome Checker!");
};

welcome();

// Global variable 
let language = "JavaScript";

// Main function to check if a string or number is a palindrome
function isPalindrome(str) {
    // 1. Accept numbers by converting them to strings
    if (typeof str === "number") {
        str = String(str);
    }

    // 2. Validate input type (reject null, undefined, objects, arrays, etc.)
    if (typeof str !== "string") {
        throw new TypeError(`Expected a string or number, but received ${typeof str}`);
    }

    // 3. Check for empty string
    if (str.trim().length === 0) {
        throw new Error("Input string cannot be empty.");
    }

    // Clean the string: remove non-alphanumeric characters and convert to lowercase
    let cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");

    // Handle edge case where input had only punctuation/spaces (e.g., "!!!")
    if (cleaned.length === 0) {
        throw new Error("Input must contain at least one alphanumeric character.");
    }

    // Reverse and check
    let reversed = cleaned.split("").reverse().join("");
    return cleaned === reversed;
}

// Helper function with try...catch error handling
function testPalindrome(phrase) {
    try {
        let result = isPalindrome(phrase);
        console.log(` SUCCESS: "${phrase}" -> ${result ? "Is a palindrome!" : "Not a palindrome."}`);
    } catch (error) {
        // Handle caught errors safely without stopping execution
        console.error(` ERROR [${error.name}]: Failed to check input (${phrase}) -> ${error.message}`);
    }
}

// --- Testing Examples ---
console.log(`\nRunning checks using ${language}:\n` + "=".repeat(45));

// Valid Test Cases (Strings & Numbers)
testPalindrome("Hello World");
testPalindrome("Tejas Bawane");
testPalindrome("24070521147");
testPalindrome(12321);               // NOW WORKS: Passed as a Number directly!
testPalindrome(21212);               // NOW WORKS: Evaluates as "Not a palindrome"

// Error Handling Test Cases (Triggers Catch Block)
testPalindrome("");                  // Error: Empty string
testPalindrome(null);                // TypeError: null passed
testPalindrome("   ");               // Error: Whitespace only
testPalindrome("!!!?");              // Error: No alphanumeric characters
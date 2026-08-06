const readline = require('readline');


// 1. FUNCTION DECLARATION (Global Scope)
// Utility function to reverse the entered PIN

function reversePin(pin) {
    const pinStr = String(pin);
    return pinStr.split('').reverse().join('');
}

// Helper function to ask a question in the terminal using built-in Node readline
const askQuestion = (query) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve => rl.question(query, answer => {
        rl.close();
        resolve(answer);
    }));
};


// 2. CLOSURE & SCOPE DEMONSTRATION
// ATM Session Generator returning an Arrow Function

const createATMSession = (accountHolder) => {
    // Outer Lexical Scope variable
    const user = accountHolder;
    let attempts = 0;

    
    // 3. ARROW FUNCTION (Closure over `user` and `attempts`)
    
    
    const verifyPinInteractive = async () => {
        attempts++;
        
        // Dynamic prompt to ask the user for PIN input
        const enteredPin = await askQuestion(`[ATM System] ${user}, please enter any PIN: `);

        if (!enteredPin || enteredPin.trim() === "") {
            return `Transaction cancelled by ${user}.`;
        }

        const strEnteredPin = String(enteredPin.trim());
        const reversed = reversePin(strEnteredPin); // Calls global Function Declaration

        console.log(`\n--- Transaction Attempt #${attempts} for ${user} ---`);
        console.log(`Entered PIN : ${strEnteredPin}`);
        console.log(`Reversed PIN: ${reversed}`);

        // Check if the entered PIN is a Palindrome
        const isPalindrome = (strEnteredPin === reversed);

        // Access is ALWAYS granted, but security message depends on Palindrome check
        if (isPalindrome) {
            return `ACCESS GRANTED!\n SPECIAL SECURITY ALERT: PIN "${strEnteredPin}" is a Palindrome! Please consider changing your password for better security.`;
        } else {
            return `ACCESS GRANTED! Welcome, ${user}.`;
        }
    };

    return verifyPinInteractive;
};


// 4. ATM SYSTEM EXECUTION
(async () => {
    const johnSession = createATMSession("John Doe");
    
    // Prompts user in the integrated terminal
    const result = await johnSession();
    console.log("\n" + result);
})();
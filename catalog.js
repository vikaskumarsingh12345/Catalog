const fs = require('fs');


function readJSON(filename) {
    const data = fs.readFileSync(filename, 'utf-8');
    return JSON.parse(data);
}


function decodeYValue(base, value) {
    return parseInt(value, base);
}


function lagrangeInterpolation(points, k) {
    let result = 0;

    for (let i = 0; i < k; i++) {
        let [x_i, y_i] = points[i];
        let term = y_i;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let [x_j, _] = points[j];
                term *= (0 - x_j) / (x_i - x_j);  
            }
        }

        result += term;
    }

    return Math.round(result);  
}


function findSecret(filename) {
    const input = readJSON(filename); 
    const n = input.keys.n;  
    const k = input.keys.k;  

    const points = [];
    for (let i = 1; i <= n; i++) {
        const key = i.toString();  
        if (input[key]) {  
            const base = parseInt(input[key].base);  
            const value = input[key].value;  
            const y_decoded = decodeYValue(base, value);  
            points.push([i, y_decoded]); 
        }
    }

    
    const constantTerm = lagrangeInterpolation(points, k);

    // Print 
    console.log(`The secret (constant term c) for file "${filename}" is: ${constantTerm}`);
}

// print for both testcase
findSecret('testcase1.json');
findSecret('testcase2.json');
function solveEquation() {
    // Get the equation input from the user
    var equation = document.getElementById('equation').value.trim();

    // Regular expression to extract coefficients from the equation
    var regex = /(-?\d*\.?\d+)\s*\*?\s*[xX]\s*\^?\s*(\d+)?/g;

    // Match coefficients and exponents
    var match;
    var coefficients = [];
    while (match = regex.exec(equation)) {
        var coefficient = parseFloat(match[1]);
        var exponent = match[2] ? parseInt(match[2]) : 1;
        coefficients.push({ coefficient, exponent });
    }

    // Solve the equation
    var solution = solveQuadraticEquation(coefficients);
    displaySolution(solution);
}

function solveQuadraticEquation(coefficients) {
    var a = coefficients[0].coefficient;
    var b = coefficients.length > 1 ? coefficients[1].coefficient : 0;
    var c = coefficients.length > 2 ? coefficients[2].coefficient : 0;

    // Calculate discriminant
    var discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
        return { solution: 'No real roots', explanation: 'The discriminant is negative.' };
    } else if (discriminant === 0) {
        var root = -b / (2 * a);
        return {
            solution: 'One real root: ' + root,
            explanation: 'The discriminant is zero, so there is one real root (double root).'
        };
    } else {
        var root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        var root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        return {
            solution: 'Root 1: ' + root1 + ', Root 2: ' + root2,
            explanation: 'The discriminant is positive, so there are two real roots.'
        };
    }
}

function displaySolution(solution) {
    var solutionDiv = document.getElementById('solution');
    var explanationDiv = document.getElementById('explanation');

    // Display the solution and explanation
    solutionDiv.textContent = 'Solution: ' + solution.solution;
    explanationDiv.textContent = 'Explanation: ' + solution.explanation;
}

import { scanRepo, getFindings } from "./tools";


const acmeScanResults = scanRepo({apiKey: "acme-secret-CMK-123", repoUrl: "https://github.com/aschwarzer101/Java-Portfolio-MVC"}); 
console.log(acmeScanResults); 


const acmeGetFindings = getFindings({apiKey: "acme-secret-CMK-123"}); 
console.log(acmeGetFindings); 


const globexGetFindings = getFindings({apiKey: "globex-secret-456"}); 
console.log(globexGetFindings); 
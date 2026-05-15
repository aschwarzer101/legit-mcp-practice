// tools.ts -- tools an AI agent can call 

import { z } from "zod"; // validation library for inputs tools expect
import { getTenantByApiKey, getTenantFindings, addFinding, Finding } from "./tenants";

// Input schema for scan_repo tool
export const ScanRepoInput = z.object({
    apiKey: z.string(), 
    repoUrl: z.string().check(z.url()), 
}); 

// input schema for get_findings tool
export const GetFindingsInput = z.object({
    apiKey: z.string(), 
}); 

// Simulates scanning a repo and returns mock vulnerability findings
// zod gives typescript types automatically so you never have a write a separate interface for function inputs
export function scanRepo(input: z.infer<typeof ScanRepoInput>){
    // YOUR JOB:
  // 1. call getTenantByApiKey with input.apiKey
  // 2. if no tenant found, return { error: "Unauthorized" }
  // 3. create a mock Finding object:
  //    - id: "finding-" + Date.now()
  //    - repo: input.repoUrl
  //    - severity: "high"
  //    - description: "Hardcoded secret detected in source code"
  //    - detectedAt: new Date().toISOString()
  // 4. call addFinding with the tenant's id and the finding
  // 5. return { success: true, finding }
  const targTenant = getTenantByApiKey(input.apiKey); 
  if(targTenant){
    const mockFinding: Finding = {
        id: "finding-" + Date.now(), 
        repo: input.repoUrl, 
        severity: "high", 
        description: "Hardcoded sensitive key detected in source code", 
        detectedAt: new Date().toISOString()
    }
    addFinding(targTenant.id, mockFinding); // isolates, only adds to specific tenant 

    return { success: true, finding: mockFinding}; 
  }
  return { error: "Unauthorized"}; 
}

// returns all findings for the authenticated tenant
export function getFindings(input: z.infer<typeof GetFindingsInput>){
    // YOUR JOB:
  // 1. call getTenantByApiKey with input.apiKey
  // 2. if no tenant found, return { error: "Unauthorized" }
  // 3. call getTenantFindings with the tenant's id
  // 4. return { tenantId: tenant.id, findings }
  
  const targetTenant = getTenantByApiKey(input.apiKey); 
  if(targetTenant){
    return { tenantId: targetTenant.id, findings: getTenantFindings(targetTenant.id) }; 
  }
  return { error:"Unauthorized" }; 
}

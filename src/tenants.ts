export interface Tenant {
    id: string; 
    name: string; 
    apiKey: string; 
    findings: Finding[];
} 

export interface Finding {
    id: string; 
    repo: string; 
    severity: "critical" | "high" | "medium" | "low"; 
    description: string; 
    detectedAt: string; 
} 

const tenants: Map<string, Tenant> = new Map([ 
    ["acme-corp", {id: "acme-corp", name: "Acme Corp", 
        apiKey: "acme-secret-CMK-123", findings: []}],

    // Tenant 1: "acme-corp"
    // id: "acme-corp"
    // name: "Acme Corp"
    // apiKey: "acme-secret-CMK-123"
    // findings: []
    ["globex", {id: "globex", name: "Globex Industries", 
        apiKey: "globex-secret-456", findings: []}]

    // Tenant 2: "globex"
    // id: "globex"
    // name: "Globex Industries"
    // apiKey: "globex-secret-456"
    // findings: []
]) 

export function getTenantByApiKey(apiKey: string): Tenant | null {
    //iterate over tenants, return the one whos apiKey matches
    // return null if none are found
    // loop over Map's values and find match
    for (const tenant of tenants.values()) {
        if (tenant.apiKey === apiKey){
            return tenant; 
        }
    }
    return null; 
} 

export function getTenantFindings(tenantId: string): Finding[] {
    //look up tenant by id, return their findings
    // return empty array if tenant doesn't exist
    const tenant = tenants.get(tenantId);
    return tenant ? tenant.findings : []; 
} 

export function addFinding(tenantId: string, finding: Finding): void {
    //look up tenant by id, push the finding into their findings array
    const targetTenant = tenants.get(tenantId); 
    if (targetTenant) {
        targetTenant.findings.push(finding); 
    }
    
} 
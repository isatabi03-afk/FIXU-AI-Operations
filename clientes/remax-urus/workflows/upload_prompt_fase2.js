const https = require('https');
const fs = require('fs');

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0YWYxODk3Ni0yYzlkLTRiYzAtYjM0Ny04MzBiZWYxOTE4ZmEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzczMTgwMjQ2fQ.LPRp44E7JvBC9CpgOdAbSSTB30u0sDxrWw4-nQKes6I';
const workflowId = 'GsOHXk4rmLjpZcKr';

// Read the new prompt
const newPrompt = fs.readFileSync('c:/Users/isata/Documents/IA/FIXU AI/FIXU_AI_SOP/REMAX URUS/current_prompt_live.txt', 'utf8');
console.log('New prompt length:', newPrompt.length, 'chars');

// Step 1: GET current workflow
const getOpts = {
  hostname: 'n8n.remaxurus.online',
  path: `/api/v1/workflows/${workflowId}`,
  method: 'GET',
  headers: { 'X-N8N-API-KEY': apiKey, 'Accept': 'application/json' }
};

const req = https.request(getOpts, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (res.statusCode !== 200) {
      console.log('GET failed:', res.statusCode, data.substring(0, 200));
      return;
    }

    const wf = JSON.parse(data);
    console.log('Workflow:', wf.name);

    // Find the Agent node and update its systemMessage
    let found = false;
    for (const node of wf.nodes) {
      if (node.parameters && node.parameters.options && node.parameters.options.systemMessage) {
        const oldLen = node.parameters.options.systemMessage.length;
        node.parameters.options.systemMessage = newPrompt;
        console.log('Updated node:', node.name);
        console.log('Old prompt:', oldLen, 'chars -> New:', newPrompt.length, 'chars');
        found = true;
        break;
      }
    }

    if (!found) {
      console.log('ERROR: Agent node with systemMessage not found!');
      return;
    }

    // Step 2: PUT updated workflow
    const cleanWf = {
      name: wf.name,
      nodes: wf.nodes,
      connections: wf.connections,
      settings: wf.settings,
      staticData: wf.staticData || null,
    };
    const putData = JSON.stringify(cleanWf);

    const putOpts = {
      hostname: 'n8n.remaxurus.online',
      path: `/api/v1/workflows/${workflowId}`,
      method: 'PUT',
      headers: {
        'X-N8N-API-KEY': apiKey,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(putData)
      }
    };

    const putReq = https.request(putOpts, (putRes) => {
      let putBody = '';
      putRes.on('data', chunk => putBody += chunk);
      putRes.on('end', () => {
        console.log('PUT Status:', putRes.statusCode);
        if (putRes.statusCode === 200) {
          const updated = JSON.parse(putBody);
          // Verify the prompt was updated
          for (const node of updated.nodes) {
            if (node.parameters && node.parameters.options && node.parameters.options.systemMessage) {
              const msg = node.parameters.options.systemMessage;
              console.log('DEPLOYED prompt length:', msg.length, 'chars');
              console.log('Contains TikTok rule:', msg.includes('TikTok/Instagram/Facebook') ? 'YES' : 'NO');
              console.log('Contains fotos rule:', msg.includes('Si pide fotos') ? 'YES' : 'NO');
              console.log('Contains telefono rule:', msg.includes('Pide teléfono') ? 'YES' : 'NO');
              console.log('Contains no-repeat-link rule:', msg.includes('redirige al link, no repitas') ? 'YES' : 'NO');
              console.log('\nSUCCESS: Fase 2 deployed!');
              break;
            }
          }
        } else {
          console.log('PUT Error:', putBody.substring(0, 500));
        }
      });
    });
    putReq.on('error', e => console.error('PUT error:', e));
    putReq.write(putData);
    putReq.end();
  });
});
req.on('error', e => console.error('GET error:', e));
req.end();

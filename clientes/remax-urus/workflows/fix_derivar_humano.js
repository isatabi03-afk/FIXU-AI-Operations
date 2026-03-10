const https = require('https');
const fs = require('fs');

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0YWYxODk3Ni0yYzlkLTRiYzAtYjM0Ny04MzBiZWYxOTE4ZmEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzczMTgwMjQ2fQ.LPRp44E7JvBC9CpgOdAbSSTB30u0sDxrWw4-nQKes6I';

// Step 1: GET workflow
const getOpts = {
  hostname: 'n8n.remaxurus.online',
  path: '/api/v1/workflows/mub8w5R56POehUsO',
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
    let changes = [];

    for (const node of wf.nodes) {
      // FIX 1: send_meta_template — phone 519068566277 → 51906856627
      if (node.name === 'send_meta_template') {
        const oldBody = node.parameters.jsonBody;
        if (oldBody && oldBody.includes('519068566277')) {
          node.parameters.jsonBody = oldBody.replace('519068566277', '51906856627');
          changes.push('send_meta_template: phone 519068566277 -> 51906856627');
        }
      }

      // FIX 2: send_meta_template1 — phone + language
      if (node.name === 'send_meta_template1') {
        const oldBody = node.parameters.jsonBody;
        if (oldBody) {
          let newBody = oldBody;
          if (newBody.includes('519068566277')) {
            newBody = newBody.replace('519068566277', '51906856627');
            changes.push('send_meta_template1: phone 519068566277 -> 51906856627');
          }
          if (newBody.includes('"code": "en"')) {
            newBody = newBody.replace('"code": "en"', '"code": "es"');
            changes.push('send_meta_template1: language en -> es');
          }
          node.parameters.jsonBody = newBody;
        }
      }

      // FIX 3: send_meta_template2 — motivo_derivacion typo (no accent → with accent + fallback)
      if (node.name === 'send_meta_template2') {
        const oldBody = node.parameters.jsonBody;
        if (oldBody && oldBody.includes('motivo_derivacion')) {
          const newBody = oldBody.replace(
            'motivo_derivacion',
            "motivo_derivaci\u00f3n || 'Derivaci\u00f3n general'"
          );
          node.parameters.jsonBody = newBody;
          changes.push('send_meta_template2: motivo_derivacion -> motivo_derivacion + fallback');
        }
      }
    }

    console.log('Changes applied:', JSON.stringify(changes, null, 2));

    // Save locally
    fs.writeFileSync(
      'c:/Users/isata/Documents/IA/FIXU AI/FIXU_AI_SOP/REMAX URUS/derivar_humano_workflow.json',
      JSON.stringify(wf, null, 2)
    );
    console.log('Saved local copy.');

    // Step 2: PUT updated workflow — only send allowed fields
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
      path: '/api/v1/workflows/mub8w5R56POehUsO',
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
          console.log('SUCCESS: Workflow updated!');
          const updated = JSON.parse(putBody);
          for (const node of updated.nodes) {
            if (node.name.includes('send_meta_template')) {
              const body = node.parameters.jsonBody || '';
              const phone = body.match(/"to":\s*"(\d+)"/);
              const lang = body.match(/"code":\s*"([^"]+)"/);
              console.log(
                '  ' + node.name +
                ': phone=' + (phone ? phone[1] : '?') +
                ' lang=' + (lang ? lang[1] : '?')
              );
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

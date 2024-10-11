document.getElementById('consultarBtn').addEventListener('click', consultarIP);

async function consultarIP() {
    const ip = document.getElementById('ipInput').value.trim() || ''; // Utiliza o IP atual se vazio

    const data = await buscarDadosIP(ip);
    if (data) {
        exibirResultado(data);
        adicionarLog({
            data: new Date().toLocaleString(),
            sistema: 'Consulta de IP',
            acao: 'Consulta',
            detalhes: `Consultado IP: ${data.ip}`
        });
    }
}

async function buscarDadosIP(ip) {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    if (response.ok) {
        return await response.json();
    }
}

function exibirResultado(data) {
    document.getElementById('resultado').innerHTML = `
        <h2>Resultados:</h2>
        <p><strong>IP:</strong> ${data.ip}</p>
        <p><strong>Cidade:</strong> ${data.city}</p>
        <p><strong>Região:</strong> ${data.region}</p>
        <p><strong>País:</strong> ${data.country_name}</p>
        <p><strong>Latitude:</strong> ${data.latitude}</p>
        <p><strong>Longitude:</strong> ${data.longitude}</p>
        <p><strong>Organização:</strong> ${data.org}</p>
    `;
}

let logs = [];

function adicionarLog(log) {
    logs.push(log);
}

function exibirLogs() {
    const logsContainer = document.getElementById("logsContainer");
    logsContainer.innerHTML = logs.map((log, index) => `
      <div class="log-item">
        <p><strong>Data:</strong> ${log.data} | <strong>Sistema:</strong> ${log.sistema} | <strong>Ação:</strong> ${log.acao} | <strong>Detalhes:</strong> ${log.detalhes}</p>
        <button class="btn btn-danger btn-sm" onclick="removerLog(${index})">Excluir</button>
      </div>
    `).join("");
}

function removerLog(index) {
    logs.splice(index, 1);
    exibirLogs();
}

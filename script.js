// Script untuk editor interaktif latihan Git

document.addEventListener('DOMContentLoaded', function() {
    // Ambil elemen-elemen DOM
    const codeEditor = document.getElementById('codeEditor');
    const randomizeBtn = document.getElementById('randomizeBtn');
    const saveBtn = document.getElementById('saveBtn');
    const resetBtn = document.getElementById('resetBtn');
    const saveStatus = document.getElementById('saveStatus');
    const lastSaved = document.getElementById('lastSaved');
    const fileHistory = document.getElementById('fileHistory');
    
    // Simpan konten awal untuk reset
    const initialContent = codeEditor.value;
    let hasChanges = false;
    
    // Template konten acak
    const randomTemplates = [
        `// File yang diubah untuk latihan git
function helloWorld() {
    console.log("Hello World dari Git!");
    return "Ini adalah konten yang diacak #1";
}

// TODO: Tambahkan fitur baru di sini
// Ini adalah tempat untuk menulis code
`,
        `/* 
 * Latihan Git - File acak #2
 * -------------------------
 * Gunakan file ini untuk berlatih:
 * - git add
 * - git commit
 * - git push
 */

let gitCommands = [
    "git init",
    "git add .",
    "git commit -m 'pesan'",
    "git push origin main"
];

function showCommands() {
    for (let cmd of gitCommands) {
        console.log(\`Jalankan: \${cmd}\`);
    }
}

// Ubah function ini untuk latihan Git
`,
        `/**
 * File latihan Git - Acak #3
 * File ini telah diubah secara acak
 */

class GitRepository {
    constructor(name) {
        this.name = name;
        this.files = [];
        this.commits = 0;
    }
    
    addFile(fileName) {
        this.files.push(fileName);
        console.log(\`File \${fileName} ditambahkan ke repo \${this.name}\`);
    }
    
    commit(message) {
        this.commits++;
        return \`Commit #\${this.commits}: \${message}\`;
    }
}

// Contoh penggunaan:
// let repo = new GitRepository("latihan-git");
// repo.addFile("index.html");
// console.log(repo.commit("Menambahkan index.html"));
`,
        `// Konten acak #4 untuk latihan Git

/*
 * Ini adalah file latihan untuk:
 * 1. Melihat perubahan dengan git diff
 * 2. Memahami git status
 * 3. Berlatih commit
 */

// Data sample untuk latihan
const gitData = {
    version: "2.39.1",
    creator: "Linus Torvalds",
    year: 2005,
    commands: {
        basic: ["init", "add", "commit", "push", "pull"],
        advanced: ["rebase", "merge", "cherry-pick", "bisect"]
    }
};

// Function untuk menampilkan info Git
function displayGitInfo() {
    return \`Git versi \${gitData.version} dibuat oleh \${gitData.creator} pada tahun \${gitData.year}\`;
}

// TODO: Modifikasi file ini untuk latihan Git
`,
        `// File latihan Git - Acak #5

/**
 * Simulator sederhana untuk latihan Git
 * Ubah file ini, lalu commit perubahannya!
 */

// Konfigurasi simulasi
const config = {
    repository: "latihan-git",
    branch: "main",
    user: "git-trainee"
};

// Log simulasi git
const gitLog = [];

// Function simulasi
function simulateGit(command) {
    const timestamp = new Date().toISOString();
    gitLog.push({ timestamp, command, user: config.user });
    
    console.log(\`[\${timestamp}] \${config.user}@\${config.repository} (\${config.branch}): \${command}\`);
    
    return "Command executed successfully";
}

// Contoh penggunaan:
// simulateGit("git commit -m 'Update README'");
`
    ];
    
    // Event listener untuk mendeteksi perubahan di editor
    codeEditor.addEventListener('input', function() {
        if (codeEditor.value !== initialContent && !hasChanges) {
            saveStatus.textContent = 'Belum disimpan';
            saveStatus.classList.add('modified');
            hasChanges = true;
        } else if (codeEditor.value === initialContent) {
            saveStatus.textContent = 'Tidak ada perubahan';
            saveStatus.classList.remove('modified');
            hasChanges = false;
        }
    });
    
    // Event listener untuk tombol acak
    randomizeBtn.addEventListener('click', function() {
        const randomIndex = Math.floor(Math.random() * randomTemplates.length);
        codeEditor.value = randomTemplates[randomIndex];
        
        saveStatus.textContent = 'Konten diacak (belum disimpan)';
        saveStatus.classList.add('modified');
        hasChanges = true;
    });
    
    // Event listener untuk tombol simpan
    saveBtn.addEventListener('click', function() {
        if (!hasChanges) {
            alert('Tidak ada perubahan yang perlu disimpan');
            return;
        }
        
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const dateString = now.toLocaleDateString();
        lastSaved.textContent = `Terakhir disimpan: ${timeString}, ${dateString}`;
        
        // Membuat entri riwayat baru
        const commitId = generateCommitId();
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="commit-info">
                <span class="commit-id">${commitId}</span>
                <span class="commit-date">${dateString}</span>
            </div>
            <div class="commit-message">Perubahan disimpan pada ${timeString}</div>
        `;
        
        // Menambahkan entri ke awal riwayat
        fileHistory.insertBefore(historyItem, fileHistory.firstChild);
        
        saveStatus.textContent = 'Perubahan disimpan';
        saveStatus.classList.remove('modified');
        hasChanges = false;
    });
    
    // Event listener untuk tombol reset
    resetBtn.addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin mereset konten editor ke kondisi awal?')) {
            codeEditor.value = initialContent;
            saveStatus.textContent = 'Konten direset ke kondisi awal';
            saveStatus.classList.remove('modified');
            hasChanges = false;
        }
    });
    
    // Fungsi untuk membuat ID commit tiruan
    function generateCommitId() {
        const chars = '0123456789abcdef';
        let result = '';
        for (let i = 0; i < 7; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    
    // Log saat script dimuat
    console.log('Editor interaktif untuk latihan Git dimuat!');
});

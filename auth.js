// Configuração do Firebase (pegue isso no painel do Firebase)
const firebaseConfig = {
    apiKey: "AIzaSyBFeo0srjK-8gXJ72yJ-vYlkZeIA8aG8RM",
    authDomain: "francielerpglogin-8ba35.firebaseapp.com",
    databaseURL: "https://console.firebase.google.com/u/2/project/francielerpglogin-8ba35/database/francielerpglogin-8ba35-default-rtdb/data/~2F",
    projectId: "francielerpglogin-8ba35",
    storageBucket: "francielerpglogin-8ba35.firebasestorage.app",
    messagingSenderId: "369344513655",
    appId: "1:369344513655:web:61ed667bf3c66e15a1a872"
  };
  
  // Inicializar Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const database = firebase.database();
  
  // Função para verificar se o usuário está logado
  function checkLoginStatus() {
    auth.onAuthStateChanged(user => {
      if (user) {
        // Usuário está logado
        document.getElementById("login").style.display = "none";
        document.getElementById("content").style.display = "block";
      } else {
        // Usuário não está logado
        document.getElementById("login").style.display = "block";
        document.getElementById("content").style.display = "none";
      }
    });
  }
  
  // Função para login
  function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        alert("Login realizado com sucesso!");
      })
      .catch(error => alert(error.message));
  }
  
  // Função para registro
  function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        alert("Conta criada com sucesso!");
      })
      .catch(error => alert(error.message));
  }
  
  // Função para salvar dados
  function saveData() {
    const data = document.getElementById("data").value;
    const userId = auth.currentUser.uid;
    database.ref("users/" + userId).set({ notes: data });
    alert("Dados salvos com sucesso!");
  }
  
  // Função para logout
  function logout() {
    auth.signOut().then(() => {
      alert("Você saiu!");
    });
  }
  
  // Chama a função para verificar o status do login assim que a página carregar
  window.onload = checkLoginStatus;

// Função para carregar os dados do usuário após login
function loadData() {
    const userId = auth.currentUser.uid;
    const userRef = database.ref("users/" + userId);
    userRef.once("value", (snapshot) => {
      const data = snapshot.val();
      if (data && data.notes) {
        document.getElementById("data").value = data.notes;
      }
    });
  }
  
  // Carrega os dados assim que o login é confirmado
  auth.onAuthStateChanged(user => {
    if (user) {
      loadData();
    }
  });
  
  
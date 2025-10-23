const API = 'https://api.github.com'

const grid = document.getElementById('grid')
const loadMoreBtn = document.getElementById('loadMoreBtn')
const form = document.getElementById('searchForm')
const input = document.getElementById('searchInput')

const errorModal = document.getElementById('errorModal')
const errorMessage = document.getElementById('errorMessage')
document.getElementById('closeError').onclick = hideError
document.getElementById('okError').onclick = hideError

function showError(msg){
  errorMessage.textContent = msg
  errorModal.classList.remove('hide')
}

function hideError(){
  errorModal.classList.add('hide')
}

let since = 0
let loading = false

function userCard(u){
  const article = document.createElement('article')
  article.className = 'card'
  article.innerHTML = `
    <img src="${u.avatar_url}" alt="${u.login}">
    <h3>${u.login}</h3>
    <small>ID: ${u.id}</small>
    <a href="${u.html_url}" target="_blank" rel="noopener">Ver no GitHub</a>
  `
  return article
}

function renderUsers(list, replace = false){
  if(replace) grid.innerHTML = ''
  const frag = document.createDocumentFragment()
  list.forEach(u => frag.appendChild(userCard(u)))
  grid.appendChild(frag)
}

async function loadUsers(){
  if(loading) return
  loading = true
  loadMoreBtn.disabled = true
  try{
    const url = since > 0 ? `${API}/users?since=${since}` : `${API}/users`
    const res = await fetch(url)
    if(!res.ok) throw new Error()
    const data = await res.json()
    renderUsers(data, false)
    if(data.length) since = data[data.length - 1].id
  }catch(e){
    showError('Erro ao carregar usuários. Tente novamente.')
  }finally{
    loadMoreBtn.disabled = false
    loading = false
  }
}

async function searchUser(login){
  if(!login.trim()){
    showError('Digite um login para pesquisar.')
    return
  }
  try{
    const res = await fetch(`${API}/users/${encodeURIComponent(login.trim())}`)
    if(res.status === 404){ showError('Usuário não encontrado.'); return }
    if(!res.ok) throw new Error()
    const user = await res.json()
    renderUsers([user], true) // substitui grid pelo resultado
  }catch(e){
    showError('Erro na busca. Tente novamente.')
  }
}

form.addEventListener('submit', (e)=>{
  e.preventDefault()
  searchUser(input.value)
})
loadMoreBtn.addEventListener('click', loadUsers)

loadUsers()

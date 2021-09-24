import { useEffect, useState } from 'react'

function App() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [showUpdate, setShowUpdate] = useState(false)
  const [updateUser, setUpdateUser] = useState({})

  const [listaDeUsuarios, setListaDeUsuarios] = useState([])

  const BASE_URL = 'https://app.purpletech.com.br/v1/user'

  async function fetchData() {
    const response = await fetch(BASE_URL)

    const formatedResponse = await response.json()

    setListaDeUsuarios(formatedResponse)
  }

  useEffect(() => {
    fetchData()
  }, [])

  async function handleDelete(id) {
    const methods = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }

    await fetch(`${BASE_URL}/${id}`, methods)

    setShowUpdate(false)
    setUpdateUser({})

    fetchData()
  }

  async function handleSubmitRegister(e) {
    e.preventDefault()

    const payload = {
      name,
      age,
      phone,
      address
    }

    const methods = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    await fetch(BASE_URL, methods)

    setName('')
    setAge('')
    setPhone('')
    setAddress('')
    setShowUpdate(false)
    setUpdateUser({})

    fetchData()
  }

  function handleUpdate(user) {
    setShowUpdate(true)

    setUpdateUser({
      id: user._id,
      name: user.name,
      age: user.age,
      phone: user.phone,
      address: user.address
    })
  }

  async function handleSubmitUpdate(e) {
    e.preventDefault()

    const payload = {
      name: updateUser.name,
      age: updateUser.age,
      phone: updateUser.phone,
      address: updateUser.address
    }

    const methods = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    await fetch(`${BASE_URL}/${updateUser.id}`, methods)

    setShowUpdate(false)
    setUpdateUser({})

    fetchData()
  }

  return (
    <>
      <h1>Gestão de usuários</h1>
      <br/><br/>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaDeUsuarios.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>
                <button onClick={() => handleDelete(user._id)}>Deletar</button>
                <button onClick={() => handleUpdate(user)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br/><br/>
      <h1>Cadastro de usuário</h1>
      <form onSubmit={handleSubmitRegister}>
        <label>Nome do usuário</label><br/>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <br/>
        <label>Idade do usuário</label><br/>
        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
        <br/>
        <label>Telefone do usuário</label><br/>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <br/>
        <label>Endereço do usuário</label><br/>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        <br/><br/>
        <button type="submit">Cadastrar usuário</button>
      </form>

      {showUpdate && (
        <>
          <br/><br/>
          <h1>Modificar usuário</h1>
          <form onSubmit={handleSubmitUpdate}>
            <label>Nome do usuário</label><br/>
            <input type="text" value={updateUser.name} onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })} />
            <br/>
            <label>Idade do usuário</label><br/>
            <input type="text" value={updateUser.age} onChange={(e) => setUpdateUser({ ...updateUser, age: e.target.value })} />
            <br/>
            <label>Telefone do usuário</label><br/>
            <input type="text" value={updateUser.phone} onChange={(e) => setUpdateUser({ ...updateUser, phone: e.target.value })} />
            <br/>
            <label>Endereço do usuário</label><br/>
            <input type="text" value={updateUser.address} onChange={(e) => setUpdateUser({ ...updateUser, addres: e.target.value })} />
            <br/><br/>
            <button type="submit">Alterar usuário</button>
          </form>
        </>
      )}
    </>
  );
}

export default App;
